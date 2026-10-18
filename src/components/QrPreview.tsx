'use client';

import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  FileCode,
  Link,
  PlusCircle,
  Check,
  Loader2,
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { QrTypeDefinition, QrStyleOptions } from '@/types/qr';
import {
  renderQrToCanvas,
  getQrPngBlob,
  generateQrSvgString,
  triggerFileDownload,
} from '@/lib/qrRenderer';
import {
  copyQrToClipboard,
  copyTextToClipboard,
  shareToWhatsApp,
  prepareInstagramShare,
} from '@/lib/shareUtils';

interface QrPreviewProps {
  currentType: QrTypeDefinition;
  payload: string;
  summary: string;
  styleOptions: QrStyleOptions;
  onResetToNew: () => void;
  onShowToast: (type: 'success' | 'warning' | 'info' | 'error', text: string) => void;
  onOpenInstagramModal: (canNativeShare: boolean, file: File) => void;
  onSaveToHistory: (payload: string, summary: string) => void;
}

export default function QrPreview({
  currentType,
  payload,
  summary,
  styleOptions,
  onResetToNew,
  onShowToast,
  onOpenInstagramModal,
  onSaveToHistory,
}: QrPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [isCopiedContent, setIsCopiedContent] = useState(false);
  const [isCopiedImage, setIsCopiedImage] = useState(false);

  // Load logo image object when logoUrl changes
  useEffect(() => {
    if (!styleOptions.logoUrl) {
      setLogoImage(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = styleOptions.logoUrl;
    img.onload = () => setLogoImage(img);
    img.onerror = () => setLogoImage(null);
  }, [styleOptions.logoUrl]);

  // Live Canvas Rendering
  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas || !payload) return;

    setIsRendering(true);

    renderQrToCanvas(canvas, payload, styleOptions, logoImage)
      .catch((err) => {
        console.error('Canvas render error:', err);
      })
      .finally(() => {
        if (!isCancelled) setIsRendering(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [payload, styleOptions, logoImage]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignored
    }
  };

  // 1. Download High-Res PNG
  const handleDownloadPng = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions, logoImage);
      const filename = `qrgdg-${currentType.id}-${Date.now()}.png`;
      triggerFileDownload(blob, filename);
      onShowToast('success', `PNG indirildi (${styleOptions.size}x${styleOptions.size}px)`);
      triggerConfetti();
      onSaveToHistory(payload, summary);
    } catch (err: any) {
      onShowToast('error', 'PNG indirilemedi: ' + (err.message || 'Hata oluştu'));
    }
  };

  // 2. Download Vector SVG
  const handleDownloadSvg = async () => {
    try {
      const svgStr = await generateQrSvgString(payload, styleOptions);
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const filename = `qrgdg-${currentType.id}-${Date.now()}.svg`;
      triggerFileDownload(blob, filename);
      onShowToast('success', 'Vektörel SVG indirildi (Baskıya hazır).');
      triggerConfetti();
      onSaveToHistory(payload, summary);
    } catch (err: any) {
      onShowToast('error', 'SVG indirilemedi: ' + (err.message || 'Hata oluştu'));
    }
  };

  // 3. Copy QR Image to Clipboard (with text fallback)
  const handleCopyImage = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions, logoImage);
      const result = await copyQrToClipboard(blob, payload);
      if (result.success) {
        setIsCopiedImage(true);
        setTimeout(() => setIsCopiedImage(false), 2000);
        onShowToast('success', result.message);
      } else {
        onShowToast('warning', result.message);
      }
    } catch (err: any) {
      onShowToast('error', 'Kopyalama sırasında bir sorun oluştu.');
    }
  };

  // 4. Share to WhatsApp
  const handleShareWhatsApp = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions, logoImage);
      const result = await shareToWhatsApp(blob, summary, payload, styleOptions.title);
      onShowToast('info', result.message);
      onSaveToHistory(payload, summary);
    } catch (err: any) {
      onShowToast('error', 'WhatsApp paylaşımı açılamadı.');
    }
  };

  // 5. Share to Instagram (downloads + opens guidance modal)
  const handleShareInstagram = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions, logoImage);
      const { canNativeShare, file } = await prepareInstagramShare(blob, styleOptions.title);
      onOpenInstagramModal(canNativeShare, file);
      onShowToast('success', 'Görsel kaydedildi! Paylaşım adımları açıldı.');
      onSaveToHistory(payload, summary);
    } catch (err: any) {
      onShowToast('error', 'Instagram paylaşımı başlatılamadı.');
    }
  };

  // 6. Copy Link/Payload Content
  const handleCopyContent = async () => {
    const success = await copyTextToClipboard(payload);
    if (success) {
      setIsCopiedContent(true);
      setTimeout(() => setIsCopiedContent(false), 2000);
      onShowToast('success', 'QR içeriği panoya kopyalandı.');
    } else {
      onShowToast('error', 'Panoya kopyalama başarısız oldu.');
    }
  };

  return (
    <div
      id="qr-preview-card"
      className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-xs flex flex-col items-center"
    >
      {/* Top Details */}
      <div className="w-full text-center mb-2">
        <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
          {currentType.name}
        </div>
        {styleOptions.title ? (
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
            {styleOptions.title}
          </h3>
        ) : (
          <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
            QR Ön İzleme
          </h3>
        )}
        <p className="text-[11px] text-zinc-400 truncate max-w-[220px] mx-auto mt-0.5">
          {summary || 'Ön izleme hazır'}
        </p>
      </div>

      {/* QR Code Canvas Box - STRICTLY BOUNDED to 220px / 240px */}
      <div className="relative my-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] overflow-hidden">
        {isRendering && (
          <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/70 rounded-xl flex items-center justify-center z-10">
            <Loader2 className="w-6 h-6 text-zinc-700 dark:text-zinc-300 animate-spin" />
          </div>
        )}

        {/* The Actual Canvas Element */}
        <canvas
          ref={canvasRef}
          className="!w-full !h-full object-contain rounded-md block shrink-0"
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '1 / 1',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      {/* Action Buttons Matrix */}
      <div className="w-full space-y-2 mt-3">
        {/* Row 1: Primary Downloads */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadPng}
            className="py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-zinc-900 dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>PNG İndir</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <FileCode className="w-4 h-4 text-zinc-500" />
            <span>SVG İndir</span>
          </button>
        </div>

        {/* Row 2: WhatsApp & Instagram Sharing */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="py-2 px-3 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareInstagram}
            className="py-2 px-3 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
            <span>Instagram</span>
          </button>
        </div>

        {/* Row 3: Clipboard Copy Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyImage}
            className="py-2 px-3 rounded-xl font-medium text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            {isCopiedImage ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>QR'ı Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyContent}
            className="py-2 px-3 rounded-xl font-medium text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            {isCopiedContent ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Kopyalandı</span>
              </>
            ) : (
              <>
                <Link className="w-3.5 h-3.5 text-zinc-400" />
                <span>Metni Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Row 4: Reset Form */}
        <button
          onClick={onResetToNew}
          className="w-full py-2 px-3 rounded-xl font-medium text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors flex items-center justify-center gap-1.5 pt-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Yeni QR Oluştur</span>
        </button>
      </div>
    </div>
  );
}
