const encoder = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function signTimestamp(timestamp: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp))));
}

export async function createAdminToken(secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  return btoa(`${timestamp}:${await signTimestamp(timestamp, secret)}`);
}

export async function verifyAdminToken(token: string, secret: string): Promise<boolean> {
  try {
    const [timestamp, signature, extra] = atob(token).split(":");
    const issuedAt = Number(timestamp);
    if (!timestamp || !signature || extra !== undefined || !Number.isFinite(issuedAt)) return false;
    const age = Date.now() - issuedAt;
    if (age < 0 || age > 2 * 60 * 60 * 1000) return false;
    return constantTimeEqual(signature, await signTimestamp(timestamp, secret));
  } catch {
    return false;
  }
}