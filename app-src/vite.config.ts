import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import fs from 'fs'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'http'
import type { ViteDevServer } from 'vite'

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

function handleDirectoryUrls() {
  return {
    name: 'handle-directory-urls',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: IncomingMessage, _res: ServerResponse, next: () => void) => {
        const url = req.url;
        
        // Handle /app/directory patterns (without trailing slash)
        if (url && url.startsWith('/app/') && !url.includes('.') && !url.endsWith('/')) {
          const segments = url.split('/').filter(Boolean);
          
          // Check if it's a 2-segment path like /app/storage
          if (segments.length === 2) {
            // List of known directories that should be handled this way
            const knownDirectories = ['storage'];
            const directoryName = segments[1];
            
            if (knownDirectories.includes(directoryName)) {
              console.log(`Rewriting ${url} to ${url}/`);
              req.url = url + '/';
            }
          }
        }
        
        next();
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
        profile: "profile.html",
        storage: "storage/index.html",  // Add your storage entry point
        manage: "storage/manage.html"  // Add your storage entry point
        // add more HTML entry points here
      }
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    moveFoldersOutOfApp(),
    handleDirectoryUrls(),
  ]
})