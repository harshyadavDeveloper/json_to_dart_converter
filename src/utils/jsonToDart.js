export function jsonToDart(jsonString, rootClassName = "MyModel") {
  let json;
  try {
    json = JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Invalid JSON", error);
  }

  const classDefs = [];

  const toPascalCase = (str) =>
    str
      .replace(/([-_][a-z])/gi, (s) =>
        s.toUpperCase().replace("-", "").replace("_", "")
      )
      .replace(/^\w/, (c) => c.toUpperCase());

  function generateClass(name, obj) {
    const className = toPascalCase(name);
    const fields = [];
    const fromJsonLines = [];
    const toJsonLines = [];

    for (const key in obj) {
      const value = obj[key];
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
      ${key} = <${nestedClassName}>[];
      json['${key}'].forEach((v) {
        ${key}!.add(${nestedClassName}.fromJson(v));
      });
    }`;
          assignToJson = `
    if (${key} != null) {
      data['${key}'] = ${key}!.map((v) => v.toJson()).toList();
    }`;
        } else {
          fieldType = "List<dynamic>?";
          assignFromJson = `${key} = json['${key}'];`;
          assignToJson = `data['${key}'] = ${key};`;
        }
      } else if (typeof value === "object" && value !== null) {
        const nestedClassName = toPascalCase(key);
        generateClass(nestedClassName, value);
        fieldType = `${nestedClassName}?`;
        assignFromJson = `${key} = json['${key}'] != null ? ${nestedClassName}.fromJson(json['${key}']) : null;`;
        assignToJson = `
    if (${key} != null) {
      data['${key}'] = ${key}!.toJson();
    }`;
      } else if (typeof value === "string") {
        fieldType = "String?";
        assignFromJson = `${key} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${key};`;
      } else if (typeof value === "number") {
        fieldType = "int?";
        assignFromJson = `${key} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${key};`;
      } else if (typeof value === "boolean") {
        fieldType = "bool?";
        assignFromJson = `${key} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${key};`;
      } else {
        fieldType = "dynamic";
        assignFromJson = `${key} = json['${key}'];`;
        assignToJson = `data['${key}'] = ${key};`;
      }

      fields.push(`  ${fieldType} ${key};`);
      fromJsonLines.push(`    ${assignFromJson}`);
      toJsonLines.push(`    ${assignToJson}`);
    }

    const classDef = `
class ${className} {
${fields.join("\n")}

  ${className}({${Object.keys(obj)
      .map((k) => `this.${k}`)
      .join(", ")}});

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
