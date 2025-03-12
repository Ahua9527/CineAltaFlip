/**
 * 剪辑数据接口
 * 定义了从 XML 文件中提取的单个剪辑的所有属性
 */
interface ClipData {
  clipName: string;      // 剪辑名称
  flip: string;          // 翻转状态
  duration: string;      // 持续时间（帧数）
  frameRate: string;     // 帧率
  aspectRatio: string;   // 宽高比
  pixelAspect: string;   // 像素宽高比
  videoType: string;     // 视频类型
  audioType: string;     // 音频类型
  channels: string;      // 音频通道数
  status: string;        // 状态
}

/**
 * 处理 MediaPro XML 文件
 * 解析 XML 文件，提取翻转元数据，并生成 CSV 报表
 * @param file - 要处理的 XML 文件对象
 * @returns 返回一个 Promise，处理完成时解决
 */
export const processMediaProXML = async (file: File): Promise<void> => {
  try {
    // 读取并解析 XML 文件
    const text = await file.text();                              // 将文件内容作为文本读取
    const parser = new DOMParser();                              // 创建 XML 解析器
    const xmlDoc = parser.parseFromString(text, 'text/xml');     // 解析 XML 文本

    // 获取媒体信息
    const attachedElement = xmlDoc.querySelector('Attached');    // 获取 Attached 元素
    const mediaName = attachedElement?.getAttribute('mediaName') || 'unknown';  // 媒体名称，默认为 'unknown'
    const mediaId = attachedElement?.getAttribute('mediaId') || '';             // 媒体 ID
    const mediaKind = attachedElement?.getAttribute('mediaKind') || '';         // 媒体类型

    // 提取所有素材信息
    const materials = xmlDoc.querySelectorAll('Material');       // 获取所有 Material 元素
    const clipsData: ClipData[] = [];                            // 用于存储剪辑数据的数组

    // 遍历每个 Material 元素，提取剪辑信息
    materials.forEach((material) => {
      const uri = material.getAttribute('uri') || '';                    // 获取 URI 属性
      const clipName = uri.split('/').pop()?.replace('.mxf', '') || '';  // 从 URI 中提取剪辑名称（移除 .mxf 后缀）

      // 只有当剪辑名称存在时才添加到数据集
      if (clipName) {
        clipsData.push({
          clipName,                                                  // 剪辑名称
          flip: material.getAttribute('flip') || 'none',             // 翻转状态，默认为 'none'
          duration: material.getAttribute('dur') || '',              // 持续时间
          frameRate: material.getAttribute('fps') || '',             // 帧率
          aspectRatio: material.getAttribute('aspectRatio') || '',   // 宽高比
          pixelAspect: material.getAttribute('pixelAspect') || '',   // 像素宽高比
          videoType: material.getAttribute('videoType') || '',       // 视频类型
          audioType: material.getAttribute('audioType') || '',       // 音频类型
          channels: material.getAttribute('ch') || '',               // 音频通道数
          status: material.getAttribute('status') || ''              // 状态
        });
      }
    });

    // 生成 CSV 内容
    const csvRows = [
      // 生成器信息
      '# Generator: 哆啦Ahua 🌱  https://cinealtaflip.ahua.space',
      // CSV 头部信息
      '# Media Information',
      `# Media Name: ${mediaName}`,
      `# Media ID: ${mediaId}`,
      `# Media Kind: ${mediaKind}`,
      '',
      // CSV 列头
      [
        'Clip Name',
        'Flip',
        'Duration (frames)',
        'Project FPS',
        'Aspect Ratio',
        'Pixel Aspect',
        'Video Type',
        'Audio Type',
        'Audio Channels',
        'Status'
      ].join(','),
      // CSV 数据行
      ...clipsData.map(({
        clipName,
        flip,
        duration,
        frameRate,
        aspectRatio,
        pixelAspect,
        videoType,
        audioType,
        channels,
        status
      }) => [
        clipName,
        flip,
        duration,
        frameRate,
        aspectRatio,
        pixelAspect,
        videoType,
        audioType,
        channels,
        status
      ].join(','))
    ].join('\n');

    // 创建并下载 CSV 文件
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });  // 创建 Blob 对象
    const url = URL.createObjectURL(blob);                                   // 创建对象 URL
    const link = document.createElement('a');                                // 创建下载链接
    link.href = url;                                                         // 设置链接 URL
    link.download = `${mediaName}_CineAltaFlip.csv`;                         // 设置下载文件名
    document.body.appendChild(link);                                         // 添加链接到文档
    link.click();                                                            // 模拟点击链接触发下载
    document.body.removeChild(link);                                         // 移除链接
    URL.revokeObjectURL(url);                                                // 释放对象 URL

  } catch (error) {
    // 错误处理
    console.error('Error processing MediaPro XML:', error);                  // 记录错误
    throw new Error('处理 MediaPro XML 文件时发生错误');                        // 抛出自定义错误
  }
};