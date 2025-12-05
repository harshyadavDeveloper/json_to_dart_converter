let nodeId = 1;

export function jsonToFlow(json, parentId = null, keyName = "root") {
  const nodes = [];
  const edges = [];

  const id = nodeId++;

  nodes.push({
    id: String(id),
    data: { label: keyName },
    position: { x: 0, y: 0 },
  });

  if (parentId) {
    edges.push({
      id: `e${parentId}-${id}`,
      source: String(parentId),
      target: String(id),
    });
  }

  if (typeof json === "object" && json !== null) {
    if (Array.isArray(json)) {
      json.forEach((item, index) => {
        const { nodes: childNodes, edges: childEdges } = jsonToFlow(
          item,
          id,
          `[${index}]`
        );
        nodes.push(...childNodes);
        edges.push(...childEdges);
      });
    } else {
      Object.entries(json).forEach(([key, value]) => {
        const { nodes: childNodes, edges: childEdges } = jsonToFlow(
          value,
          id,
          key
        );
        nodes.push(...childNodes);
        edges.push(...childEdges);
      });
    }
  } else {
    const valueNodeId = nodeId++;
    nodes.push({
      id: String(valueNodeId),
      data: { label: String(json) },
      position: { x: 0, y: 0 },
    });

    edges.push({
      id: `e${id}-${valueNodeId}`,
      source: String(id),
      target: String(valueNodeId),
    });
  }

  return { nodes, edges };
}
