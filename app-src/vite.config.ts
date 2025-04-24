import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",        
        login: "login.html",
        saveAlbum: "save-album.html",
        myalbums: "my-albums.html",
        photos: "photos.html"
        // add more HTML entry points here
      }
    }
  },
  plugins: [
    react(),
    tsconfigPaths()
  ]
})