'use client';

import React from 'react';
import { Download, Copy } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './BrandIcons';

interface MobileBottomBarProps {
  onDownload: () => void;
  onWhatsApp: () => void;
  onInstagram: () => void;
  onCopy: () => void;
  isVisible: boolean;
}

export default function MobileBottomBar({
  onDownload,
  onWhatsApp,
  onInstagram,
  onCopy,
  isVisible,
}: MobileBottomBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 left-4 right-4 z-30 md:hidden flex items-center justify-between gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 dark:bg-zinc-800/90 text-white backdrop-blur-lg shadow-lg border border-zinc-700/50">
      <button
        onClick={onDownload}
        className="flex-1 py-2 px-1 rounded-xl bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Download className="w-3.5 h-3.5" />
        <span>İndir</span>
      </button>

      <button
        onClick={onWhatsApp}
        className="flex-1 py-2 px-1 rounded-xl hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1 active:scale-95 transition-transform"
      >
        <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={onInstagram}
        className="flex-1 py-2 px-1 rounded-xl hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1 active:scale-95 transition-transform"
      >
        <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
        <span>Instagram</span>
      </button>

      <button
        onClick={onCopy}
        className="p-2 rounded-xl hover:bg-white/10 text-zinc-300 active:scale-95 transition-transform"
        title="Kopyala"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
