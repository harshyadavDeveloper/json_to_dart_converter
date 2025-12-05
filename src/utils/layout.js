import dagre from "dagre";

const g = new dagre.graphlib.Graph();
g.setDefaultEdgeLabel(() => ({}));

export function applyLayout(nodes, edges, direction = "TB") {
  g.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 150, height: 40 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const laidOutNodes = nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x,
        y: pos.y,
      },
      sourcePosition: "right",
      targetPosition: "left",
    };
  });

  return { nodes: laidOutNodes, edges };
}
