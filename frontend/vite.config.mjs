export default defineConfig({
  plugins: [React()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
