import { supabase } from './supabase';
import type { OnboardingData, Profile } from '../types';

// Service for handling onboarding completion
export class OnboardingService {
  async completeOnboarding(userId: string, data: OnboardingData): Promise<void> {
    // Update profile with onboarding data
    const profileUpdates: Partial<Profile> = {
      dob: data.dob,
      is_minor: data.isMinor,
      parent_email: data.parentEmail,
      country: data.country,
      vpn_check_passed: data.vpnCheckPassed,
      grade: data.grade,
      onboarding_complete: true,
      selected_tier: data.selectedTier,
    };

    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', userId);

    if (profileError) throw profileError;

    // Insert test scores
    if (data.testScores.length > 0) {
      const { error: scoresError } = await supabase
        .from('test_scores')
        .insert(
          data.testScores.map((score) => ({
            user_id: userId,
            ...score,
          }))
        );

      if (scoresError) throw scoresError;
    }

    // Log compliance event
    const { error: complianceError } = await supabase.rpc('log_compliance_event', {
      p_event_type: 'terms_accepted',
      p_details: {
        grade: data.grade,
        subjects: data.subjects,
        goals: data.goals,
        tier: data.selectedTier,
      },
      p_user_id: userId,
    });

    if (complianceError) throw complianceError;

    // If minor and parent email provided, log parental consent
    if (data.isMinor && data.parentEmail) {
      await supabase.rpc('log_compliance_event', {
        p_event_type: 'consent_granted',
        p_details: {
          consent_type: 'data_collection',
          parent_email: data.parentEmail,
        },
        p_user_id: userId,
      });
    }
  }

  async getOnboardingProgress(userId: string): Promise<{
    dob: boolean;
    region: boolean;
    gradeSubjects: boolean;
    testScores: boolean;
    goals: boolean;
    customization: boolean;
    plan: boolean;
  }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('dob, country, grade, selected_tier')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      dob: !!data.dob,
      region: !!data.country,
      gradeSubjects: !!data.grade,
      testScores: false, // Would need to check test_scores table
      goals: false, // Would need to store in profile or separate table
      customization: false, // Would need to check avatar config
      plan: !!data.selected_tier,
    };
  }

  async isOnboardingComplete(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.onboarding_complete;
  }
}

export const onboardingService = new OnboardingService();
