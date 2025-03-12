import React, { createContext, useContext, useEffect, useState } from 'react';  // 导入必要的 React 钩子和类型

// 定义主题类型，只能是 'light' 或 'dark'
type Theme = 'light' | 'dark';
// 定义主题上下文类型，包含当前主题状态
type ThemeContext = { theme: Theme };

// 创建主题上下文，初始值为 undefined
const ThemeContext = createContext<ThemeContext | undefined>(undefined);

/**
 * 主题提供者组件
 * 负责监听系统主题偏好并同步应用主题
 * @param children - 子组件，将被包裹在主题上下文中
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 主题状态，默认为浅色主题
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // 创建媒体查询，检测系统是否处于深色模式
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    /**
     * 更新主题函数
     * 根据媒体查询结果更新应用主题
     * @param e - 媒体查询事件或媒体查询列表对象
     */
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const newTheme = e.matches ? 'dark' : 'light';  // 根据系统偏好确定主题
      setTheme(newTheme);  // 更新主题状态
      updateDocumentClass(newTheme);  // 更新 HTML 类名
    };

    // 初始检查系统主题并应用
    updateTheme(mediaQuery);

    // 监听系统主题变化
    mediaQuery.addEventListener('change', updateTheme);
    // 组件卸载时移除事件监听
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);  // 空依赖数组，仅在组件挂载时执行一次

  /**
   * 更新文档类名函数
   * 根据主题在 HTML 根元素上添加或移除 'dark' 类
   * @param newTheme - 新的主题值
   */
  const updateDocumentClass = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');  // 添加深色模式类名
    } else {
      document.documentElement.classList.remove('dark');  // 移除深色模式类名
    }
  };

  // 提供当前主题状态给子组件
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 自定义钩子：使用主题
 * 允许任何子组件访问当前主题状态
 * @returns 主题上下文对象，包含当前主题值
 * @throws 如果在 ThemeProvider 外部使用则抛出错误
 */
export function useTheme() {
  const context = useContext(ThemeContext);  // 获取主题上下文
  if (context === undefined) {
    // 确保钩子在 ThemeProvider 内部使用
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;  // 返回主题上下文
}