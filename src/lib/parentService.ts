import { supabase } from './supabase';
import type { ParentStudentLink, Profile } from '../types';

// Service for parent portal functionality
export class ParentService {
  async getLinkedChildren(parentId: string): Promise<
    Array<ParentStudentLink & { student: Profile }>
  > {
    const { data, error } = await supabase
      .from('parent_student_links')
      .select('*, student:profiles!parent_student_links_student_id_fkey(*)')
      .eq('parent_id', parentId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Array<ParentStudentLink & { student: Profile }>;
  }

  async getChildProgress(childId: string): Promise<{
    streak: number;
    xp: number;
    level: number;
    timeStudiedThisWeek: number;
    recentBadges: number;
  }> {
    const [profile, pomodoros] = await Promise.all([
      supabase.from('profiles').select('streak_count, xp_total, level').eq('id', childId).single(),
      supabase
        .from('pomodoro_sessions')
        .select('duration_seconds')
        .eq('user_id', childId)
        .eq('completed', true)
        .gte('started_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    if (profile.error) throw profile.error;

    const timeStudied = (pomodoros.data || []).reduce(
      (sum, p) => sum + p.duration_seconds,
      0
    );

    return {
      streak: profile.data.streak_count,
      xp: profile.data.xp_total,
      level: profile.data.level,
      timeStudiedThisWeek: Math.floor(timeStudied / 60), // in minutes
      recentBadges: 0, // Would need badge query
    };
  }

  async getChildSubjects(childId: string): Promise<Array<{ subject: string; progress: number }>> {
    const { data, error } = await supabase
      .from('user_skill_progress')
      .select('skill_nodes(subject), mastery_level')
      .eq('user_id', childId);

    if (error) throw error;

    const subjectProgress = new Map<string, number>();

    (data || []).forEach((progress) => {
      const subject = (progress as any).skill_nodes?.subject;
      if (subject) {
        const current = subjectProgress.get(subject) || 0;
        subjectProgress.set(subject, current + progress.mastery_level);
      }
    });

    return Array.from(subjectProgress.entries()).map(([subject, totalMastery]) => ({
      subject,
      progress: Math.min(totalMastery / 100, 100),
    }));
  }

  async createLinkRequest(parentId: string, studentEmail: string): Promise<string> {
    const { data, error } = await supabase.rpc('create_parent_link_request', {
      p_student_email: studentEmail,
    });

    if (error) throw error;
    return (data as { link_id: string }).link_id;
  }

  async approveLinkRequest(linkId: string): Promise<void> {
    const { error } = await supabase.rpc('approve_parent_link', {
      p_link_id: linkId,
    });

    if (error) throw error;
  }

  async revokeLink(linkId: string): Promise<void> {
    const { error } = await supabase
      .from('parent_student_links')
      .update({ status: 'revoked' })
      .eq('id', linkId);

    if (error) throw error;
  }

  async getPendingRequests(parentId: string): Promise<ParentStudentLink[]> {
    const { data, error } = await supabase
      .from('parent_student_links')
      .select('*')
      .eq('parent_id', parentId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ParentStudentLink[];
  }

  async getConsentAuditTrail(childId: string): Promise<Array<{
    eventType: string;
    timestamp: string;
    details: Record<string, unknown>;
  }>> {
    const { data, error } = await supabase
      .from('compliance_events')
      .select('*')
      .eq('user_id', childId)
      .in('event_type', ['consent_granted', 'consent_revoked', 'parent_link_approved'])
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((event) => ({
      eventType: event.event_type,
      timestamp: event.created_at,
      details: event.details as Record<string, unknown>,
    }));
  }

  async grantConsent(
    childId: string,
    consentType: 'data_collection' | 'ai_features' | 'leaderboard'
  ): Promise<void> {
    const { error } = await supabase.from('compliance_events').insert({
      user_id: childId,
      event_type: 'consent_granted',
      details: { consent_type: consentType, granted_by: 'parent' },
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async revokeConsent(
    childId: string,
    consentType: 'data_collection' | 'ai_features' | 'leaderboard'
  ): Promise<void> {
    const { error } = await supabase.from('compliance_events').insert({
      user_id: childId,
      event_type: 'consent_revoked',
      details: { consent_type: consentType, revoked_by: 'parent' },
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async requestChildDataDeletion(childId: string): Promise<void> {
    const { error } = await supabase.from('compliance_events').insert({
      user_id: childId,
      event_type: 'data_deletion',
      details: { requested_by: 'parent', requires_child_confirmation: true },
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
  }
}

export const parentService = new ParentService();
