import { supabase } from './supabase';
import type { Profile } from '../types';

// Centralized API client for all Supabase operations
// Ensures consistency and proper error handling

class APIClient {
  // Profile operations
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Profile;
  }

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  }

  // Gamification operations (must use RPC)
  async addXP(userId: string, amount: number): Promise<void> {
    const { error } = await supabase.rpc('add_user_xp', {
      p_user_id: userId,
      p_amount: amount,
    });

    if (error) throw error;
  }

  async incrementStreak(userId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_streak', {
      p_user_id: userId,
    });

    if (error) throw error;
  }

  // Vault operations (must use RPC)
  async purchaseVaultItem(itemId: string): Promise<{ success: boolean; new_xp?: number; error?: string }> {
    const { data, error } = await supabase.rpc('purchase_vault_item', {
      p_item_id: itemId,
    });

    if (error) throw error;
    return data as { success: boolean; new_xp?: number; error?: string };
  }

  // Skill tree operations
  async unlockSkillNode(userId: string, nodeId: string): Promise<void> {
    const { error } = await supabase.from('user_skill_progress').insert({
      user_id: userId,
      node_id: nodeId,
      unlocked: true,
      mastery_level: 0,
      unlocked_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async updateMastery(userId: string, nodeId: string, masteryLevel: number): Promise<void> {
    const { error } = await supabase
      .from('user_skill_progress')
      .update({ mastery_level: masteryLevel })
      .eq('user_id', userId)
      .eq('node_id', nodeId);

    if (error) throw error;
  }

  // Journal operations
  async createJournalEntry(
    userId: string,
    entry: {
      title: string;
      content: string;
      mood: string | null;
      tags: string[];
      is_private: boolean;
    }
  ): Promise<void> {
    const { error } = await supabase.from('journal_entries').insert({
      user_id: userId,
      ...entry,
    });

    if (error) throw error;
  }

  // Flashcard operations
  async createFlashcardDeck(
    userId: string,
    deck: {
      title: string;
      description: string | null;
      subject: string | null;
      is_public: boolean;
    }
  ): Promise<string> {
    const { data, error } = await supabase
      .from('flashcard_decks')
      .insert({
        user_id: userId,
        ...deck,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async addFlashcard(deckId: string, front: string, back: string): Promise<void> {
    const { error } = await supabase.from('flashcard_items').insert({
      deck_id: deckId,
      front,
      back,
      position: 0,
    });

    if (error) throw error;
  }

  // Quiz operations
  async submitQuizAttempt(
    userId: string,
    subject: string,
    score: number,
    totalQuestions: number
  ): Promise<void> {
    const { error } = await supabase.from('quiz_attempts').insert({
      user_id: userId,
      subject,
      score,
      total_questions: totalQuestions,
      completed_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  // Pomodoro operations
  async startPomodoro(
    userId: string,
    durationSeconds: number,
    task: string | null
  ): Promise<string> {
    const { data, error } = await supabase
      .from('pomodoro_sessions')
      .insert({
        user_id: userId,
        duration_seconds: durationSeconds,
        completed: false,
        task,
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async completePomodoro(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from('pomodoro_sessions')
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) throw error;
  }

  // Guild operations
  async joinGuild(userId: string, guildId: string): Promise<void> {
    const { error } = await supabase.from('guild_members').insert({
      guild_id: guildId,
      user_id: userId,
      role: 'member',
      joined_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async leaveGuild(userId: string, guildId: string): Promise<void> {
    const { error } = await supabase
      .from('guild_members')
      .delete()
      .eq('guild_id', guildId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async sendGuildMessage(guildId: string, userId: string, content: string): Promise<void> {
    const { error } = await supabase.from('guild_messages').insert({
      guild_id: guildId,
      user_id: userId,
      content,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  // Code snippet operations
  async createCodeSnippet(
    userId: string,
    snippet: {
      title: string;
      language: string;
      code: string;
      description: string | null;
      is_public: boolean;
    }
  ): Promise<void> {
    const { error } = await supabase.from('code_snippets').insert({
      user_id: userId,
      ...snippet,
    });

    if (error) throw error;
  }

  // Leaderboard operations
  async optInLeaderboard(userId: string, displayAlias: string): Promise<void> {
    const { error } = await supabase
      .from('leaderboard_opt_ins')
      .upsert({
        user_id: userId,
        display_alias: displayAlias,
        opted_in: true,
      });

    if (error) throw error;
  }

  async optOutLeaderboard(userId: string): Promise<void> {
    const { error } = await supabase
      .from('leaderboard_opt_ins')
      .update({ opted_in: false })
      .eq('user_id', userId);

    if (error) throw error;
  }

  // Notification operations
  async markNotificationRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  }

  async markAllNotificationsRead(userId: string): Promise<void> {
    const { error } = await supabase.rpc('mark_notifications_read');

    if (error) throw error;
  }

  // Compliance operations
  async logComplianceEvent(
    eventType: string,
    details: Record<string, unknown>,
    userId?: string
  ): Promise<string | null> {
    const { data, error } = await supabase.rpc('log_compliance_event', {
      p_event_type: eventType,
      p_details: details,
      p_user_id: userId,
    });

    if (error) throw error;
    return data as string;
  }

  // Parent link operations
  async createParentLinkRequest(parentId: string, studentEmail: string): Promise<string> {
    const { data, error } = await supabase.rpc('create_parent_link_request', {
      p_student_email: studentEmail,
    });

    if (error) throw error;
    return (data as { link_id: string }).link_id;
  }

  async approveParentLink(linkId: string): Promise<void> {
    const { error } = await supabase.rpc('approve_parent_link', {
      p_link_id: linkId,
    });

    if (error) throw error;
  }

  // Assignment operations (teacher)
  async createAssignment(
    teacherId: string,
    classroomId: string,
    title: string,
    type: 'quiz' | 'flashcard_deck',
    refId: string | null,
    dueDate: string | null
  ): Promise<string> {
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        teacher_id: teacherId,
        classroom_id: classroomId,
        title,
        type,
        ref_id: refId,
        due_date: dueDate,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async completeAssignment(assignmentId: string, studentId: string): Promise<void> {
    const { error } = await supabase
      .from('assignment_targets')
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('assignment_id', assignmentId)
      .eq('student_id', studentId);

    if (error) throw error;
  }
}

export const apiClient = new APIClient();
