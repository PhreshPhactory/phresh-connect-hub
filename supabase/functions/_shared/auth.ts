// Shared auth/role check for edge functions.
// Returns { ok: true, userId } when the caller has a required role, otherwise
// returns { ok: false, response } with a ready-to-return Response.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export type RequireRoleResult =
  | { ok: true; userId: string }
  | { ok: false; response: Response };

export async function requireStaffRole(
  req: Request,
  corsHeaders: Record<string, string>,
  roles: string[] = ["admin", "editor"],
): Promise<RequireRoleResult> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  const adminClient = createClient(supabaseUrl, serviceKey);
  const { data: userRoles } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id);
  const allowed = (userRoles ?? []).some((r: { role: string }) =>
    roles.includes(r.role),
  );
  if (!allowed) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  return { ok: true, userId: userData.user.id };
}
