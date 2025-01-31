# CineAlta Flip

<div align="center">

[![GitHub license](https://img.shields.io/github/license/Ahua9527/CineAlta-Flip)](https://github.com/Ahua9527/CineAlta-Flip/blob/main/LICENSE)
![GitHub stars](https://img.shields.io/github/stars/Ahua9527/CineAlta-Flip)

🎬 CineAlta's Missing Flip? We Capture It.

English · [简体中文](./README.md) · [Live Demo](https://cinealta-flip.ahua.space)

</div>

## 📝 About

CineAlta Flip is a specialized web tool designed to address the image flip metadata management issue in Sony CineAlta cameras. While CineAlta cameras support image flipping functionality, this information is not embedded as metadata within the media files but is stored separately in XML files. This tool helps users extract flip metadata from these XML files and generates easy-to-use CSV reports.

## ✨ Features

- 🚀 Pure browser-side processing, no server required
- 📱 PWA support for offline use
- 🌓 Automatic light/dark theme following system preferences
- 💾 Batch processing of multiple XML files
- 📊 Automatic generation of detailed CSV reports
- 🔄 Drag-and-drop file upload support

## 🚀 Getting Started

### Online Usage

Visit [CineAlta Flip](https://cinealta-flip.ahua.space) to start using the tool immediately.

### 📖 Usage Guide

1. Open the web application
2. Drag and drop XML files into the upload area, or click to select files
3. Upload multiple XML files at once (up to 99 files)
4. Click the "Process Files" button
5. Wait for processing to complete, CSV files will download automatically
6. The CSV file includes the following information:
   - Clip Name
   - Flip Status
   - Duration
   - Project FPS
   - Aspect Ratio
   - Pixel Aspect
   - Video Type
   - Audio Type
   - Audio Channels
   - Status

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- PWA
- File API

### Local Development

1. Clone the repository
```bash
git clone https://github.com/Ahua9527/CineAlta-Flip.git
cd CineAlta-Flip
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm dev
```

4. Build the project
```bash
npm build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Contributing

Issues and Pull Requests are welcome!

## 👨‍💻 Author

- 哆啦Ahua🌱

---

If this project has helped you, please give it a ⭐️!