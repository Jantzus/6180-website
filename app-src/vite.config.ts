import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import fs from 'fs'
import path from 'path'

function moveFoldersOutOfApp() {
  return {
    name: 'move-folders-out-of-app',
    closeBundle() {
      const folders = ['.well-known', 'folder'];
      folders.forEach(folder => {
        const from = path.resolve(__dirname, `../dist/app/${folder}`);
        const to = path.resolve(__dirname, `../dist/${folder}`);

        if (fs.existsSync(from)) {
          fs.mkdirSync(to, { recursive: true });
          for (const file of fs.readdirSync(from)) {
            fs.renameSync(path.join(from, file), path.join(to, file));
          }
          fs.rmdirSync(from);
        }
      });

    }
  }
}

export default defineConfig({
  base: '/app/',
  build: {
    outDir: '../dist/app',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        login: "login.html",
        saveAlbum: "save-album.html",
        myalbums: "my-albums.html",
        photos: "photos.html",
        profile: "profile.html"
        // add more HTML entry points here
      }
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    moveFoldersOutOfApp(),
  ]
})