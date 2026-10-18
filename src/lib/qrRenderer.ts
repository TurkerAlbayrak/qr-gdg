import QRCode from 'qrcode';
import { QrStyleOptions } from '@/types/qr';

export interface RenderResult {
  dataUrl: string;
  blob: Blob;
}

/**
 * Render QR Code onto a canvas with custom colors, error correction, and optional center logo
 */
export async function renderQrToCanvas(
  canvas: HTMLCanvasElement,
  payload: string,
  options: QrStyleOptions,
  logoImg?: HTMLImageElement | null
): Promise<void> {
  const size = options.size || 512;
  const margin = options.includeMargin ? options.margin : 1;

  // Set physical resolution of canvas
  canvas.width = size;
  canvas.height = size;

  // Render base QR code onto the canvas
  await QRCode.toCanvas(canvas, payload, {
    width: size,
    margin: margin,
    errorCorrectionLevel: options.errorCorrectionLevel,
    color: {
      dark: options.fgColor,
      light: options.bgColor === 'transparent' ? '#00000000' : options.bgColor,
    },
  });

  // CRITICAL: QRCode.toCanvas sets canvas.style.width = size + 'px' inline.
  // We MUST reset it so CSS can cleanly control display size.
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.maxWidth = '100%';
  canvas.style.maxHeight = '100%';

  // If a logo is provided, draw it in the center
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Logo size calculation (default ~20% of canvas)
    const logoRatio = (options.logoSize || 20) / 100;
    const logoSize = Math.floor(size * logoRatio);
    const logoX = Math.floor((size - logoSize) / 2);
    const logoY = Math.floor((size - logoSize) / 2);

    // Draw a clean white/bg background badge behind logo to prevent QR module overlap
    const padding = Math.max(6, Math.floor(logoSize * 0.12));
    const badgeSize = logoSize + padding * 2;
    const badgeX = logoX - padding;
    const badgeY = logoY - padding;
    const borderRadius = Math.floor(badgeSize * 0.22);

    ctx.save();
    // Draw rounded badge
    ctx.fillStyle = options.bgColor === 'transparent' ? '#FFFFFF' : options.bgColor;
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, borderRadius);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';

    // Badge border
    ctx.lineWidth = 2;
    ctx.strokeStyle = options.fgColor;
    ctx.globalAlpha = 0.2;
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // Clip to rounded area for the logo image
    ctx.beginPath();
    ctx.roundRect(logoX, logoY, logoSize, logoSize, Math.floor(borderRadius * 0.7));
    ctx.clip();

    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    ctx.restore();
  }
}

/**
 * Render high-res PNG Blob for downloads, clipboard or sharing
 */
export async function getQrPngBlob(
  payload: string,
  options: QrStyleOptions,
  logoImg?: HTMLImageElement | null
): Promise<Blob> {
  const offscreenCanvas = document.createElement('canvas');
  await renderQrToCanvas(offscreenCanvas, payload, options, logoImg);

  return new Promise((resolve, reject) => {
    offscreenCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas blob oluşturulamadı'));
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Generate vector SVG string
 */
export async function generateQrSvgString(
  payload: string,
  options: QrStyleOptions
): Promise<string> {
  const margin = options.includeMargin ? options.margin : 1;
  const svgString = await QRCode.toString(payload, {
    type: 'svg',
    width: options.size || 512,
    margin: margin,
    errorCorrectionLevel: options.errorCorrectionLevel,
    color: {
      dark: options.fgColor,
      light: options.bgColor === 'transparent' ? '#00000000' : options.bgColor,
    },
  });

  return svgString;
}

/**
 * Download file helper in browser
 */
export function triggerFileDownload(blobOrUrl: Blob | string, filename: string): void {
  const url = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  if (typeof blobOrUrl !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
