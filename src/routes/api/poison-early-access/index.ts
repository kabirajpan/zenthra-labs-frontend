import type { RequestHandler } from "@builder.io/qwik-city";
import { API_BASE } from "~/lib/api";

const KV_LIST_KEY = "poison:early_access";

export interface PoisonEarlyAccessEntry {
    id: string;
    name: string;
    age: number;
    email: string;
    product: string;
    version: string;
    createdAt: string;
}

export const onPost: RequestHandler = async ({ request, env, json }) => {
    let body: { name?: unknown; age?: unknown; email?: unknown };
    try {
        body = (await request.json()) as { name?: unknown; age?: unknown; email?: unknown };
    } catch {
        json(400, { ok: false, error: "Invalid JSON payload" });
        return;
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const age = typeof body.age === "number" ? body.age : Number.parseInt(String(body.age ?? ""), 10);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (name.length < 2 || name.length > 100) {
        json(400, { ok: false, error: "Invalid name" });
        return;
    }
    if (!Number.isFinite(age) || age < 13 || age > 120) {
        json(400, { ok: false, error: "Invalid age (13-120)" });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
        json(400, { ok: false, error: "Invalid email" });
        return;
    }

    const entry: PoisonEarlyAccessEntry = {
        id: crypto.randomUUID(),
        name,
        age,
        email,
        product: "poison",
        version: "v1.0.0",
        createdAt: new Date().toISOString(),
    };

    const kvUrl = env.get("KV_REST_API_URL") || env.get("UPSTASH_REDIS_REST_URL");
    const kvToken = env.get("KV_REST_API_TOKEN") || env.get("UPSTASH_REDIS_REST_TOKEN");

    if (!kvUrl || !kvToken) {
        json(200, { ok: true, stored: false, entry });
        return;
    }

    try {
        const res = await fetch(`${kvUrl}/lpush/${encodeURIComponent(KV_LIST_KEY)}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${kvToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify([JSON.stringify(entry)]),
        });

        if (!res.ok) {
            json(502, { ok: false, error: "Failed to persist entry" });
            return;
        }
        json(200, { ok: true, stored: true, entry });
    } catch {
        json(502, { ok: false, error: "Storage request failed" });
    }
};

export const onGet: RequestHandler = async ({ request, cookie, env, json }) => {
    const authHeader = request.headers.get("authorization");
    const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = bearer || cookie.get("zenthra_auth_token")?.value;

    if (!token) {
        json(401, { ok: false, error: "Unauthorized" });
        return;
    }

    try {
        const meRes = await fetch(`${API_BASE}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!meRes.ok) {
            json(401, { ok: false, error: "Unauthorized" });
            return;
        }
        const meData = (await meRes.json()) as { user?: { role?: string } };
        if (meData.user?.role !== "admin") {
            json(403, { ok: false, error: "Forbidden" });
            return;
        }
    } catch {
        json(502, { ok: false, error: "Auth verification failed" });
        return;
    }

    const kvUrl = env.get("KV_REST_API_URL") || env.get("UPSTASH_REDIS_REST_URL");
    const kvToken = env.get("KV_REST_API_TOKEN") || env.get("UPSTASH_REDIS_REST_TOKEN");

    if (!kvUrl || !kvToken) {
        json(200, { ok: true, configured: false, entries: [] });
        return;
    }

    try {
        const res = await fetch(`${kvUrl}/lrange/${encodeURIComponent(KV_LIST_KEY)}/0/499`, {
            headers: { Authorization: `Bearer ${kvToken}` },
        });
        if (!res.ok) {
            json(502, { ok: false, error: "Failed to read entries" });
            return;
        }
        const data = (await res.json()) as { result?: string[] };
        const entries: PoisonEarlyAccessEntry[] = (data.result || [])
            .map((raw) => {
                try {
                    return JSON.parse(raw) as PoisonEarlyAccessEntry;
                } catch {
                    return null;
                }
            })
            .filter((x): x is PoisonEarlyAccessEntry => x !== null);

        json(200, { ok: true, configured: true, entries });
    } catch {
        json(502, { ok: false, error: "Failed to fetch storage" });
    }
};
