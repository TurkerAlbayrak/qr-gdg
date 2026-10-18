'use client';

import React, { useRef, useState } from 'react';
import {
  Palette,
  Image as ImageIcon,
  Sliders,
  AlertTriangle,
  Info,
  Upload,
  Trash2,
  HelpCircle,
  FileText,
} from 'lucide-react';
import {
  QrTypeDefinition,
  QrStyleOptions,
  ErrorCorrectionLevel,
  ValidationNotice,
} from '@/types/qr';

interface QrFormProps {
  currentType: QrTypeDefinition;
  formValues: Record<string, any>;
  onFieldChange: (fieldName: string, value: any) => void;
  styleOptions: QrStyleOptions;
  onStyleChange: (options: Partial<QrStyleOptions>) => void;
  validationNotices: ValidationNotice[];
}

const FG_COLOR_PRESETS = [
  { name: 'Siyah', value: '#000000' },
  { name: 'Lacivert', value: '#1E293B' },
  { name: 'Kraliyet Mavisi', value: '#1E40AF' },
  { name: 'Orman Yeşili', value: '#065F46' },
  { name: 'Bordo', value: '#991B1B' },
  { name: 'Koyu Mor', value: '#581C87' },
  { name: 'Kahve', value: '#451A03' },
  { name: 'Kömür', value: '#27272A' },
];

const BG_COLOR_PRESETS = [
  { name: 'Beyaz', value: '#FFFFFF' },
  { name: 'Şeffaf', value: 'transparent' },
  { name: 'Açık Gri', value: '#F4F4F5' },
  { name: 'Krem', value: '#FEFCE8' },
  { name: 'Hafif Yeşil', value: '#F0FDF4' },
];

