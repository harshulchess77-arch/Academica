import { supabase } from './supabase';
import type { Profile, SkillNode, UserSkillProgress } from '../types';

// Service for calculating and managing user statistics
export class StatsService {
  async getUserStats(userId: string): Promise<{
    totalXp: number;
    currentLevel: number;
    currentStreak: number;
    badgesEarned: number;
    journalCount: number;
    completedPomodoros: number;
    guildCount: number;
    skillNodesUnlocked: number;
    skillNodesCompleted: number;
  }> {
    const [profile, badges, journals, pomodoros, guilds, skillProgress] = await Promise.all([
      supabase.from('profiles').select('xp_total, level, streak_count').eq('id', userId).single(),
      supabase.from('user_badges').select('id').eq('user_id', userId),
      supabase.from('journal_entries').select('id').eq('user_id', userId),
      supabase.from('pomodoro_sessions').select('id').eq('user_id', userId).eq('completed', true),
      supabase.from('guild_members').select('id').eq('user_id', userId),
      supabase.from('user_skill_progress').select('*').eq('user_id', userId),
    ]);

    if (profile.error) throw profile.error;

    const skillProgressData = skillProgress.data || [];
    const unlocked = skillProgressData.filter((p) => p.unlocked).length;
    const completed = skillProgressData.filter((p) => p.mastery_level >= 100).length;

    return {
      totalXp: profile.data.xp_total,
      currentLevel: profile.data.level,
      currentStreak: profile.data.streak_count,
      badgesEarned: badges.data?.length || 0,
      journalCount: journals.data?.length || 0,
      completedPomodoros: pomodoros.data?.length || 0,
      guildCount: guilds.data?.length || 0,
      skillNodesUnlocked: unlocked,
      skillNodesCompleted: completed,
    };
  }

  async getSubjectProgress(userId: string, subject: string): Promise<{
    nodesUnlocked: number;
    totalNodes: number;
    averageMastery: number;
    currentLevel: number;
  }> {
    const [nodes, progress] = await Promise.all([
      supabase.from('skill_nodes').select('*').eq('subject', subject),
      supabase.from('user_skill_progress').select('*').eq('user_id', userId),
    ]);

    if (nodes.error) throw nodes.error;
    if (progress.error) throw progress.error;

    const subjectNodes = nodes.data || [];
    const userProgress = progress.data || [];

    const unlocked = userProgress.filter((p) => p.unlocked).length;
    const averageMastery =
      userProgress.length > 0
        ? userProgress.reduce((sum, p) => sum + p.mastery_level, 0) / userProgress.length
        : 0;

    return {
      nodesUnlocked: unlocked,
      totalNodes: subjectNodes.length,
      averageMastery,
      currentLevel: Math.floor(averageMastery / 20) + 1,
    };
  }

  async getWeeklyActivity(userId: string): Promise<Array<{ date: string; xp: number; minutes: number }>> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const { data, error } = await supabase
      .from('pomodoro_sessions')
      .select('started_at, duration_seconds')
      .eq('user_id', userId)
      .eq('completed', true)
      .gte('started_at', startDate.toISOString())
      .order('started_at', { ascending: true });

    if (error) throw error;

    const activityByDate = new Map<string, { xp: number; minutes: number }>();

    (data || []).forEach((session) => {
      const date = new Date(session.started_at).toISOString().split('T')[0];
      const current = activityByDate.get(date) || { xp: 0, minutes: 0 };
      current.minutes += Math.floor(session.duration_seconds / 60);
      current.xp += Math.floor(session.duration_seconds / 60) * 10; // 10 XP per minute
      activityByDate.set(date, current);
    });

    return Array.from(activityByDate.entries()).map(([date, stats]) => ({
      date,
      xp: stats.xp,
      minutes: stats.minutes,
    }));
  }

  async compareWithPeers(userId: string): Promise<{
    xpPercentile: number;
    streakPercentile: number;
    levelPercentile: number;
  }> {
    // Get all users' stats
    const { data: allProfiles, error } = await supabase
      .from('profiles')
      .select('xp_total, streak_count, level');

    if (error) throw error;

    if (!allProfiles || allProfiles.length === 0) {
      return { xpPercentile: 50, streakPercentile: 50, levelPercentile: 50 };
    }

    const { data: userProfile } = await supabase
      .from('profiles')
      .select('xp_total, streak_count, level')
      .eq('id', userId)
      .single();

    if (!userProfile) {
      return { xpPercentile: 50, streakPercentile: 50, levelPercentile: 50 };
    }

    const calculatePercentile = (value: number, allValues: number[]): number => {
      const count = allValues.filter((v) => v <= value).length;
      return Math.round((count / allValues.length) * 100);
    };

    return {
      xpPercentile: calculatePercentile(userProfile.xp_total, allProfiles.map((p) => p.xp_total)),
      streakPercentile: calculatePercentile(
        userProfile.streak_count,
        allProfiles.map((p) => p.streak_count)
      ),
      levelPercentile: calculatePercentile(userProfile.level, allProfiles.map((p) => p.level)),
    };
  }
}

export const statsService = new StatsService();
