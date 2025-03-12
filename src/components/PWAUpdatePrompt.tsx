import { useEffect, useState } from 'react'  // 导入 React Hooks
import { X } from 'lucide-react'  // 导入关闭图标组件

/**
 * PWA 更新提示组件
 * 当 PWA 应用有新版本可用时，显示更新提示
 */
const PWAUpdatePrompt = () => {
  // 状态钩子，用于跟踪是否需要刷新应用
  const [needRefresh, setNeedRefresh] = useState(false)

  useEffect(() => {
    // 事件处理函数，检测 PWA 更新事件
    const handler = (event: Event) => {
      // 检查事件是否包含 newServiceWorker 属性且是 CustomEvent 类型
      // 这通常由 vite-plugin-pwa 在有新的 Service Worker 可用时触发
      if ('newServiceWorker' in event && event instanceof CustomEvent) {
        setNeedRefresh(true)  // 设置需要刷新状态为 true
      }
    }

    // 注册事件监听器，监听 'pwa-update-available' 事件
    // 这个事件由 vite-plugin-pwa 在检测到新版本时触发
    window.addEventListener('pwa-update-available', handler)
    
    // 清理函数，组件卸载时移除事件监听器
    return () => window.removeEventListener('pwa-update-available', handler)
  }, [])  // 空依赖数组表示此效果只在组件挂载时运行一次

  /**
   * 更新应用函数
   * 创建并触发 'pwa-update-accepted' 事件，通知 Service Worker 应用更新
   */
  const updateApp = () => {
    const event = new Event('pwa-update-accepted')  // 创建更新接受事件
    window.dispatchEvent(event)  // 分发事件
    setNeedRefresh(false)  // 重置需要刷新状态为 false
  }

  // 如果不需要刷新，不渲染任何内容
  if (!needRefresh) return null

  // 渲染更新提示 UI
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 
                    rounded-lg shadow-lg p-4 flex items-center justify-between gap-4 z-50
                    border border-gray-200 dark:border-gray-700 max-w-sm w-11/12">
      {/* 提示文本 */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        新版本可用，是否更新？
      </p>
      {/* 按钮容器 */}
      <div className="flex items-center gap-2">
        {/* 更新按钮 */}
        <button
          onClick={updateApp}  // 点击时调用更新函数
          className="px-3 py-1 bg-selected text-white rounded-md text-sm hover:bg-blue-600 
                     transition-colors duration-200"
        >
          更新
        </button>
        {/* 关闭按钮 */}
        <button
          onClick={() => setNeedRefresh(false)}  // 点击时关闭提示，不更新
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full 
                     transition-colors duration-200"
        >
          {/* X 图标 */}
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default PWAUpdatePrompt  // 导出组件