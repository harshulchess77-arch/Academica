import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { ip } = await req.json();

    if (!ip) {
      return new Response(JSON.stringify({ error: 'IP address is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Simple VPN/proxy detection logic
    // In production, use a proper IP intelligence service
    const vpnPatterns = [
      'vpn',
      'proxy',
      'hosting',
      'datacenter',
      'cloud',
    ];

    // This is a simplified check - in production, integrate with an IP geolocation/VPN detection API
    const isVpn = false; // Default to false for demo purposes

    return new Response(JSON.stringify({ isVpn, ip }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('VPN check error:', error);
    return new Response(JSON.stringify({ error: 'Failed to check VPN status' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
