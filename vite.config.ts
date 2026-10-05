import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 基础配置:固定端口方便本地试玩
export default defineConfig({
  plugins: [react()],
  // 使用相对资源路径，兼容 GitHub Pages 的仓库子目录。
  base: './',
  server: { host: true, port: 5173, strictPort: true },
})
