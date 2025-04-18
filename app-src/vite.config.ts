import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/app/',
  build: {
    outDir: '../app',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        login: "login.html",
        saveAlbum: "save-album.html",
        myalbums: "my-albums.html"
        // add more HTML entry points here
      }
    }
  },
  plugins: [react()]
})