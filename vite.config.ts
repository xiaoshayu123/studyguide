import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globDirectory: "C:/Users/ok/Desktop/front/",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
      },
      manifest: {
        name: "学习社区",
        short_name: "学习社区",
        start_url: ".",
        display: "standalone",
        background_color: "#fff",
        description: "一个pwc的测试项目",
        icons: [
          {
            src: "pic.png",
            sizes: "643x642",
            type: "image/png",
          },
          {
            src: "pic.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ]
});
