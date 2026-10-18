'use client';

import React from 'react';
import { Smartphone, ShieldAlert, Printer, Check } from 'lucide-react';

export default function PrintGuideSection() {
  return (
    <section className="py-10 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Baskı ve Tarama İpuçları
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mt-1">
            QR kodunuzun tüm telefon kameralarınca sorunsuz taranabilmesi için temel standartlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Card 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-3">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5">
              Minimum Boyutlar
            </h3>
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Okuma mesafesi arttıkça QR kod boyutu da büyümelidir.
            </p>
            <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
              <div className="flex justify-between">
                <span>Kartvizit / Broşür:</span>
                <strong className="text-zinc-900 dark:text-zinc-100">Min. 2 x 2 cm</strong>
              </div>
              <div className="flex justify-between">
                <span>Masa Menüsü:</span>
                <strong className="text-zinc-900 dark:text-zinc-100">Min. 4 x 4 cm</strong>
              </div>
              <div className="flex justify-between">
                <span>Afiş / Tabela:</span>
                <strong className="text-zinc-900 dark:text-zinc-100">Min. 15 x 15 cm</strong>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-3">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5">
              Yüksek Renk Kontrastı
            </h3>
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Kamera sensörleri için açık zemin üzerine koyu noktalar en idealidir.
            </p>
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Beyaz arka plan + Siyah/Koyu renk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Parlama yapmayan mat baskı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1 birim kenar boşluğu (Quiet zone)</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-3">
              <Printer className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5">
              Baskı İçin Vektörel (SVG)
            </h3>
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Matbaaya teslim ederken SVG vektör formatını tercih edin.
            </p>
            <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sıfır pikselleşme ve kayıpsız netlik</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Illustrator, Photoshop ile tam uyumlu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Baskı öncesi daima kamerayla test edin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
