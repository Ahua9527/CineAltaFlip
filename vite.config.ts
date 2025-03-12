import { defineConfig } from 'vite'  // 导入 Vite 配置函数
import react from '@vitejs/plugin-react'  // 导入 React 插件，用于支持 JSX 等 React 特性
import { VitePWA } from 'vite-plugin-pwa'  // 导入 PWA 插件，用于生成 Progressive Web App
import fs from 'fs'  // 导入文件系统模块，用于读取 SSL 证书文件

// 导出 Vite 配置
export default defineConfig({
  plugins: [
    react(),  // 启用 React 插件
    VitePWA({  // 配置 PWA 插件
      registerType: 'autoUpdate',  // 设置为自动更新模式，当有新版本时自动提醒用户
      includeAssets: [  // 需要缓存的静态资源列表
        'favicon.ico',  // 网站图标
        'apple-touch-icon.png',  // iOS 设备上的应用图标
        'CineAltaFlip_96_any.png',  // 不同尺寸和用途的图标
        'CineAltaFlip_192_any.png', 
        'CineAltaFlip_512_any.png', 
        'CineAltaFlip_96_maskable.png',  // 可遮罩图标，适应不同形状的启动器
        'CineAltaFlip_192_maskable.png', 
        'CineAltaFlip_512_maskable.png'
      ],
      manifest: {  // Web App Manifest 配置，定义 PWA 的元数据
        
        name: 'CineAltaFlip',  // 应用全名
        short_name: 'CineAltaFlip',  // 应用简称，用于主屏幕
        description: '一拖一拽之间，翻转立现眼前',  // 应用描述
        theme_color: '#171717',  // 主题色，影响浏览器 UI 元素
        background_color: '#171717',  // 启动页背景色
        display: 'standalone',  // 显示模式：独立应用模式，没有浏览器 UI
        id: "/?source=pwa",  // 应用唯一标识符
        start_url: '/?source=pwa',  // 应用启动 URL，带有来源标记
        scope: '/',  // 应用作用域，定义 PWA 控制的页面范围
        orientation: 'any',  // 屏幕方向：任意方向
        categories: ['productivity', 'utilities'],  // 应用类别
        icons: [  // 不同尺寸和用途的图标配置
          {
            src: 'apple-touch-icon.png',  // iOS 图标
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'CineAltaFlip_96_any.png',  // 96x96 通用图标
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'  // 用途为通用
          },
          {
            src: 'CineAltaFlip_192_any.png',  // 192x192 通用图标
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'CineAltaFlip_512_any.png',  // 512x512 通用图标
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'CineAltaFlip_96_maskable.png',  // 96x96 可遮罩图标
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable'  // 用途为可遮罩，适应圆形等图标形状
          },
          {
            src: 'CineAltaFlip_192_maskable.png',  // 192x192 可遮罩图标
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'CineAltaFlip_512_maskable.png',  // 512x512 可遮罩图标
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {  // Workbox 配置，用于生成 Service Worker
        // 启用 SW 立即接管网页
        skipWaiting: true,  // 新 Service Worker 安装后立即激活
        clientsClaim: true,  // Service Worker 激活后立即控制所有客户端
        
        // 静态资源缓存模式 - 扩展匹配模式以包含所有静态资源
        globPatterns: [  // 需要缓存的静态资源匹配模式
          '**/*.{js,css,html,ico,png,svg,woff2,jpg,jpeg,gif,json,webp}'  // 匹配各种静态资源文件类型
        ],
        
        // 运行时缓存策略
        runtimeCaching: [  // 针对运行时请求的缓存配置
          {
            // CDN 资源缓存策略
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,  // 匹配 cdnjs.cloudflare.com 的请求
            handler: 'CacheFirst',  // 缓存优先策略，优先使用缓存，缓存不存在时才请求网络
            options: {
              cacheName: 'cdn-cache',  // 缓存名称
              expiration: {  // 缓存过期策略
                maxEntries: 20,  // 最多缓存 20 个条目
                maxAgeSeconds: 60 * 60 * 24 * 365  // 缓存有效期一年
              },
              cacheableResponse: {  // 可缓存的响应条件
                statuses: [0, 200]  // 只缓存成功的响应或从缓存加载的响应
              }
            }
          }
        ]
      }
    })
  ],
  
  // 构建优化配置
  build: {
    sourcemap: true,  // 生成 sourcemap，便于调试
    rollupOptions: {  // Rollup 打包配置
      output: {
        manualChunks: {  // 手动分块配置
          vendor: ['react', 'react-dom']  // 将 React 相关库单独打包成 vendor 块，优化缓存
        }
      }
    },
    chunkSizeWarningLimit: 1000  // 提高块大小警告限制，单位为 KB
  },
  
  // 路径别名配置
  resolve: {
    alias: {  // 路径别名，简化导入路径
      '@': '/src',  // @/ 指向 src 目录
      '@components': '/src/components',  // @components/ 指向组件目录
      '@assets': '/src/assets'  // @assets/ 指向资源目录
    }
  },
  
  // 开发服务器配置
  server: {
    // HTTPS 配置
    https: {  // 启用 HTTPS 开发服务器
      key: fs.readFileSync('localhost-key.pem'),  // 加载本地 SSL 密钥
      cert: fs.readFileSync('localhost.pem'),  // 加载本地 SSL 证书
    },
    
    // 安全头配置 - 简化为静态网站所需
    headers: {  // 响应头配置
      'Content-Security-Policy': [  // 内容安全策略，防止 XSS 等攻击
        "default-src 'self'",  // 默认只允许同源资源
        "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com",  // 脚本来源限制
        "style-src 'self' 'unsafe-inline'",  // 样式来源限制
        "img-src 'self' data: blob:",  // 图片来源限制，允许 data:URI 和 blob:
        "font-src 'self'"  // 字体来源限制
      ].join('; '),
      'X-Content-Type-Options': 'nosniff',  // 禁止 MIME 类型嗅探
      'X-Frame-Options': 'DENY',  // 禁止在框架中嵌入，防止点击劫持
      'X-XSS-Protection': '1; mode=block',  // 启用 XSS 过滤
      'Referrer-Policy': 'strict-origin-when-cross-origin'  // 引用策略，限制 referrer 信息
    }
  }
})