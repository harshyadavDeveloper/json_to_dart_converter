import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function JsonCodeBlock({ data, darkMode }) {
  return (
    <SyntaxHighlighter
      language="json"
      style={darkMode ? oneDark : oneLight}
      customStyle={{
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        padding: "1rem",
        margin: 0,
      }}
      wrapLongLines
    >
      {JSON.stringify(data, null, 2)}
    </SyntaxHighlighter>
  );
}
