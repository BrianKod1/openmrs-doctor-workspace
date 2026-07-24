import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/openmrs-doctor-workspace/",
    plugins: [react()],
    server: {
      proxy: {
        "/openmrs-api": {
          target: env.OPENMRS_BASE_URL || "https://demo.openmrs.org",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/openmrs-api/, "/openmrs/ws/rest/v1"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const username = env.OPENMRS_USERNAME;
              const password = env.OPENMRS_PASSWORD;

              if (username && password) {
                const credentials = Buffer.from(
                  `${username}:${password}`,
                ).toString("base64");

                proxyReq.setHeader(
                  "Authorization",
                  `Basic ${credentials}`,
                );
              }

              proxyReq.setHeader("Accept", "application/json");
            });
          },
        },
      },
    },
  };
});
