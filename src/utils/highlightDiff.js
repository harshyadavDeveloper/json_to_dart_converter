export function highlightDiff(str1, str2) {
  const max = Math.max(str1.length, str2.length);
  let left = "";
  let right = "";

  for (let i = 0; i < max; i++) {
    const a = str1[i] || "";
    const b = str2[i] || "";

    if (a === b) {
      left += a || "";
      right += b || "";
    } else {
      left += a ? `<span class="text-red-500 underline">${a}</span>` : "";
      right += b ? `<span class="text-red-500 underline">${b}</span>` : "";
    }
  }

  const areEqual = str1 === str2;

  return { left, right, areEqual };
}
