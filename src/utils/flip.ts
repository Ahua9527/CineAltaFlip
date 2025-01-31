interface ClipData {
  clipName: string;
  flip: string;
  duration: string;
  frameRate: string;
  aspectRatio: string;
  pixelAspect: string;
  videoType: string;
  audioType: string;
  channels: string;
  status: string;
}

export const processMediaProXML = async (file: File): Promise<void> => {
  try {
    // 解析 XML 内容
    const text = await file.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    // 获取媒体信息
    const attachedElement = xmlDoc.querySelector('Attached');
    const mediaName = attachedElement?.getAttribute('mediaName') || 'unknown';
    const mediaId = attachedElement?.getAttribute('mediaId') || '';
    const mediaKind = attachedElement?.getAttribute('mediaKind') || '';

    // 提取所有素材信息
    const materials = xmlDoc.querySelectorAll('Material');
    const clipsData: ClipData[] = [];

    materials.forEach((material) => {
      const uri = material.getAttribute('uri') || '';
      const clipName = uri.split('/').pop()?.replace('.mxf', '') || '';

      if (clipName) {
        clipsData.push({
          clipName,
          flip: material.getAttribute('flip') || 'none',
          duration: material.getAttribute('dur') || '',
          frameRate: material.getAttribute('fps') || '',
          aspectRatio: material.getAttribute('aspectRatio') || '',
          pixelAspect: material.getAttribute('pixelAspect') || '',
          videoType: material.getAttribute('videoType') || '',
          audioType: material.getAttribute('audioType') || '',
          channels: material.getAttribute('ch') || '',
          status: material.getAttribute('status') || ''
        });
      }
    });

    // 生成 CSV 内容
    const csvRows = [
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
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mediaName}_CineAlta-Flip.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error processing MediaPro XML:', error);
    throw new Error('处理 MediaPro XML 文件时发生错误');
  }
};