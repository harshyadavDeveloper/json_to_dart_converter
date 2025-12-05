import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { jsonToFlow } from "../utils/jsonToFlow";
import toast from "react-hot-toast";
import { applyLayout } from "../utils/layout";

export default function JsonDiagramViewer() {
  const [jsonInput, setJsonInput] = useState("");
  const [elements, setElements] = useState(null);



const generateDiagram = () => {
  try {
    const parsed = JSON.parse(jsonInput);

    const { nodes, edges } = jsonToFlow(parsed);

    // AUTO LAYOUT CLEAN TREE
    const laidOut = applyLayout(nodes, edges, "TB");

    setElements({
      nodes: laidOut.nodes,
      edges: laidOut.edges
    });

    toast.success("Diagram generated!");
  } catch {
    toast.error("Invalid JSON. Please fix and try again.");
  }
};


  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON to generate diagram..."
        className="w-full h-40 p-4 rounded-lg bg-gray-200 dark:bg-gray-800"
      />

      <button
        onClick={generateDiagram}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate Diagram
      </button>

      {/* Diagram Area */}
      {elements && (
        <div className="h-[600px] border rounded-lg bg-gray-100 dark:bg-gray-900">
          <ReactFlow nodes={elements.nodes} edges={elements.edges}>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}
