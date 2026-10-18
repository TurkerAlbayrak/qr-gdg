'use client';

import React, { useState } from 'react';
import {
  Globe,
  MessageCircle,
  Share2,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Wifi,
  Contact,
  Navigation,
  PlaySquare,
  Video,
  Send,
  Headphones,
  Calendar,
  Clock,
  UserCheck,
  FileCheck,
  Utensils,
  CreditCard,
  Smartphone,
  MapPin,
  ClipboardList,
  ShoppingBag,
  Code,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './BrandIcons';
import { QrTypeDefinition, QrTypeId } from '@/types/qr';

interface TypeSelectorProps {
  types: QrTypeDefinition[];
  selectedTypeId: QrTypeId;
  onSelectType: (type: QrTypeDefinition) => void;
}

const ICON_MAP: Record<string, any> = {
  Globe,
  MessageCircle,
  Instagram: InstagramIcon,
  Share2,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Wifi,
  Contact,
  Navigation,
  PlaySquare,
  Video,
  Facebook: FacebookIcon,
  Linkedin: LinkedinIcon,
  Send,
  Headphones,
  Calendar,
  Clock,
  UserCheck,
  FileCheck,
  Utensils,
  CreditCard,
  Smartphone,
  MapPin,
  ClipboardList,
  ShoppingBag,
  Code,
};

export default function TypeSelector({
  types,
  selectedTypeId,
  onSelectType,
}: TypeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (types.length === 0) {
    return (
      <div className="text-center py-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-500">Aramanızla eşleşen bir QR kod türü bulunamadı.</p>
      </div>
    );
  }

  // If there are many types and not searching, show top 8 with clean "Daha Fazla Göster" toggle on mobile
  const visibleTypes = isExpanded || types.length <= 8 ? types : types.slice(0, 8);

  return (
    <div id="qr-types-section" className="mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {visibleTypes.map((type) => {
          const isSelected = selectedTypeId === type.id;
          const IconComponent = ICON_MAP[type.iconName] || Globe;

          return (
            <button
              key={type.id}
              onClick={() => onSelectType(type)}
              className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-white/15 dark:bg-zinc-900/15 text-white dark:text-zinc-950'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold truncate leading-tight">{type.name}</div>
              </div>

              {isSelected && <Check className="w-3.5 h-3.5 shrink-0 opacity-80" />}
            </button>
          );
        })}
      </div>

      {types.length > 8 && (
        <div className="text-center mt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <span>{isExpanded ? 'Daha Az Göster' : `Tüm Türleri Göster (${types.length})`}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
