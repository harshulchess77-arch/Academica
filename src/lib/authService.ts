import { supabase } from './supabase';
import type { Profile } from '../types';

// Service for authentication operations
export class AuthService {
  async signUp(email: string, password: string, displayName: string): Promise<{ user: any; profile: Profile }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) throw new Error('Sign up failed');

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email,
        display_name: displayName,
        role: 'student',
        xp_total: 0,
        level: 1,
        streak_count: 0,
        onboarding_complete: false,
        vpn_check_passed: false,
        selected_tier: 'free',
        dyslexic_font_enabled: false,
        high_contrast_enabled: false,
        reduce_motion_enabled: false,
        tts_speed: 1,
        larger_click_targets: false,
        always_show_focus: false,
      })
      .select()
      .single();

    if (profileError) throw profileError;

    return { user: data.user, profile: profile as Profile };
  }

  async signIn(email: string, password: string): Promise<{ user: any; profile: Profile }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) throw new Error('Sign in failed');

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    // Update last active
    await supabase
      .from('profiles')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', data.user.id);

    return { user: data.user, profile: profile as Profile };
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  }

  async getCurrentSession(): Promise<{ user: any; profile: Profile } | null> {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;

    return { user: session.user, profile: profile as Profile };
  }

  async checkRole(userId: string, role: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.role === role;
  }

  async isAdmin(userId: string): Promise<boolean> {
    return this.checkRole(userId, 'admin');
  }

  async isTeacher(userId: string): Promise<boolean> {
    return this.checkRole(userId, 'teacher');
  }

  async isParent(userId: string): Promise<boolean> {
    return this.checkRole(userId, 'parent');
  }
}

export const authService = new AuthService();
