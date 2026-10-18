'use client';

import React, { useState } from 'react';
import { QrCode, Sun, Moon, History, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  historyCount: number;
  onOpenHistory: () => void;
  onNavigateToTypes: () => void;
  onNavigateToCreator: () => void;
}

export default function Header({
  darkMode,
  onToggleTheme,
  historyCount,
  onOpenHistory,
  onNavigateToTypes,
  onNavigateToCreator,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (fn: () => void) => {
    fn();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={onNavigateToCreator}
          className="flex items-center gap-2 cursor-pointer select-none"
          role="button"
          tabIndex={0}
        >
          <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold">
            <QrCode className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
              qrgdg
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              ücretsiz
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 text-xs font-medium">
          <button
            onClick={onNavigateToCreator}
            className="px-3 py-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            QR Oluştur
          </button>
          <button
            onClick={onNavigateToTypes}
            className="px-3 py-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            QR Türleri
          </button>
          <button
            onClick={onOpenHistory}
            className="px-3 py-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5" />
            <span>Geçmiş</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            title={darkMode ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
            aria-label="Tema Değiştir"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2 space-y-1 text-xs">
          <button
            onClick={() => handleNavClick(onNavigateToCreator)}
            className="w-full text-left py-2 px-2.5 rounded-lg font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            QR Oluştur
          </button>
          <button
            onClick={() => handleNavClick(onNavigateToTypes)}
            className="w-full text-left py-2 px-2.5 rounded-lg font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between"
          >
            <span>QR Kod Türleri</span>
            <span className="text-[10px] text-zinc-400">28 Tür</span>
          </button>
          <button
            onClick={() => handleNavClick(onOpenHistory)}
            className="w-full text-left py-2 px-2.5 rounded-lg font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-zinc-400" />
              <span>Geçmiş Kodlar</span>
            </div>
            {historyCount > 0 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
