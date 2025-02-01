# CineAltaFlip

<div align="center">

[![GitHub license](https://img.shields.io/github/license/Ahua9527/CineAltaFlip)](https://github.com/Ahua9527/CineAltaFlip/blob/main/LICENSE)
![GitHub stars](https://img.shields.io/github/stars/Ahua9527/CineAltaFlip)

🎬 一拖一拽之间，翻转立现眼前

[English](./README.en.md) · 简体中文 · [在线体验](https://cinealtaflip.ahua.space)

</div>

## 📝 项目介绍

CineAltaFlip 是一个专门用于解决索尼 CineAlta 摄影机图像翻转元数据管理问题的 Web 工具。虽然 CineAlta 摄影机支持图像翻转功能，但翻转信息并不会作为元数据内嵌到媒体文件中，而是单独保存在 XML 文件中。本工具可以帮助用户从这些 XML 文件中提取翻转元数据，并生成易于使用的 CSV 格式报表。

## ✨ 特性

- 🚀 纯浏览器端处理，无需服务器
- 📱 支持 PWA，可离线使用
- 🌓 自动跟随系统的亮色/暗色主题
- 💾 批量处理多个 XML 文件
- 📊 自动生成详细的 CSV 报表
- 🔄 支持拖放上传文件

## 🚀 开始使用

### 在线使用

访问 [CineAltaFlip](https://cinealtaflip.ahua.space) 即可开始使用。

### 📖 使用说明

1. 打开网页应用
2. 将 XML 文件拖放到上传区域，或点击选择文件
3. 可以一次性上传多个 XML 文件（最多 99 个）
4. 点击"处理文件"按钮
5. 等待处理完成，CSV 文件会自动下载
6. CSV 文件包含以下信息：
   - 片段名称 (Clip Name)
   - 翻转状态 (Flip)
   - 时长 (Duration)
   - 项目帧率 (FPS)
   - 宽高比 (Aspect Ratio)
   - 像素宽高比 (Pixel Aspect)
   - 视频类型 (Video Type)
   - 音频类型 (Audio Type)
   - 音频通道 (Audio Channels)
   - 状态 (Status)

## 🛠️ 技术栈

- React + TypeScript
- Vite
- Tailwind CSS
- PWA
- File API

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/Ahua9527/CineAltaFlip.git
cd CineAltaFlip
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm dev
```

4. 构建项目
```bash
npm build
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 了解详情

## 🙏 贡献

欢迎提交 Issue 和 Pull Request！

## 👨‍💻 作者

- 哆啦Ahua🌱

---

如果这个项目帮助到了你，请给一个 ⭐️ 支持一下！

