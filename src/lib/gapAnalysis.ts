import { supabase } from './supabase';
import type { KnowledgeGap, QuizAttempt } from '../types';

// Service for analyzing and detecting knowledge gaps
export class GapAnalysisService {
  async analyzeQuizResults(userId: string, subject: string): Promise<KnowledgeGap[]> {
    // Get recent quiz attempts for the subject
    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('subject', subject)
      .order('completed_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    if (!attempts || attempts.length < 3) {
      return []; // Need at least 3 attempts to detect patterns
    }

    const gaps: KnowledgeGap[] = [];
    const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;

    // If average score is below 70%, flag as knowledge gap
    if (averageScore < 70) {
      gaps.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        user_id: userId,
        subject,
        topic: `${subject} fundamentals`,
        gap_severity: averageScore < 50 ? 'severe' : 'moderate',
        detected_at: new Date().toISOString(),
        resolved_at: null,
      });
    }

    return gaps;
  }

  async resolveGap(gapId: string): Promise<void> {
    const { error } = await supabase
      .from('knowledge_gaps')
      .update({ resolved_at: new Date().toISOString() })
      .eq('id', gapId);

    if (error) throw error;
  }

  async getUserGaps(userId: string): Promise<KnowledgeGap[]> {
    const { data, error } = await supabase
      .from('knowledge_gaps')
      .select('*')
      .eq('user_id', userId)
      .is('resolved_at', null)
      .order('detected_at', { ascending: false });

    if (error) throw error;
    return data as KnowledgeGap[];
  }

  async generateGapRecommendations(gap: KnowledgeGap): Promise<string[]> {
    // Generate recommendations based on the gap
    const recommendations: string[] = [];

    switch (gap.gap_severity) {
      case 'severe':
        recommendations.push('Review foundational concepts');
        recommendations.push('Practice with basic exercises');
        recommendations.push('Schedule a tutoring session');
        break;
      case 'moderate':
        recommendations.push('Practice mixed exercises');
        recommendations.push('Review similar topics');
        recommendations.push('Take a refresher quiz');
        break;
      case 'minor':
        recommendations.push('Practice occasional review');
        recommendations.push('Try advanced exercises');
        break;
    }

    return recommendations;
  }
}

export const gapAnalysisService = new GapAnalysisService();
