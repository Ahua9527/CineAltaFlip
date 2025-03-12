// Tailwind CSS 配置文件

export default {
  // content 配置项定义了 Tailwind 应该在哪些文件中查找类名
  // 这些文件中使用的 Tailwind 类会被保留在最终的 CSS 中，未使用的会被清除
  content: [
    "./index.html",                  // 扫描根目录下的 index.html
    "./src/**/*.{js,ts,jsx,tsx}",    // 扫描 src 目录下所有 JS/TS/JSX/TSX 文件
  ],
  
  // darkMode 配置深色模式的触发方式
  // 'class' 表示通过给 HTML 元素添加 'dark' 类名来切换深色模式
  // 而不是使用操作系统的偏好设置（那样会是 'media'）
  darkMode: 'class',
  
  // theme 配置主题样式
  theme: {
    // extend 表示扩展默认主题而不是完全替换
    extend: {
      // 自定义阴影效果
      boxShadow: {
        'custom': '0 8px 32px rgba(0,0,0,0.12)', // 添加名为 "custom" 的阴影效果
      },
      
      // 自定义颜色系统
      colors: {
        // 应用通用颜色
        selected: '#3366FF',  // 选中状态的蓝色
        venice: '#FF8B00',    // 品牌橙色（威尼斯橙）
        
        // 浅色主题的颜色集
        light: {
          'bg': '#F1F1F1',           // 背景色
          'card': '#F9F9F9',         // 卡片背景色
          'input': '#F4F4F4',        // 输入框背景色
          'placeholder': '#0D0D0D',  // 占位符文本颜色
          'titlebar': '#F9F9F9',     // 标题栏背景色
        },
        
        // 深色主题的颜色集
        dark: {
          'bg': '#212121',           // 深色背景色
          'card': '#171717',         // 深色卡片背景色
          'input': '#2F2F2F',        // 深色输入框背景色
          'placeholder': '#ECECEC',  // 深色主题占位符文本颜色
          'titlebar': '#171717',     // 深色标题栏背景色
        }
      },
      
      // 自定义字体系列
      fontFamily: {
        // 创建 'chalkboard' 字体类，可以通过 font-chalkboard 类名使用
        // 按优先级排序，如果第一个字体不可用，则尝试下一个
        chalkboard: ['"Chalkboard SE"', '"Comic Sans MS"', 'cursive'],
      },
    },
  },
  
  // 不使用额外的 Tailwind 插件
  plugins: [],
}