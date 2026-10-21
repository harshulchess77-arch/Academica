export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'student' | 'teacher' | 'parent' | 'admin'
          tier: 'free' | 'pro' | 'school'
          grade: string | null
          country: string | null
          dob: string | null
          is_minor: boolean | null
          parent_email: string | null
          onboarding_complete: boolean
          xp_total: number
          streak_count: number
          last_streak_date: string | null
          vault_balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          tier?: 'free' | 'pro' | 'school'
          grade?: string | null
          country?: string | null
          dob?: string | null
          is_minor?: boolean | null
          parent_email?: string | null
          onboarding_complete?: boolean
          xp_total?: number
          streak_count?: number
          last_streak_date?: string | null
          vault_balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          tier?: 'free' | 'pro' | 'school'
          grade?: string | null
          country?: string | null
          dob?: string | null
          is_minor?: boolean | null
          parent_email?: string | null
          onboarding_complete?: boolean
          xp_total?: number
          streak_count?: number
          last_streak_date?: string | null
          vault_balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      test_scores: {
        Row: {
          id: string
          user_id: string
          test_name: string
          score: number
          max_score: number
          test_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          test_name: string
          score: number
          max_score: number
          test_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          test_name?: string
          score?: number
          max_score?: number
          test_date?: string
          created_at?: string
        }
      }
      skill_nodes: {
        Row: {
          id: string
          subject: string
          title: string
          description: string | null
          parent_id: string | null
          order_index: number
          xp_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          subject: string
          title: string
          description?: string | null
          parent_id?: string | null
          order_index: number
          xp_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          subject?: string
          title?: string
          description?: string | null
          parent_id?: string | null
          order_index?: number
          xp_reward?: number
          created_at?: string
        }
      }
      user_skill_progress: {
        Row: {
          id: string
          user_id: string
          skill_node_id: string
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          skill_node_id: string
          completed?: boolean
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          skill_node_id?: string
          completed?: boolean
          completed_at?: string | null
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          skill_node_id: string | null
          score: number
          total_questions: number
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_node_id?: string | null
          score: number
          total_questions: number
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_node_id?: string | null
          score?: number
          total_questions?: number
          completed_at?: string
        }
      }
      knowledge_gaps: {
        Row: {
          id: string
          user_id: string
          subject: string
          topic: string
          gap_severity: 'minor' | 'moderate' | 'severe'
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          topic: string
          gap_severity: 'minor' | 'moderate' | 'severe'
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          topic?: string
          gap_severity?: 'minor' | 'moderate' | 'severe'
          created_at?: string
          resolved_at?: string | null
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          mood: 'great' | 'good' | 'neutral' | 'challenged' | 'struggling' | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          mood?: 'great' | 'good' | 'neutral' | 'challenged' | 'struggling' | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          mood?: 'great' | 'good' | 'neutral' | 'challenged' | 'struggling' | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_items: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          item_type: 'project' | 'certificate' | 'achievement' | 'reflection'
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          item_type: 'project' | 'certificate' | 'achievement' | 'reflection'
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          item_type?: 'project' | 'certificate' | 'achievement' | 'reflection'
          metadata?: Json | null
          created_at?: string
        }
      }
      pomodoro_sessions: {
        Row: {
          id: string
          user_id: string
          subject: string | null
          duration_seconds: number
          completed: boolean
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          subject?: string | null
          duration_seconds: number
          completed?: boolean
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string | null
          duration_seconds?: number
          completed?: boolean
          started_at?: string
          completed_at?: string | null
        }
      }
      guilds: {
        Row: {
          id: string
          name: string
          description: string | null
          subject: string | null
          created_by: string | null
          member_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          subject?: string | null
          created_by?: string | null
          member_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          subject?: string | null
          created_by?: string | null
          member_count?: number
          created_at?: string
        }
      }
      guild_members: {
        Row: {
          id: string
          guild_id: string
          user_id: string
          role: 'member' | 'moderator' | 'leader'
          joined_at: string
        }
        Insert: {
          id?: string
          guild_id: string
          user_id: string
          role?: 'member' | 'moderator' | 'leader'
          joined_at?: string
        }
        Update: {
          id?: string
          guild_id?: string
          user_id?: string
          role?: 'member' | 'moderator' | 'leader'
          joined_at?: string
        }
      }
      guild_messages: {
        Row: {
          id: string
          guild_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          guild_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          guild_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          requirement: string | null
          xp_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          requirement?: string | null
          xp_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          requirement?: string | null
          xp_reward?: number
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: 'pro' | 'school'
          status: 'active' | 'cancelled' | 'expired'
          start_date: string
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tier: 'pro' | 'school'
          status?: 'active' | 'cancelled' | 'expired'
          start_date: string
          end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tier?: 'pro' | 'school'
          status?: 'active' | 'cancelled' | 'expired'
          start_date?: string
          end_date?: string | null
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string
        }
      }
      flashcard_decks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          subject: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          subject?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          subject?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      flashcard_items: {
        Row: {
          id: string
          deck_id: string
          front: string
          back: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          deck_id: string
          front: string
          back: string
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          deck_id?: string
          front?: string
          back?: string
          order_index?: number
          created_at?: string
        }
      }
      code_snippets: {
        Row: {
          id: string
          user_id: string
          title: string
          language: string
          code: string
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          language: string
          code: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          language?: string
          code?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      vault_items: {
        Row: {
          id: string
          name: string
          description: string | null
          item_type: 'avatar' | 'theme' | 'badge_frame' | 'title'
          cost: number
          icon: string | null
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          item_type: 'avatar' | 'theme' | 'badge_frame' | 'title'
          cost: number
          icon?: string | null
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          item_type?: 'avatar' | 'theme' | 'badge_frame' | 'title'
          cost?: number
          icon?: string | null
          is_available?: boolean
          created_at?: string
        }
      }
      user_inventory: {
        Row: {
          id: string
          user_id: string
          vault_item_id: string
          purchased_at: string
          is_equipped: boolean
        }
        Insert: {
          id?: string
          user_id: string
          vault_item_id: string
          purchased_at?: string
          is_equipped?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          vault_item_id?: string
          purchased_at?: string
          is_equipped?: boolean
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          domain: string | null
          tier: 'school' | 'district' | 'enterprise'
          max_students: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          domain?: string | null
          tier: 'school' | 'district' | 'enterprise'
          max_students?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string | null
          tier?: 'school' | 'district' | 'enterprise'
          max_students?: number | null
          created_at?: string
        }
      }
      classrooms: {
        Row: {
          id: string
          organization_id: string | null
          teacher_id: string | null
          name: string
          subject: string | null
          grade: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id?: string | null
          teacher_id?: string | null
          name: string
          subject?: string | null
          grade?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          teacher_id?: string | null
          name?: string
          subject?: string | null
          grade?: string | null
          created_at?: string
        }
      }
      classroom_members: {
        Row: {
          id: string
          classroom_id: string
          student_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          classroom_id: string
          student_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          classroom_id?: string
          student_id?: string
          joined_at?: string
        }
      }
      moderation_actions: {
        Row: {
          id: string
          moderator_id: string | null
          target_user_id: string | null
          action_type: 'warning' | 'suspension' | 'ban' | 'content_removal'
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          moderator_id?: string | null
          target_user_id?: string | null
          action_type: 'warning' | 'suspension' | 'ban' | 'content_removal'
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          moderator_id?: string | null
          target_user_id?: string | null
          action_type?: 'warning' | 'suspension' | 'ban' | 'content_removal'
          reason?: string | null
          created_at?: string
        }
      }
      compliance_events: {
        Row: {
          id: string
          user_id: string | null
          event_type: 'coppa_consent' | 'gdpr_export' | 'account_deletion' | 'parent_link' | 'data_request'
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_type: 'coppa_consent' | 'gdpr_export' | 'account_deletion' | 'parent_link' | 'data_request'
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          event_type?: 'coppa_consent' | 'gdpr_export' | 'account_deletion' | 'parent_link' | 'data_request'
          details?: Json | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due'
          title: string
          body: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due'
          title: string
          body: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due'
          title?: string
          body?: string
          read?: boolean
          created_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          teacher_id: string
          classroom_id: string
          title: string
          type: 'quiz' | 'flashcard_deck'
          ref_id: string | null
          due_date: string
          created_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          classroom_id: string
          title: string
          type: 'quiz' | 'flashcard_deck'
          ref_id?: string | null
          due_date: string
          created_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          classroom_id?: string
          title?: string
          type?: 'quiz' | 'flashcard_deck'
          ref_id?: string | null
          due_date?: string
          created_at?: string
        }
      }
      assignment_targets: {
        Row: {
          id: string
          assignment_id: string
          student_id: string
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          id?: string
          assignment_id: string
          student_id: string
          completed?: boolean
          completed_at?: string | null
        }
        Update: {
          id?: string
          assignment_id?: string
          student_id?: string
          completed?: boolean
          completed_at?: string | null
        }
      }
      parent_student_links: {
        Row: {
          id: string
          parent_id: string
          student_id: string
          status: 'pending' | 'approved' | 'revoked'
          created_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          student_id: string
          status?: 'pending' | 'approved' | 'revoked'
          created_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          student_id?: string
          status?: 'pending' | 'approved' | 'revoked'
          created_at?: string
        }
      }
      leaderboard_opt_ins: {
        Row: {
          id: string
          user_id: string
          display_alias: string | null
          opted_in: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_alias?: string | null
          opted_in?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_alias?: string | null
          opted_in?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      error_logs: {
        Row: {
          id: string
          user_id: string | null
          message: string
          stack: string | null
          route: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          message: string
          stack?: string | null
          route?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          message?: string
          stack?: string | null
          route?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      purchase_vault_item: {
        Args: {
          user_uuid: string
          item_uuid: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
