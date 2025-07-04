
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, title, contentName, tmdbData } = await req.json();

    let prompt = '';
    
    switch (category) {
      case 'nova_serie':
        prompt = `Crie um texto publicitário atrativo para divulgar ${contentName || title} que acabou de entrar no catálogo de IPTV. ${tmdbData ? `Informações: ${tmdbData.overview ? tmdbData.overview.substring(0, 200) : ''} - Nota: ${tmdbData.vote_average}/10` : ''}. Use emojis, tom informal e persuasivo, máximo 150 caracteres. Inclua call-to-action para contato via WhatsApp.`;
        break;
      case 'promocao':
        prompt = `Crie um texto publicitário para a promoção "${title}". Use emojis, tom urgente e persuasivo, destaque a oferta especial, máximo 150 caracteres. Inclua call-to-action para contato imediato.`;
        break;
      case 'comemorativo':
        prompt = `Crie um texto comemorativo para "${title}". Use emojis apropriados, tom festivo e inclua uma oferta especial relacionada à data, máximo 150 caracteres.`;
        break;
      case 'revendedor':
        prompt = `Crie um texto para captar revendedores com o título "${title}". Foque em oportunidade de negócio, comissões atrativas, suporte completo. Use emojis profissionais, máximo 150 caracteres.`;
        break;
      default:
        prompt = `Crie um texto publicitário atrativo para "${title}". Use emojis e tom persuasivo, máximo 150 caracteres.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em marketing para IPTV e pequenos negócios. Crie textos publicitários atraentes, com emojis e call-to-action eficazes.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-banner-text function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
