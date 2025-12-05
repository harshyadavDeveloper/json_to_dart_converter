export function formatJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (err) {
    throw new Error("Invalid JSON", err);
  }
}
