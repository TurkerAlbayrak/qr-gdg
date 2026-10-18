'use client';

import React from 'react';
import { QrCode, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigateToTypes: () => void;
}

export default function Footer({
  onScrollToTop,
  onNavigateToTypes,
}: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-6 transition-colors pb-18 sm:pb-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-[10px]">
              <QrCode className="w-3 h-3" />
            </div>
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
              qrgdg
            </span>
            <span className="text-[10px] text-zinc-400">
              — ücretsiz QR kod oluşturucu
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <button onClick={onNavigateToTypes} className="hover:text-zinc-900 dark:hover:text-zinc-100">
              QR Türleri
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Cihazda Üretim</span>
            </span>
            <span>•</span>
            <button onClick={onScrollToTop} className="hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-0.5">
              <span>Başa Dön</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
