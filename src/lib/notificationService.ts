import { supabase } from './supabase';
import type { Profile, Notification } from '../types';

// Service for handling notifications
export class NotificationService {
  async createNotification(
    userId: string,
    type: string,
    title: string,
    body: string
  ): Promise<void> {
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      type,
      title,
      body,
      read: false,
    });

    if (error) throw error;
  }

  async createStreakReminder(userId: string, streak: number): Promise<void> {
    await this.createNotification(
      userId,
      'streak_reminder',
      'Keep your streak going!',
      `You're on a ${streak}-day streak! Complete a lesson today to keep it alive.`
    );
  }

  async createBadgeUnlockNotification(
    userId: string,
    badgeName: string
  ): Promise<void> {
    await this.createNotification(
      userId,
      'badge_unlock',
      'New Badge Unlocked!',
      `Congratulations! You've earned the "${badgeName}" badge.`
    );
  }

  async createGuildActivityNotification(
    userId: string,
    guildName: string,
    activity: string
  ): Promise<void> {
    await this.createNotification(
      userId,
      'guild_activity',
      `Activity in ${guildName}`,
      activity
    );
  }

  async createAssignmentDueNotification(
    userId: string,
    assignmentTitle: string,
    dueDate: string
  ): Promise<void> {
    await this.createNotification(
      userId,
      'assignment_due',
      'Assignment Due Soon',
      `"${assignmentTitle}" is due on ${new Date(dueDate).toLocaleDateString()}.`
    );
  }

  async createWeeklyDigestNotification(userId: string): Promise<void> {
    await this.createNotification(
      userId,
      'weekly_digest',
      'Your Weekly Progress',
      'Check out your learning progress for this week!'
    );
  }

  async createParentRequestApprovedNotification(userId: string): Promise<void> {
    await this.createNotification(
      userId,
      'parent_request_approved',
      'Parent Link Approved',
      'Your parent has successfully linked to your account.'
    );
  }

  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  }

  async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
    return count || 0;
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
  }

  async deleteOldNotifications(userId: string, daysOld: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId)
      .eq('read', true)
      .lt('created_at', cutoffDate.toISOString());

    if (error) throw error;
  }
}

export const notificationService = new NotificationService();
