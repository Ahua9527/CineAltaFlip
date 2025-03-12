// 导入 React 核心库
import React from 'react'
// 导入 ReactDOM 客户端渲染相关功能
import ReactDOM from 'react-dom/client'
// 导入根组件 App
import App from './App.tsx'
// 导入全局样式文件
import './styles/index.css'

// 创建 React 根元素并渲染应用
// document.getElementById('root')! - 获取 id 为 'root' 的 DOM 元素，感叹号表示断言该元素一定存在
// createRoot() - 创建 React 18 的并发渲染根
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode - 严格模式，用于在开发中捕获潜在问题
  // 它会导致组件渲染两次以检测副作用，仅在开发模式下生效
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// 应用加载完成后，为根元素添加 'loaded' 类
// 可用于触发加载完成后的 CSS 动画或样式变化
// 使用可选链操作符 ?. 确保元素存在才调用 classList.add 方法
document.getElementById('root')?.classList.add('loaded')