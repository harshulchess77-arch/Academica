import { supabase } from './supabase';
import type { Organization, Classroom, ModerationAction, ComplianceEvent } from '../types';

// Service for admin console functionality
export class AdminService {
  async getOrganizations(): Promise<Organization[]> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Organization[];
  }

  async createOrganization(
    name: string,
    type: 'school' | 'district' | 'company',
    adminId: string
  ): Promise<string> {
    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name,
        type,
        admin_id: adminId,
        is_active: true,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async updateOrganization(
    orgId: string,
    updates: Partial<Organization>
  ): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', orgId);

    if (error) throw error;
  }

  async deactivateOrganization(orgId: string): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .update({ is_active: false })
      .eq('id', orgId);

    if (error) throw error;
  }

  async getOrganizationClassrooms(orgId: string): Promise<Classroom[]> {
    const { data, error } = await supabase
      .from('classrooms')
      .select('*, profiles(display_name)')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Classroom[];
  }

  async getModerationQueue(filters?: {
    actionType?: string;
    targetType?: string;
  }): Promise<ModerationAction[]> {
    let query = supabase
      .from('moderation_actions')
      .select('*, profiles(display_name, email)')
      .order('created_at', { ascending: false });

    if (filters?.actionType) {
      query = query.eq('action', filters.actionType);
    }
    if (filters?.targetType) {
      query = query.eq('target_type', filters.targetType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as ModerationAction[];
  }

  async createModerationAction(
    moderatorId: string,
    targetType: string,
    targetId: string,
    action: string,
    reason: string | null
  ): Promise<void> {
    const { error } = await supabase.from('moderation_actions').insert({
      moderator_id: moderatorId,
      target_type: targetType,
      target_id: targetId,
      action,
      reason,
    });

    if (error) throw error;
  }

  async getComplianceAuditLog(filters?: {
    eventType?: string;
    userId?: string;
  }): Promise<ComplianceEvent[]> {
    let query = supabase
      .from('compliance_events')
      .select('*, profiles(display_name, email)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (filters?.eventType) {
      query = query.eq('event_type', filters.eventType);
    }
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as ComplianceEvent[];
  }

  async getSystemStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    totalOrganizations: number;
    totalClassrooms: number;
    totalGuilds: number;
    errorLogsToday: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      { count: totalUsers },
      { count: activeUsers },
      { count: totalOrganizations },
      { count: totalClassrooms },
      { count: totalGuilds },
      { count: errorLogsToday },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('classrooms').select('*', { count: 'exact', head: true }),
      supabase.from('guilds').select('*', { count: 'exact', head: true }),
      supabase
        .from('error_logs')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString()),
    ]);

    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      totalOrganizations: totalOrganizations || 0,
      totalClassrooms: totalClassrooms || 0,
      totalGuilds: totalGuilds || 0,
      errorLogsToday: errorLogsToday || 0,
    };
  }

  async getUserRoles(): Promise<Array<{ id: string; email: string; role: string }>> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, role')
      .in('role', ['admin', 'teacher', 'parent'])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Array<{ id: string; email: string; role: string }>;
  }

  async updateUserRole(userId: string, newRole: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) throw error;
  }

  async getRateLimitStats(): Promise<Array<{
    endpoint: string;
    requestCount: number;
    windowStart: string;
  }>> {
    const { data, error } = await supabase
      .from('rate_limit_counters')
      .select('*')
      .order('window_start', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data as Array<{
      endpoint: string;
      requestCount: number;
      windowStart: string;
    }>;
  }
}

export const adminService = new AdminService();
