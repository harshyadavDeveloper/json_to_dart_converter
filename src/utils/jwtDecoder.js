// utils/jwtDecoder.js

function base64UrlDecode(str) {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + (4 - (base64.length % 4)) % 4,
      "="
    );

    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return null;
  }
}

export function decodeJwt(token) {
  if (!token) throw new Error("Token is empty");

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const headerStr = base64UrlDecode(parts[0]);
  const payloadStr = base64UrlDecode(parts[1]);

  if (!headerStr || !payloadStr) {
    throw new Error("Invalid Base64 encoding");
  }

  const header = JSON.parse(headerStr);
  const payload = JSON.parse(payloadStr);

  let expiry = null;
  let expired = null;

  if (payload.exp) {
    expiry = new Date(payload.exp * 1000);
    expired = expiry < new Date();
  }

  return {
    header,
    payload,
    expiry,
    expired,
  };
}
