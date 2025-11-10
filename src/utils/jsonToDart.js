export function jsonToDart(jsonString, rootClassName = "MyModel") {
  let json;
  try {
    json = JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Invalid JSON", error);
  }

  const classDefs = [];

  // 🔹 Convert to PascalCase (for class names)
  const toPascalCase = (str) =>
    str
      .replace(/([-_][a-z])/gi, (s) =>
        s.toUpperCase().replace("-", "").replace("_", "")
      )
      .replace(/^\w/, (c) => c.toUpperCase());

  // 🔹 Convert to camelCase (for field names)
  const toCamelCase = (str) =>
    str
      .replace(/([-_][a-z])/gi, (s) =>
        s.toUpperCase().replace("-", "").replace("_", "")
      )
      .replace(/^\w/, (c) => c.toLowerCase());

  // 🔹 Sanitize invalid Dart identifiers (remove illegal chars, handle numbers)
  const sanitizeIdentifier = (name) => {
    let clean = name.replace(/[^a-zA-Z0-9_]/g, "");
    if (/^[0-9]/.test(clean)) clean = "n" + clean;
    if (!clean) clean = "field";
    return clean;
  };

  function generateClass(name, obj) {
    const className = toPascalCase(name);
    const fields = [];
    const fromJsonLines = [];
    const toJsonLines = [];
    const usedNames = new Set(); // track duplicates

    for (const key in obj) {
      const value = obj[key];

      // base name processing
      let fieldName = toCamelCase(sanitizeIdentifier(key));

      // 🔹 Handle duplicates by adding suffixes
      let originalFieldName = fieldName;
      let counter = 2;
      while (usedNames.has(fieldName)) {
        fieldName = `${originalFieldName}${counter++}`;
      }
      usedNames.add(fieldName);

      let fieldType = "dynamic";
      let assignFromJson = "";
      let assignToJson = "";

      if (Array.isArray(value)) {
        if (
          value.length > 0 &&
          typeof value[0] === "object" &&
          !Array.isArray(value[0])
        ) {
          const nestedClassName = toPascalCase(key.slice(0, -1) || key);
          generateClass(nestedClassName, value[0]);
          fieldType = `List<${nestedClassName}>?`;
          assignFromJson = `
    if (json['${key}'] != null) {
      ${fieldName} = <${nestedClassName}>[];
      json['${key}'].forEach((v) {
        ${fieldName}!.add(${nestedClassName}.fromJson(v));
      });
    }`;
          assignToJson = `
    if (${fieldName} != null) {
      data['${key}'] = ${fieldName}!.map((v) => v.toJson()).toList();
    }`;
        } else {
          fieldType = "List<dynamic>?";
          assignFromJson = `${fieldName} = json['${key}'];`;
          assignToJson = `data['${key}'] = ${fieldName};`;
        }
      } else if (typeof value === "object" && value !== null) {
        const nestedClassName = toPascalCase(key);
        generateClass(nestedClassName, value);
        fieldType = `${nestedClassName}?`;
        assignFromJson = `${fieldName} = json['${key}'] != null ? ${nestedClassName}.fromJson(json['${key}']) : null;`;
        assignToJson = `
    if (${fieldName} != null) {
      data['${key}'] = ${fieldName}!.toJson();
    }`;
      } else if (typeof value === "string") {
        fieldType = "String?";
        assignFromJson = `${fieldName} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${fieldName};`;
      } else if (typeof value === "number") {
        fieldType = "int?";
        assignFromJson = `${fieldName} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${fieldName};`;
      } else if (typeof value === "boolean") {
        fieldType = "bool?";
        assignFromJson = `${fieldName} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${fieldName};`;
      } else {
        fieldType = "dynamic";
        assignFromJson = `${fieldName} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${fieldName};`;
      }

      fields.push(`  ${fieldType} ${fieldName};`);
      fromJsonLines.push(`    ${assignFromJson}`);
      toJsonLines.push(`    ${assignToJson}`);
    }

    const classDef = `
class ${className} {
${fields.join("\n")}

  ${className}({${[...usedNames].map((n) => `this.${n}`).join(", ")}});

  ${className}.fromJson(Map<String, dynamic> json) {
${fromJsonLines.join("\n")}
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
${toJsonLines.join("\n")}
    return data;
  }
}
`;
    classDefs.push(classDef);
  }

  const rootName = toPascalCase(rootClassName);
  generateClass(rootName, json);

  return classDefs.reverse().join("\n");
}
