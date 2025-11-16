import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message }: RequestData = await req.json();

    console.log("Received request:", { name, phone, email, message });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram credentials");
      throw new Error("Telegram credentials not configured");
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Save request to database
    const { data: savedRequest, error: dbError } = await supabase
      .from("requests")
      .insert({
        name,
        phone,
        email,
        message,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save request: ${dbError.message}`);
    }

    console.log("Request saved to database:", savedRequest);

    // Format the message for Telegram
    const telegramMessage = `
🔔 *Новая заявка с сайта!*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
${email ? `📧 *Email:* ${email}` : ""}
💬 *Описание работ:*
${message}

⏰ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}
    `.trim();

    console.log("Sending message to Telegram...");

    // Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramData);
      throw new Error(`Telegram API error: ${JSON.stringify(telegramData)}`);
    }

    console.log("Telegram message sent successfully:", telegramData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        telegram: telegramData,
        request: savedRequest 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-telegram-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
