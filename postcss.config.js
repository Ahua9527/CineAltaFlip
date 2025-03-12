// PostCSS 配置文件
// PostCSS 是一个用 JavaScript 转换 CSS 的工具，可以通过各种插件扩展功能

export default {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // Tailwind CSS 插件
    // 这个插件处理 Tailwind 的类名并生成对应的 CSS
    // 它会读取项目中的 tailwind.config.js 文件获取配置
    tailwindcss: {},
    
    // Autoprefixer 插件
    // 自动添加浏览器前缀，如 -webkit-, -moz-, -ms- 等
    // 根据 browserslist 配置（通常在 package.json 中定义）来确定需要支持的浏览器
    // 这样可以确保 CSS 在不同浏览器中的兼容性
    autoprefixer: {},
  },
}