import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let client: Client | null = null;

  try {
    // Parse connection details from SUPABASE_URL
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const dbPassword =
      Deno.env.get("SUPABASE_DB_PASSWORD") || Deno.env.get("DB_PASSWORD");

    if (!supabaseUrl || !dbPassword) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_DB_PASSWORD");
    }

    // Extract hostname from URL (e.g., from https://abc.supabase.co get abc.supabase.co)
    const url = new URL(supabaseUrl);
    const hostname = `db.${url.hostname.replace(
      ".supabase.co",
      ".supabase.co"
    )}`;

    console.log(`Connecting to database at: ${hostname}`);

    client = new Client({
      user: "postgres",
      database: "postgres",
      hostname: hostname,
      password: dbPassword,
      port: 5432,
      tls: {
        enabled: true,
        enforce: false,
        caCertificates: [],
      },
    });

    await client.connect();
    console.log("Connected to database successfully");

    // Insert ping record
    const insertResult = await client.queryArray(
      `INSERT INTO public.ping (message, pinged_at) 
       VALUES ($1, $2) 
       RETURNING id, pinged_at`,
      [`Ping at ${new Date().toISOString()}`, new Date()]
    );

    console.log("Insert successful:", insertResult.rows[0]);

    // Clean up old records (keep last 5)
    const deleteResult = await client.queryArray(
      `DELETE FROM public.ping 
       WHERE id < $1`,
      [Number(insertResult.rows[0][0]) - 4]
    );

    console.log(`Cleaned up ${deleteResult.rowCount} old records`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Database pinged successfully",
        timestamp: new Date().toISOString(),
        ping_id: Number(insertResult.rows[0][0]), // Convert BigInt to Number
        cleaned_records: deleteResult.rowCount || 0,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Database error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (e) {
        console.error("Error closing connection:", e);
      }
    }
  }
});
