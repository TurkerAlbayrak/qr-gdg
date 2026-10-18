'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryTabs from '@/components/CategoryTabs';
import TypeSelector from '@/components/TypeSelector';
import QrForm from '@/components/QrForm';
import QrPreview from '@/components/QrPreview';
import InstagramModal from '@/components/InstagramModal';
import HistorySection from '@/components/HistorySection';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import Toast, { ToastMessage } from '@/components/Toast';

import {
  QR_TYPES,
  generateQrPayload,
  getPayloadSummary,
  validateQrSettings,
} from '@/lib/qrGenerators';
import {
  QrTypeDefinition,
  QrCategory,
  QrStyleOptions,
  QrHistoryItem,
} from '@/types/qr';
import {
  getStoredHistory,
  saveHistoryItem,
  deleteHistoryItem,
  clearAllHistory,
  getStoredTheme,
  setStoredTheme,
} from '@/lib/storage';
import {
  getQrPngBlob,
  triggerFileDownload,
} from '@/lib/qrRenderer';
import {
  copyQrToClipboard,
  shareToWhatsApp,
  prepareInstagramShare,
} from '@/lib/shareUtils';

export default function Home() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Type selection state
  const [selectedCategory, setSelectedCategory] = useState<QrCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentType, setCurrentType] = useState<QrTypeDefinition>(QR_TYPES[0]); // Default: URL

  // Form inputs state
  const [formValues, setFormValues] = useState<Record<string, any>>(QR_TYPES[0].defaultValues);

  // Styling options state
  const [styleOptions, setStyleOptions] = useState<QrStyleOptions>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    size: 1024,
    errorCorrectionLevel: 'M',
    margin: 1,
    includeMargin: true,
    logoSize: 20,
    title: '',
  });

  // History state
  const [historyItems, setHistoryItems] = useState<QrHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Instagram share modal state
  const [isInstagramOpen, setIsInstagramOpen] = useState(false);
  const [instagramCanNativeShare, setInstagramCanNativeShare] = useState(false);
  const [instagramFile, setInstagramFile] = useState<File | null>(null);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize theme and load history from localStorage
  useEffect(() => {
    const savedTheme = getStoredTheme();
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark);

    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setHistoryItems(getStoredHistory());
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    setStoredTheme(nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toast handler
  const showToast = useCallback((type: 'success' | 'warning' | 'info' | 'error', text: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Filter QR types based on category and search query
  const filteredTypes = useMemo(() => {
    return QR_TYPES.filter((type) => {
      const matchesCat = selectedCategory === 'all' || type.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        type.name.toLowerCase().includes(q) ||
        type.description.toLowerCase().includes(q) ||
        type.id.toLowerCase().includes(q) ||
        (type.badge && type.badge.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle switching QR type
  const handleSelectType = useCallback((type: QrTypeDefinition) => {
    setCurrentType(type);
    setFormValues(type.defaultValues);
    const el = document.getElementById('qr-creator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  const handleStyleChange = useCallback((options: Partial<QrStyleOptions>) => {
    setStyleOptions((prev) => ({
      ...prev,
      ...options,
    }));
  }, []);

  // Compute live payload and summary
  const payload = useMemo(() => {
    return generateQrPayload(currentType.id, formValues);
  }, [currentType.id, formValues]);

  const summary = useMemo(() => {
    return getPayloadSummary(currentType.id, formValues);
  }, [currentType.id, formValues]);

  // Compute live validation notices
  const validationNotices = useMemo(() => {
    return validateQrSettings(
      payload,
      styleOptions.fgColor,
      styleOptions.bgColor,
      Boolean(styleOptions.logoUrl),
      styleOptions.errorCorrectionLevel
    );
  }, [payload, styleOptions]);

  // Save to history helper
  const handleSaveToHistory = useCallback(
    (currentPayload: string, currentSummary: string) => {
      const item: QrHistoryItem = {
        id: Date.now().toString(),
        typeId: currentType.id,
        typeName: currentType.name,
        title: styleOptions.title || currentType.name,
        payload: currentPayload,
        summary: currentSummary,
        createdAt: Date.now(),
        options: { ...styleOptions },
      };
      const updated = saveHistoryItem(item);
      setHistoryItems(updated);
    },
    [currentType, styleOptions]
  );

  // Restore item from history
  const handleSelectHistoryItem = useCallback((item: QrHistoryItem) => {
    const matchedType = QR_TYPES.find((t) => t.id === item.typeId) || QR_TYPES[0];
    setCurrentType(matchedType);
    setStyleOptions(item.options);

    if (matchedType.id === 'url') {
      setFormValues({ url: item.payload });
    } else if (matchedType.id === 'text') {
      setFormValues({ text: item.payload });
    } else {
      setFormValues({ ...matchedType.defaultValues, ...item.options });
    }

    showToast('info', `"${item.typeName}" yüklendi.`);
    const el = document.getElementById('qr-creator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [showToast]);

  const handleDeleteHistoryItem = useCallback((id: string) => {
    const updated = deleteHistoryItem(id);
    setHistoryItems(updated);
  }, []);

  const handleClearAllHistory = useCallback(() => {
    if (window.confirm('Tüm geçmiş QR kodlarınızı silmek istediğinize emin misiniz?')) {
      clearAllHistory();
      setHistoryItems([]);
      showToast('info', 'Geçmiş temizlendi.');
    }
  }, [showToast]);

  // Navigation handlers
  const scrollToCreator = useCallback(() => {
    const el = document.getElementById('qr-creator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTypes = useCallback(() => {
    const el = document.getElementById('qr-types-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResetToNew = useCallback(() => {
    setFormValues(currentType.defaultValues);
    setStyleOptions((prev) => ({
      ...prev,
      title: '',
      logoUrl: undefined,
    }));
    showToast('info', 'Form sıfırlandı.');
    scrollToTypes();
  }, [currentType, showToast, scrollToTypes]);

  // Mobile Bottom Bar Quick Actions
  const handleMobileDownload = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions);
      const filename = `qrgdg-${currentType.id}-${Date.now()}.png`;
      triggerFileDownload(blob, filename);
      showToast('success', 'PNG indirildi!');
      handleSaveToHistory(payload, summary);
    } catch {
      showToast('error', 'İndirme başarısız oldu.');
    }
  };

  const handleMobileWhatsApp = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions);
      const res = await shareToWhatsApp(blob, summary, payload, styleOptions.title);
      showToast('info', res.message);
      handleSaveToHistory(payload, summary);
    } catch {
      showToast('error', 'WhatsApp açılamadı.');
    }
  };

  const handleMobileInstagram = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions);
      const { canNativeShare, file } = await prepareInstagramShare(blob, styleOptions.title);
      setInstagramCanNativeShare(canNativeShare);
      setInstagramFile(file);
      setIsInstagramOpen(true);
      showToast('success', 'Görsel indirildi!');
      handleSaveToHistory(payload, summary);
    } catch {
      showToast('error', 'Instagram başlatılamadı.');
    }
  };

  const handleMobileCopy = async () => {
    try {
      const blob = await getQrPngBlob(payload, styleOptions);
      const res = await copyQrToClipboard(blob, payload);
      showToast(res.success ? 'success' : 'warning', res.message);
    } catch {
      showToast('error', 'Kopyalama başarısız.');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      {/* 1. Header */}
      <Header
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        historyCount={historyItems.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNavigateToTypes={scrollToTypes}
        onNavigateToCreator={scrollToCreator}
      />

      <main className="flex-1 pb-16">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Types Selection */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <TypeSelector
            types={filteredTypes}
            selectedTypeId={currentType.id}
            onSelectType={handleSelectType}
          />
        </div>

        {/* 4. Creator Workspace (Form + Preview) */}
        <div
          id="qr-creator-section"
          className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20 mt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Form Column */}
            <div className="md:col-span-7">
              <QrForm
                currentType={currentType}
                formValues={formValues}
                onFieldChange={handleFieldChange}
                styleOptions={styleOptions}
                onStyleChange={handleStyleChange}
                validationNotices={validationNotices}
              />
            </div>

            {/* Preview Column */}
            <div className="md:col-span-5 md:sticky md:top-18">
              <QrPreview
                currentType={currentType}
                payload={payload}
                summary={summary}
                styleOptions={styleOptions}
                onResetToNew={handleResetToNew}
                onShowToast={showToast}
                onOpenInstagramModal={(canNativeShare, file) => {
                  setInstagramCanNativeShare(canNativeShare);
                  setInstagramFile(file);
                  setIsInstagramOpen(true);
                }}
                onSaveToHistory={handleSaveToHistory}
              />
            </div>
          </div>
        </div>
      </main>

      {/* 5. Clean Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        onNavigateToTypes={scrollToTypes}
      />

      {/* 6. Floating Mobile Bottom Action Pill */}
      <MobileBottomBar
        onDownload={handleMobileDownload}
        onWhatsApp={handleMobileWhatsApp}
        onInstagram={handleMobileInstagram}
        onCopy={handleMobileCopy}
        isVisible={Boolean(payload)}
      />

      {/* 7. Instagram Modal */}
      <InstagramModal
        isOpen={isInstagramOpen}
        onClose={() => setIsInstagramOpen(false)}
        canNativeShare={instagramCanNativeShare}
        onNativeShare={async () => {
          if (instagramFile && navigator.share) {
            try {
              await navigator.share({
                title: styleOptions.title || 'qrgdg QR',
                files: [instagramFile],
              });
            } catch (err: any) {
              if (err.name !== 'AbortError') {
                showToast('error', 'Paylaşım yapılamadı.');
              }
            }
          }
        }}
      />

      {/* 8. History Modal */}
      <HistorySection
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyItems={historyItems}
        onSelectHistoryItem={handleSelectHistoryItem}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />

      {/* 9. Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