export default function QrForm({
  currentType,
  formValues,
  onFieldChange,
  styleOptions,
  onStyleChange,
  validationNotices,
}: QrFormProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'colors' | 'logo' | 'settings'>('content');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo görseli en fazla 2MB olabilir.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onStyleChange({
        logoUrl: result,
        errorCorrectionLevel: 'H',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onStyleChange({ logoUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs">
      {/* Clean Segmented Tab Switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 mb-5 text-xs font-medium">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'content'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>İçerik</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'colors'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Renkler</span>
        </button>

        <button
          onClick={() => setActiveTab('logo')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'logo'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Logo</span>
          {styleOptions.logoUrl && <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Ayarlar</span>
        </button>
      </div>

      {/* Validation Notices */}
      {validationNotices.length > 0 && (
        <div className="space-y-2 mb-5">
          {validationNotices.map((notice, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl flex items-start gap-2.5 text-xs ${
                notice.type === 'error'
                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                  : notice.type === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {notice.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
              {notice.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
              {notice.type === 'info' && <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />}
              <span className="flex-1">{notice.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 1: Content Fields */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2.5 mb-3">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
              {currentType.name}
            </h3>
            <p className="text-xs text-zinc-500">{currentType.description}</p>
          </div>

          {currentType.fields.map((field) => {
            const val = formValues[field.name] ?? '';

            if (field.type === 'textarea') {
              return (
                <div key={field.name} className="space-y-1">
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>
                  <textarea
                    rows={3}
                    value={val}
                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-2.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                  />
                  {field.helpText && (
                    <p className="text-[11px] text-zinc-400">{field.helpText}</p>
                  )}
                </div>
              );
            }

            if (field.type === 'select') {
              return (
                <div key={field.name} className="space-y-1">
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>
                  <select
                    value={val}
                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {field.helpText && (
                    <p className="text-[11px] text-zinc-400">{field.helpText}</p>
                  )}
                </div>
              );
            }

            if (field.type === 'checkbox') {
              return (
                <div key={field.name} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id={field.name}
                    checked={Boolean(val)}
                    onChange={(e) => onFieldChange(field.name, e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 dark:text-white border-zinc-300 dark:border-zinc-700 focus:ring-0"
                  />
                  <label
                    htmlFor={field.name}
                    className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer"
                  >
                    {field.label}
                  </label>
                </div>
              );
            }

            return (
              <div key={field.name} className="space-y-1">
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                <input
                  type={field.type}
                  value={val}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full p-2.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                />
                {field.helpText && (
                  <p className="text-[11px] text-zinc-400">{field.helpText}</p>
                )}
              </div>
            );
          })}

          {/* Optional Title input */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              İsteğe Bağlı QR Başlığı
            </label>
            <input
              type="text"
              value={styleOptions.title || ''}
              onChange={(e) => onStyleChange({ title: e.target.value })}
              placeholder="Örn: Masamıza Hoş Geldiniz veya WiFi Bağlan"
              className="w-full p-2.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>
      )}

      {/* TAB 2: Colors */}
      {activeTab === 'colors' && (
        <div className="space-y-5">
          {/* Foreground (QR Dots) Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                QR Rengi (Ön Plan)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styleOptions.fgColor}
                  onChange={(e) => onStyleChange({ fgColor: e.target.value })}
                  className="w-6 h-6 rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-zinc-400">{styleOptions.fgColor}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {FG_COLOR_PRESETS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onStyleChange({ fgColor: color.value })}
                  title={color.name}
                  className={`h-8 rounded-lg border flex items-center justify-center transition-all ${
                    styleOptions.fgColor.toLowerCase() === color.value.toLowerCase()
                      ? 'ring-2 ring-zinc-900 dark:ring-white ring-offset-2 dark:ring-offset-zinc-900'
                      : 'border-zinc-200 dark:border-zinc-700 hover:opacity-90'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Arka Plan Rengi
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styleOptions.bgColor === 'transparent' ? '#FFFFFF' : styleOptions.bgColor}
                  onChange={(e) => onStyleChange({ bgColor: e.target.value })}
                  className="w-6 h-6 rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer p-0 bg-transparent"
                />
                <span className="text-xs font-mono text-zinc-400">
                  {styleOptions.bgColor === 'transparent' ? 'Şeffaf' : styleOptions.bgColor}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {BG_COLOR_PRESETS.map((color) => {
                const isSelected = styleOptions.bgColor === color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => onStyleChange({ bgColor: color.value })}
                    className={`py-1.5 px-2 rounded-lg border text-xs text-center transition-all ${
                      isSelected
                        ? 'border-zinc-900 dark:border-white font-semibold text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900 dark:ring-white'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                    style={{
                      backgroundColor:
                        color.value === 'transparent' ? 'transparent' : color.value,
                    }}
                  >
                    {color.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Logo */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-800 dark:text-zinc-200 mb-1">
              Merkeze Logo Ekle
            </label>
            <p className="text-xs text-zinc-500 mb-3">
              QR kodunuzun ortasına şirket logonuzu veya görsel yerleştirin.
            </p>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
              {styleOptions.logoUrl ? (
                <div className="flex items-center gap-3 w-full">
                  <div className="w-12 h-12 rounded-lg bg-white p-1 border border-zinc-200 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={styleOptions.logoUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Logo Yüklendi
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Hata düzeltme otomatik olarak "H (Maksimum)" seviyesine alındı.
                    </p>
                  </div>
                  <button
                    onClick={handleRemoveLogo}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Logoyu Kaldır"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload-input"
                  />
                  <label
                    htmlFor="logo-upload-input"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Cihazdan Logo Yükle
                  </label>
                  <p className="text-[11px] text-zinc-400 mt-1.5">PNG, JPG veya SVG (Maks. 2MB)</p>
                </div>
              )}
            </div>
          </div>

          {styleOptions.logoUrl && (
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-zinc-800 dark:text-zinc-200 mb-1.5">
                <span>Logo Boyutu</span>
                <span className="font-mono text-zinc-500">%{styleOptions.logoSize || 20}</span>
              </div>
              <input
                type="range"
                min="12"
                max="26"
                step="1"
                value={styleOptions.logoSize || 20}
                onChange={(e) => onStyleChange({ logoSize: Number(e.target.value) })}
                className="w-full accent-zinc-900 dark:accent-white cursor-pointer"
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Hata Düzeltme Seviyesi
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  { level: 'L', label: 'L (%7)' },
                  { level: 'M', label: 'M (%15)' },
                  { level: 'Q', label: 'Q (%25)' },
                  { level: 'H', label: 'H (%30)' },
                ] as const
              ).map((item) => {
                const isSelected = styleOptions.errorCorrectionLevel === item.level;
                return (
                  <button
                    key={item.level}
                    onClick={() =>
                      onStyleChange({ errorCorrectionLevel: item.level as ErrorCorrectionLevel })
                    }
                    className={`py-2 px-2 rounded-lg border text-xs text-center transition-all ${
                      isSelected
                        ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-medium text-zinc-800 dark:text-zinc-200 mb-1.5">
              <span>İndirme Çözünürlüğü</span>
              <span className="font-mono text-zinc-500">{styleOptions.size} x {styleOptions.size} px</span>
            </div>
            <input
              type="range"
              min="256"
              max="2048"
              step="128"
              value={styleOptions.size}
              onChange={(e) => onStyleChange({ size: Number(e.target.value) })}
              className="w-full accent-zinc-900 dark:accent-white cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Kenar Boşluğu (Quiet Zone)
              </div>
              <p className="text-[11px] text-zinc-400">
                Kameraların kodu rahat algılaması için kenar marjı ekler.
              </p>
            </div>
            <input
              type="checkbox"
              checked={styleOptions.includeMargin}
              onChange={(e) => onStyleChange({ includeMargin: e.target.checked })}
              className="w-4 h-4 rounded text-zinc-900 dark:text-white border-zinc-300 dark:border-zinc-700"
            />
          </div>
        </div>
      )}
    </div>
  );
}
