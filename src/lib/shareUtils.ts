import { triggerFileDownload } from './qrRenderer';

export interface ShareResult {
  success: boolean;
  message: string;
  actionTaken: 'clipboard_image' | 'clipboard_text' | 'web_share' | 'whatsapp_link' | 'download_instagram' | 'error';
}

/**
 * Copy QR image to clipboard, with graceful fallback to copying payload text
 */
export async function copyQrToClipboard(blob: Blob, payload: string): Promise<ShareResult> {
  if (!navigator.clipboard) {
    return {
      success: false,
      message: 'Tarayıcınız panoya erişimi desteklemiyor. Lütfen indir butonunu kullanın.',
      actionTaken: 'error',
    };
  }

  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return {
        success: true,
        message: 'QR Kod görseli panoya kopyalandı.',
        actionTaken: 'clipboard_image',
      };
    }
  } catch (err) {
    console.warn('Image clipboard write failed, falling back to text copy:', err);
  }

  try {
    await navigator.clipboard.writeText(payload);
    return {
      success: true,
      message: 'QR içeriği panoya kopyalandı.',
      actionTaken: 'clipboard_text',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Kopyalama işlemi başarısız oldu.',
      actionTaken: 'error',
    };
  }
}

/**
 * Copy raw text or URL to clipboard
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Clipboard copy text error:', err);
    return false;
  }
}

/**
 * Share via WhatsApp
 */
export async function shareToWhatsApp(
  blob: Blob,
  summary: string,
  payload: string,
  title?: string
): Promise<ShareResult> {
  const fileName = `qrgdg-${Date.now()}.png`;
  const file = new File([blob], fileName, { type: 'image/png' });
  const shareText = `qrgdg ile oluşturulan QR Kod:\n${title ? `📌 ${title}\n` : ''}🔗 ${summary || payload}`;

  const canShareFiles =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] });

  if (canShareFiles) {
    try {
      await navigator.share({
        title: title || 'qrgdg QR Kod',
        text: shareText,
        files: [file],
      });
      return {
        success: true,
        message: 'Paylaşım menüsü açıldı.',
        actionTaken: 'web_share',
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return {
          success: true,
          message: 'Paylaşım iptal edildi.',
          actionTaken: 'web_share',
        };
      }
    }
  }

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  return {
    success: true,
    message: 'WhatsApp açıldı.',
    actionTaken: 'whatsapp_link',
  };
}

/**
 * Share to Instagram
 */
export async function prepareInstagramShare(
  blob: Blob,
  title?: string
): Promise<{ canNativeShare: boolean; file: File }> {
  const fileName = `qrgdg-instagram-${Date.now()}.png`;
  const file = new File([blob], fileName, { type: 'image/png' });

  triggerFileDownload(blob, fileName);

  const canNativeShare = Boolean(
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  );

  return { canNativeShare, file };
}
