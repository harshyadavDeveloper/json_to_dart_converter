// utils/stringCompare.js

export function compareStrings(str1, str2, options = {}) {
  const { ignoreCase = false, ignoreWhitespace = false } = options;

  let a = str1;
  let b = str2;

  if (ignoreCase) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }

  if (ignoreWhitespace) {
    a = a.replace(/\s+/g, "");
    b = b.replace(/\s+/g, "");
  }

  if (a === b) {
    return {
      areEqual: true,
      diff: [],
      message: "Both strings are identical!",
    };
  }

  // Calculate diff positions
  const maxLen = Math.max(a.length, b.length);
  const diffs = [];

  for (let i = 0; i < maxLen; i++) {
    if (a[i] !== b[i]) {
      diffs.push({
        index: i,
        a: a[i] || "",
        b: b[i] || "",
      });
    }
  }

  return {
    areEqual: false,
    diff: diffs,
    message: "Strings differ",
  };
}
