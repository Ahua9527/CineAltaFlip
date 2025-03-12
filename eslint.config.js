// 导入 ESLint 的 JavaScript 基础配置
import js from '@eslint/js'
// 导入全局变量定义，包含浏览器、Node.js 等环境的全局变量
import globals from 'globals'
// 导入 React Hooks 的 ESLint 插件，用于检查 Hooks 规则
import reactHooks from 'eslint-plugin-react-hooks'
// 导入 React Refresh 的 ESLint 插件，用于支持 React Fast Refresh
import reactRefresh from 'eslint-plugin-react-refresh'
// 导入 TypeScript ESLint 工具链
import tseslint from 'typescript-eslint'

// 导出 ESLint 配置
export default tseslint.config(
  // 第一个配置对象：全局忽略设置
  { ignores: ['dist'] }, // 忽略 dist 目录下的所有文件
  // 第二个配置对象：项目主要 ESLint 设置
  {
    // 扩展推荐配置
    extends: [
      js.configs.recommended, // JavaScript 推荐配置
      ...tseslint.configs.recommended, // TypeScript 推荐配置
    ],
    // 指定适用的文件范围
    files: ['**/*.{ts,tsx}'], // 匹配所有 .ts 和 .tsx 文件
    // 语言选项
    languageOptions: {
      ecmaVersion: 2020, // 使用 ES2020 语法
      globals: globals.browser, // 添加浏览器环境的全局变量
    },
    // 启用的插件
    plugins: {
      'react-hooks': reactHooks, // React Hooks 规则插件
      'react-refresh': reactRefresh, // React Refresh 插件
    },
    // 规则配置
    rules: {
      ...reactHooks.configs.recommended.rules, // 应用所有推荐的 React Hooks 规则
      // React Refresh 组件导出规则
      'react-refresh/only-export-components': [
        'warn', // 警告级别（而非错误）
        { allowConstantExport: true }, // 允许常量导出
      ],
    },
  },
)