'use client';

import React from 'react';
import { X, ExternalLink, Check, Share2 } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  canNativeShare: boolean;
  onNativeShare: () => void;
}

export default function InstagramModal({
  isOpen,
  onClose,
  canNativeShare,
  onNativeShare,
}: InstagramModalProps) {
  if (!isOpen) return null;

  const handleOpenInstagram = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'instagram://camera';
      setTimeout(() => {
        window.open('https://instagram.com', '_blank');
      }, 1500);
    } else {
      window.open('https://instagram.com', '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
            <InstagramIcon className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Instagram'da Paylaş
            </h3>
            <p className="text-xs text-zinc-500">
              Görsel cihazınıza indirildi. 3 pratik adım:
            </p>
          </div>
        </div>

        {/* Status notice */}
        <div className="mb-4 p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>QR görseli galerinizde / indirilenlerde hazır.</span>
        </div>

        {/* Steps */}
        <div className="space-y-2.5 mb-6 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-bold text-[11px] flex items-center justify-center shrink-0 text-zinc-700 dark:text-zinc-300">
              1
            </span>
            <div>
              <strong className="text-zinc-800 dark:text-zinc-200 block">Instagram'ı Açın:</strong>
              Hikaye veya gönderi oluşturma ekranına geçin.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-bold text-[11px] flex items-center justify-center shrink-0 text-zinc-700 dark:text-zinc-300">
              2
            </span>
            <div>
              <strong className="text-zinc-800 dark:text-zinc-200 block">Görseli Seçin:</strong>
              Galeriden az önce indirilen QR kod fotoğrafını seçin.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-bold text-[11px] flex items-center justify-center shrink-0 text-zinc-700 dark:text-zinc-300">
              3
            </span>
            <div>
              <strong className="text-zinc-800 dark:text-zinc-200 block">Paylaşın:</strong>
              İsteğe bağlı link çıkartması ekleyerek hikayenizde paylaşın.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleOpenInstagram}
            className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-zinc-900 dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center justify-center gap-1.5 transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-rose-400" />
            Instagram'ı Aç
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </button>

          {canNativeShare && (
            <button
              onClick={() => {
                onNativeShare();
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl font-medium text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Sistem Menüsü
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
