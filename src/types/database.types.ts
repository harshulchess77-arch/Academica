// Database type definitions generated from Supabase schema
// These types match the tables defined in migrations 0001_init.sql, 0002_admin_multitenant.sql, 0003_social_notifications.sql

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
          display_name: string
          avatar_url: string | null
          grade: 'K' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'college' | null
          bio: string | null
          role: 'student' | 'teacher' | 'parent' | 'admin'
          xp_total: number
          level: number
          streak_count: number
          last_active_at: string | null
          onboarding_complete: boolean
          dob: string | null
          is_minor: boolean | null
          parent_email: string | null
          country: string | null
          vpn_check_passed: boolean
          selected_tier: 'free' | 'pro' | 'premium' | null
          subscription_id: string | null
          dyslexic_font_enabled: boolean
          high_contrast_enabled: boolean
          reduce_motion_enabled: boolean
          tts_speed: number
          larger_click_targets: boolean
          always_show_focus: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name: string
          avatar_url?: string | null
          grade?: 'K' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'college' | null
          bio?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          xp_total?: number
          level?: number
          streak_count?: number
          last_active_at?: string | null
          onboarding_complete?: boolean
          dob?: string | null
          is_minor?: boolean | null
          parent_email?: string | null
          country?: string | null
          vpn_check_passed?: boolean
          selected_tier?: 'free' | 'pro' | 'premium' | null
          subscription_id?: string | null
          dyslexic_font_enabled?: boolean
          high_contrast_enabled?: boolean
          reduce_motion_enabled?: boolean
          tts_speed?: number
          larger_click_targets?: boolean
          always_show_focus?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          email?: string
          display_name?: string
          avatar_url?: string | null
          grade?: 'K' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'college' | null
          bio?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          xp_total?: number
          level?: number
          streak_count?: number
          last_active_at?: string | null
          onboarding_complete?: boolean
          dob?: string | null
          is_minor?: boolean | null
          parent_email?: string | null
          country?: string | null
          vpn_check_passed?: boolean
          selected_tier?: 'free' | 'pro' | 'premium' | null
          subscription_id?: string | null
          dyslexic_font_enabled?: boolean
          high_contrast_enabled?: boolean
          reduce_motion_enabled?: boolean
          tts_speed?: number
          larger_click_targets?: boolean
          always_show_focus?: boolean
          updated_at?: string
        }
      }
      test_scores: {
        Row: {
          id: string
          user_id: string
          subject: string
          score: number
          max_score: number
          test_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          score: number
          max_score: number
          test_date: string
          created_at?: string
        }
        Update: {
          id: string
          user_id?: string
          subject?: string
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
          branch: string
          level: number
          title: string
          description: string | null
          required_xp: number
          parent_node_id: string | null
          position_x: number
          position_y: number
          created_at: string
        }
        Insert: {
          id?: string
          subject: string
          branch: string
          level: number
          title: string
          description?: string | null
          required_xp?: number
          parent_node_id?: string | null
          position_x: number
          position_y: number
          created_at?: string
        }
        Update: {
          id: string
          subject?: string
          branch?: string
          level?: number
          title?: string
          description?: string | null
          required_xp?: number
          parent_node_id?: string | null
          position_x?: number
          position_y?: number
        }
      }
      user_skill_progress: {
        Row: {
          id: string
          user_id: string
          node_id: string
          unlocked: boolean
          mastery_level: number
          unlocked_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          node_id: string
          unlocked?: boolean
          mastery_level?: number
          unlocked_at?: string | null
        }
        Update: {
          id: string
          user_id?: string
          node_id?: string
          unlocked?: boolean
          mastery_level?: number
          unlocked_at?: string | null
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          subject: string
          score: number
          total_questions: number
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          score: number
          total_questions: number
          completed_at?: string
        }
        Update: {
          id: string
          user_id?: string
          subject?: string
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
          detected_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          topic: string
          gap_severity: 'minor' | 'moderate' | 'severe'
          detected_at?: string
          resolved_at?: string | null
        }
        Update: {
          id: string
          user_id?: string
          subject?: string
          topic?: string
          gap_severity?: 'minor' | 'moderate' | 'severe'
          detected_at?: string
          resolved_at?: string | null
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          mood: 'excited' | 'calm' | 'confused' | 'frustrated' | 'proud' | null
          tags: string[]
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          mood?: 'excited' | 'calm' | 'confused' | 'frustrated' | 'proud' | null
          tags?: string[]
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          user_id?: string
          title?: string
          content?: string
          mood?: 'excited' | 'calm' | 'confused' | 'frustrated' | 'proud' | null
          tags?: string[]
          is_private?: boolean
          updated_at?: string
        }
      }
      portfolio_items: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          item_type: 'certificate' | 'project' | 'reflection' | 'achievement'
          item_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          item_type: 'certificate' | 'project' | 'reflection' | 'achievement'
          item_url?: string | null
          created_at?: string
        }
        Update: {
          id: string
          user_id?: string
          title?: string
          description?: string | null
          item_type?: 'certificate' | 'project' | 'reflection' | 'achievement'
          item_url?: string | null
        }
      }
      pomodoro_sessions: {
        Row: {
          id: string
          user_id: string
          duration_seconds: number
          completed: boolean
          task: string | null
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          duration_seconds: number
          completed?: boolean
          task?: string | null
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id: string
          user_id?: string
          duration_seconds?: number
          completed?: boolean
          task?: string | null
          started_at?: string
          completed_at?: string | null
        }
      }
      guilds: {
        Row: {
          id: string
          name: string
          description: string | null
          focus_subject: string | null
          member_count: number
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          focus_subject?: string | null
          member_count?: number
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id: string
          name?: string
          description?: string | null
          focus_subject?: string | null
          member_count?: number
        }
      }
      guild_members: {
        Row: {
          id: string
          guild_id: string
          user_id: string
          role: 'member' | 'moderator' | 'admin'
          joined_at: string
        }
        Insert: {
          id?: string
          guild_id: string
          user_id: string
          role?: 'member' | 'moderator' | 'admin'
          joined_at?: string
        }
        Update: {
          id: string
          guild_id?: string
          user_id?: string
          role?: 'member' | 'moderator' | 'admin'
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
          id: string
          guild_id?: string
          user_id?: string
          content?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          tier: 'bronze' | 'silver' | 'gold' | 'platinum'
          required_xp: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
          required_xp?: number
          created_at?: string
        }
        Update: {
          id: string
          name?: string
          description?: string | null
          icon?: string | null
          tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
          required_xp?: number
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
          id: string
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: 'free' | 'pro' | 'premium'
          status: 'active' | 'cancelled' | 'expired'
          stripe_subscription_id: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tier: 'free' | 'pro' | 'premium'
          status?: 'active' | 'cancelled' | 'expired'
          stripe_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at?: string | null
          created_at?: string
        }
        Update: {
          id: string
          user_id?: string
          tier?: 'free' | 'pro' | 'premium'
          status?: 'active' | 'cancelled' | 'expired'
          stripe_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at?: string | null
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
          id: string
          name?: string
          email?: string
          subject?: string
          message?: string
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
          id: string
          user_id?: string
          title?: string
          description?: string | null
          subject?: string | null
          is_public?: boolean
          updated_at?: string
        }
      }
      flashcard_items: {
        Row: {
          id: string
          deck_id: string
          front: string
          back: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          deck_id: string
          front: string
          back: string
          position?: number
          created_at?: string
        }
        Update: {
          id: string
          deck_id?: string
          front?: string
          back?: string
          position?: number
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
          id: string
          user_id?: string
          title?: string
          language?: string
          code?: string
          description?: string | null
          is_public?: boolean
          updated_at?: string
        }
      }
      vault_items: {
        Row: {
          id: string
          name: string
          description: string | null
          item_type: 'cosmetic' | 'avatar_frame' | 'background' | 'effect'
          cost_xp: number
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          item_type: 'cosmetic' | 'avatar_frame' | 'background' | 'effect'
          cost_xp: number
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id: string
          name?: string
          description?: string | null
          item_type?: 'cosmetic' | 'avatar_frame' | 'background' | 'effect'
          cost_xp?: number
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          image_url?: string | null
        }
      }
      user_inventory: {
        Row: {
          id: string
          user_id: string
          item_id: string
          equipped: boolean
          purchased_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_id: string
          equipped?: boolean
          purchased_at?: string
        }
        Update: {
          id: string
          user_id?: string
          item_id?: string
          equipped?: boolean
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          type: 'school' | 'district' | 'company'
          admin_id: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'school' | 'district' | 'company'
          admin_id: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          name?: string
          type?: 'school' | 'district' | 'company'
          admin_id?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      classrooms: {
        Row: {
          id: string
          organization_id: string
          name: string
          grade_level: string | null
          subject: string | null
          teacher_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          grade_level?: string | null
          subject?: string | null
          teacher_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          organization_id?: string
          name?: string
          grade_level?: string | null
          subject?: string | null
          teacher_id?: string
          updated_at?: string
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
          id: string
          classroom_id?: string
          student_id?: string
        }
      }
      moderation_actions: {
        Row: {
          id: string
          moderator_id: string
          target_type: 'user' | 'guild_message' | 'code_snippet' | 'flashcard_deck'
          target_id: string
          action: 'warning' | 'suspended' | 'deleted' | 'flagged'
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          moderator_id: string
          target_type: 'user' | 'guild_message' | 'code_snippet' | 'flashcard_deck'
          target_id: string
          action: 'warning' | 'suspended' | 'deleted' | 'flagged'
          reason?: string | null
          created_at?: string
        }
        Update: {
          id: string
          moderator_id?: string
          target_type?: 'user' | 'guild_message' | 'code_snippet' | 'flashcard_deck'
          target_id?: string
          action?: 'warning' | 'suspended' | 'deleted' | 'flagged'
          reason?: string | null
        }
      }
      compliance_events: {
        Row: {
          id: string
          user_id: string | null
          event_type: string
          details: Json
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_type: string
          details?: Json
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id: string
          user_id?: string | null
          event_type?: string
          details?: Json
          ip_address?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due' | 'weekly_digest' | 'parent_request_approved'
          title: string
          body: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due' | 'weekly_digest' | 'parent_request_approved'
          title: string
          body: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id: string
          user_id?: string
          type?: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due' | 'weekly_digest' | 'parent_request_approved'
          title?: string
          body?: string
          read?: boolean
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
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          classroom_id: string
          title: string
          type: 'quiz' | 'flashcard_deck'
          ref_id?: string | null
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id: string
          teacher_id?: string
          classroom_id?: string
          title?: string
          type?: 'quiz' | 'flashcard_deck'
          ref_id?: string | null
          due_date?: string | null
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
          id: string
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
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          student_id: string
          status?: 'pending' | 'approved' | 'revoked'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string
          parent_id?: string
          student_id?: string
          status?: 'pending' | 'approved' | 'revoked'
          updated_at?: string
        }
      }
      leaderboard_opt_ins: {
        Row: {
          id: string
          user_id: string
          display_alias: string
          opted_in: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_alias: string
          opted_in?: boolean
          created_at?: string
        }
        Update: {
          id: string
          user_id?: string
          display_alias?: string
          opted_in?: boolean
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
          id: string
          user_id?: string | null
          message?: string
          stack?: string | null
          route?: string | null
        }
      }
      rate_limit_counters: {
        Row: {
          id: string
          user_id: string
          endpoint: string
          request_count: number
          window_start: string
        }
        Insert: {
          id?: string
          user_id: string
          endpoint: string
          request_count?: number
          window_start?: string
        }
        Update: {
          id: string
          user_id?: string
          endpoint?: string
          request_count?: number
          window_start?: string
        }
      }
      Views: {
        [_ in never]: never
      }
      Functions: {
        [_ in never]: never
      }
      Enums: {
        [_ in never]: never
      }
    }
  }
}
