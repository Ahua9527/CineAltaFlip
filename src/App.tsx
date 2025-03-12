// 导入 XML 上传器组件
import XMLUploader from '../src/components/XMLUploader'
// 导入 PWA 更新提示组件
import PWAUpdatePrompt from './components/PWAUpdatePrompt'
// 导入主题提供者组件，用于管理应用的亮色/暗色主题
import { ThemeProvider } from './context/ThemeContext'

/**
 * App 根组件
 * 作为应用的入口点，集成主题系统和主要功能组件
 */
function App() {
  return (
    // 包裹整个应用的主题提供者，使所有子组件能访问主题状态
    <ThemeProvider>
      {/* 
        主容器 div，应用了以下 Tailwind CSS 类:
        - min-h-screen: 最小高度为视口高度
        - bg-gray-50: 浅色模式下的背景色（浅灰色）
        - dark:bg-gray-900: 深色模式下的背景色（深灰色）
        - transition-colors: 颜色变化时应用过渡效果
        - duration-300: 过渡持续 300 毫秒
      */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* XML 上传器组件，应用的主要功能部分 */}
        <XMLUploader />
        {/* PWA 更新提示组件，当有新版本可用时显示更新通知 */}
        <PWAUpdatePrompt />
      </div>
    </ThemeProvider>
  )
}

// 导出 App 组件作为默认导出
export default App