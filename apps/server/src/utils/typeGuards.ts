// Mongo duplicate key error
export function isMongoDuplicateError(
  err: unknown
): err is { code: number; keyValue?: Record<string, unknown> } {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: unknown }).code === 11000
  )
}

// JWT expired
export function isTokenExpiredError(
  err: unknown
): err is { name: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as { name?: unknown }).name === "TokenExpiredError"
  );
}

// JWT invalid
export function isJsonWebTokenError(
  err: unknown
): err is { name: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as { name?: unknown }).name === "JsonWebTokenError"
  );
}