import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { syncCatalogFromDatabase } from "./lib/catalog-sync";
import "./index.css";

/* Renders immediately with the built-in catalogue, then re-renders once the database copy loads. */
function Root() {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    syncCatalogFromDatabase().then((changed) => changed && setVersion((v) => v + 1));
  }, []);
  return <App key={version} />;
}

createRoot(document.getElementById("root")!).render(<Root />);
