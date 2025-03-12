import { useState, useRef } from 'react';  // 导入 React Hooks
import { Upload, FileText, X, Github } from 'lucide-react';  // 导入图标组件
import { processMediaProXML } from '../utils/flip';  // 导入 XML 处理函数

/**
 * XML 上传组件
 * 用于上传、预览和处理 MediaPro XML 文件
 */
const XMLUploader = () => {
  // 状态管理
  const [files, setFiles] = useState<File[]>([]);  // 存储上传的文件列表
  const [isDragging, setIsDragging] = useState(false);  // 拖拽状态标记
  const [processing, setProcessing] = useState(false);  // 文件处理中状态
  const [currentFile, setCurrentFile] = useState<string>('');  // 当前正在处理的文件名
  const [progress, setProgress] = useState<number>(0);  // 处理进度百分比
  const fileInputRef = useRef<HTMLInputElement>(null);  // 文件输入元素的引用

  /**
   * 处理拖拽进入事件
   * 当文件拖入上传区域时触发
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();  // 阻止默认行为
    e.stopPropagation();  // 阻止事件冒泡
    setIsDragging(true);  // 设置拖拽状态为 true
  };

  /**
   * 处理拖拽离开事件
   * 当文件拖离上传区域时触发
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);  // 设置拖拽状态为 false
  };

  /**
   * 处理拖拽悬停事件
   * 当文件在上传区域上方悬停时触发
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * 处理文件放置事件
   * 当文件放置到上传区域时触发
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);  // 转换 FileList 为数组
    handleFiles(droppedFiles);  // 处理拖放的文件
  };

  /**
   * 处理文件选择/拖放的通用函数
   * 验证文件类型和大小，并更新状态
   */
  const handleFiles = (newFiles: File[]) => {
    // 检查文件数量限制（最多99个文件）
    if (files.length + newFiles.length > 99) {
      alert('最多只能上传99个文件');
      return;
    }

    // 筛选有效的 XML 文件（扩展名为 .xml 且大小不超过 50MB）
    const validFiles = newFiles.filter(file => {
      const isXML = file.name.toLowerCase().endsWith('.xml');
      const isValidSize = file.size <= 50 * 1024 * 1024;  // 50MB
      return isXML && isValidSize;
    });

    // 检查是否有有效文件
    if (validFiles.length === 0) {
      alert('请上传XML文件，且文件大小不超过50MB');
      return;
    }

    // 添加有效文件到状态
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  /**
   * 删除单个文件
   * @param index 要删除的文件索引
   */
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));  // 使用过滤器移除指定索引的文件
  };

  /**
   * 清空所有文件
   */
  const clearFiles = () => {
    setFiles([]);  // 重置文件列表为空数组
  };

  /**
   * 格式化文件大小显示
   * 将字节转换为 B/KB/MB 格式
   * @param bytes 文件大小（字节）
   * @returns 格式化后的文件大小字符串
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';  // 字节显示
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';  // KB 显示
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';  // MB 显示
  };

  /**
   * 处理文件的主函数
   * 逐个处理上传的 XML 文件
   */
  const handleProcess = async () => {
    if (!files.length) return;  // 如果没有文件，直接返回
    
    setProcessing(true);  // 设置处理状态
    setProgress(0);  // 重置进度
    
    try {
      // 逐个处理文件
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentFile(file.name);  // 更新当前处理的文件名
        setProgress((i / files.length) * 100);  // 更新进度百分比
        
        // 调用处理函数处理 XML 文件
        await processMediaProXML(file);
        
        // 更新完成进度
        setProgress(((i + 1) / files.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 1000));  // 延时 1 秒，让用户看到进度变化
      }
    } catch (error) {
      console.error('Processing error:', error);  // 记录错误
      alert('处理文件时发生错误，请检查文件格式是否正确');  // 显示错误提示
    } finally {
      // 无论成功还是失败，都重置处理状态
      setProcessing(false);
      setCurrentFile('');
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg transition-all duration-500 ease-in-out">
      <main className="flex-grow flex items-center justify-center p-6 pb-32 bg-light-bg dark:bg-dark-bg">
        <div className="w-full max-w-2xl bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-10 min-h-[400px] transition-all duration-500 ease-in-out">
          {/* 应用标题 */}
          <h1 className="text-4xl font-chalkboard font-bold text-gray-900 dark:text-white mt-8 mb-2 text-center tracking-wide transition-colors duration-500 ease-in-out [filter:drop-shadow(2px_4px_6px_rgba(0,0,0,0.3))]">
            CineAlta<span className="text-venice">Flip</span> 
          </h1>

          {/* 应用描述 */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-12 text-center">
          一拖一拽之间，翻转立现眼前
          </p>

          <div className="space-y-6">
            {/* 文件上传区域 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                上传 MEDIAPRO.XML 文件
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
                  ${isDragging 
                    ? 'border-selected bg-cyan-50 dark:bg-cyan-900'  // 拖拽时的样式
                    : 'border-gray-300 dark:border-gray-600 hover:bg-light-bg dark:hover:bg-dark-bg'  // 普通状态的样式
                  }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}  // 点击触发文件选择
              >
                {/* 隐藏的文件输入框 */}
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  accept=".xml"  // 只接受 XML 文件
                  multiple  // 允许多选
                  onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                />
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    支持拖放或点击上传
                  </p>
                  {/* 提示文本 */}
                </div>
              </div>
            </div>

            {/* 文件列表区域 */}
            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    已上传文件 ({files.length})
                  </h3>
                  <button
                    onClick={clearFiles}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    清空
                  </button>
                </div>
                {/* 文件列表 */}
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 
                             border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 处理进度显示 */}
            {processing && (
              <div className="space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  正在处理: {currentFile}
                </div>
                {/* 进度条 */}
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-selected h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}  // 动态设置进度条宽度
                  />
                </div>
              </div>
            )}

            {/* 处理按钮 */}
            {files.length > 0 && (
              <button
                onClick={handleProcess}
                disabled={processing}  // 处理中禁用按钮
                className={`w-full py-2 px-4 rounded-md font-medium transition-all
                  ${processing 
                    ? 'bg-selected/70 cursor-not-allowed'  // 处理中的样式
                    : 'bg-selected hover:bg-blue-600 text-white shadow-md hover:shadow-lg'  // 可点击状态的样式
                  }`}
              >
                {processing ? '处理中...' : `处理 ${files.length} 个文件`}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* 固定底部区域 */}
      <footer className="fixed bottom-0 w-full bg-gradient-to-t from-light-bg/95 via-light-bg/80 to-light-bg/0 dark:from-dark-bg/95 dark:via-dark-bg/80 dark:to-dark-bg/0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-6">
            {/* GitHub 链接 */}
            <a
              href="https://github.com/Ahua9527/CineAltaFlip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-selected"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
          {/* 版权信息 */}
          <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            CineAltaFlip © 2025 | Designed & Developed by 哆啦Ahua🌱
          </p>
        </div>
      </footer>

      {/* 背景遮罩层 */}
      <div className="fixed inset-0 -z-10 bg-light-bg dark:bg-dark-bg"></div>
    </div>
  );
};

export default XMLUploader;