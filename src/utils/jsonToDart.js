export function jsonToDart(jsonString, className = "MyModel") {
  try {
    const json = JSON.parse(jsonString);

    const fields = Object.keys(json)
      .map((key) => {
        const type = typeof json[key];
        let dartType = "dynamic";
        if (type === "string") dartType = "String";
        else if (type === "number") dartType = "num";
        else if (type === "boolean") dartType = "bool";
        else if (Array.isArray(json[key])) dartType = "List<dynamic>";
        else if (type === "object") dartType = "Map<String, dynamic>";
        return `  final ${dartType} ${key};`;
      })
      .join("\n");

    return `
class ${className} {
${fields}

  ${className}({
${Object.keys(json)
  .map((key) => `    required this.${key},`)
  .join("\n")}
  });

  factory ${className}.fromJson(Map<String, dynamic> json) => ${className}(
${Object.keys(json)
  .map((key) => `        ${key}: json['${key}'],`)
  .join("\n")}
  );

  Map<String, dynamic> toJson() => {
${Object.keys(json)
  .map((key) => `        '${key}': ${key},`)
  .join("\n")}
  };
}
`;
  } catch (err) {
    return `❌ Invalid JSON. Please check your input. ${err.message}`;
  }
}
