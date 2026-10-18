'use client';

import React from 'react';
import { X, History, Trash2, ArrowUpRight, Clock, QrCode } from 'lucide-react';
import { QrHistoryItem } from '@/types/qr';

interface HistorySectionProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: QrHistoryItem[];
  onSelectHistoryItem: (item: QrHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export default function HistorySection({
  isOpen,
  onClose,
  historyItems,
  onSelectHistoryItem,
  onDeleteItem,
  onClearAll,
}: HistorySectionProps) {
  if (!isOpen) return null;

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                Geçmiş QR Kodlarım
              </h3>
              <p className="text-[11px] text-zinc-500">
                Tarayıcınızda kayıtlı son {historyItems.length} QR kod
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {historyItems.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                Temizle
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {historyItems.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center mb-2">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Henüz kayıtlı QR kod yok
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Oluşturduğunuz kodlar burada saklanır.
              </p>
            </div>
          ) : (
            historyItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/80 flex items-center justify-between gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectHistoryItem(item);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {item.typeName}
                    </span>
                    <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {item.title || item.summary || item.payload}
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate">{item.payload}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800"
                    title="Yükle"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
