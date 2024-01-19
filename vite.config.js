import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material/Tooltip", // or other MUI components causing the issue
      // ... possibly include other MUI components here
    ],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    // ... other plugins if any
  ],
});
