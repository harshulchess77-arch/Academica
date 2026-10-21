import { supabase } from './supabase';

// Compliance event logging
export const logComplianceEvent = async (
  eventType: string,
  details: Record<string, unknown> = {}
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.rpc('log_compliance_event', {
      p_event_type: eventType,
      p_details: details,
    });

    if (error) throw error;
    return data as string;
  } catch (error) {
    console.error('Failed to log compliance event:', error);
    return null;
  }
};

// GDPR data export
export const exportUserData = async (): Promise<Record<string, unknown> | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gdpr-export`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to export data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GDPR export failed:', error);
    return null;
  }
};

// GDPR data deletion request
export const requestAccountDeletion = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Log the deletion request
    await logComplianceEvent('data_deletion', {
      requested_by: user.email,
      timestamp: new Date().toISOString(),
    });

    // In production, this would trigger a secure deletion workflow
    // For now, we'll just log the request
    return true;
  } catch (error) {
    console.error('Account deletion request failed:', error);
    return false;
  }
};

// Content moderation
export const moderateContent = async (content: string): Promise<{ isSafe: boolean; reason?: string }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { isSafe: true };

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/moderation-scan`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      // Fail open - if moderation fails, assume content is safe
      return { isSafe: true };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Moderation check failed:', error);
    // Fail open
    return { isSafe: true };
  }
};

// VPN check for compliance
export const checkVPN = async (): Promise<{ isVpn: boolean; ip: string }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vpn-check`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: '' }), // IP detected server-side
      }
    );

    if (!response.ok) {
      return { isVpn: false, ip: 'unknown' };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('VPN check failed:', error);
    return { isVpn: false, ip: 'unknown' };
  }
};

// COPPA age verification
export const verifyAge = (dob: string): { isMinor: boolean; age: number } => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ? age - 1
    : age;

  return {
    isMinor: actualAge < 13,
    age: actualAge,
  };
};

// Parental consent tracking
export const logParentalConsent = async (
  childId: string,
  consentType: 'data_collection' | 'ai_features' | 'leaderboard'
): Promise<boolean> => {
  try {
    await logComplianceEvent('consent_granted', {
      child_id: childId,
      consent_type: consentType,
      timestamp: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Failed to log parental consent:', error);
    return false;
  }
};

// Terms acceptance tracking
export const logTermsAcceptance = async (version: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    await logComplianceEvent('terms_accepted', {
      user_id: user.id,
      version,
      timestamp: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Failed to log terms acceptance:', error);
    return false;
  }
};
