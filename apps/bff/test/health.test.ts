import { assert, it } from "@effect/vitest";
import { env } from "cloudflare:workers";
import { Effect } from "effect";

import app from "../src";

it.effect("returns the health status and users from D1", () =>
  Effect.gen(function* () {
    yield* Effect.tryPromise(() =>
      env.DB.prepare("INSERT INTO users (id, email, name) VALUES (?, ?, ?)")
        .bind("test-user", "test@example.com", "Test User")
        .run(),
    );

    const response = yield* Effect.tryPromise(async () => app.request("/health", undefined, env));
    const body = yield* Effect.tryPromise(() => response.text());

    assert.strictEqual(response.status, 200);
    assert.include(body, '"status":"ok"');
    assert.include(body, '"id":"test-user"');
    assert.include(body, '"email":"test@example.com"');
    assert.include(body, '"name":"Test User"');
  }),
);
