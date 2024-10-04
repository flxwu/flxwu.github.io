import { createRoot } from "react-dom/client";

import Index from "./post-1.mdx";

const root = createRoot(document.querySelector("#root"));

root.render(<Index />);
