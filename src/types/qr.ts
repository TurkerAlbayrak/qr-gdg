export type QrCategory =
  | 'internet'
  | 'social'
  | 'communication'
  | 'personal'
  | 'business'
  | 'other';

export type QrTypeId =
  | 'url'
  | 'whatsapp'
  | 'instagram'
  | 'other_social'
  | 'text'
  | 'phone'
  | 'email'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'geo'
  | 'youtube'
  | 'tiktok'
  | 'facebook'
  | 'linkedin'
  | 'telegram'
  | 'discord'
  | 'event'
  | 'calendar'
  | 'mecard'
  | 'pdf'
  | 'menu'
  | 'payment'
  | 'app'
  | 'maps'
  | 'form'
  | 'product'
  | 'custom';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrTypeDefinition {
  id: QrTypeId;
  name: string;
  category: QrCategory;
  description: string;
  iconName: string;
  badge?: string;
  placeholder?: string;
  fields: QrFieldDefinition[];
  defaultValues: Record<string, string | boolean | number>;
}

export interface QrFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'url' | 'tel' | 'email' | 'textarea' | 'select' | 'password' | 'checkbox' | 'datetime-local' | 'number';
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface QrStyleOptions {
  fgColor: string;
  bgColor: string;
  size: number; // Export resolution in px (e.g. 1024)
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  logoUrl?: string; // base64 or object URL
  logoSize: number; // percentage (12% to 26%)
  includeMargin: boolean;
  title?: string;
  subtitle?: string;
}

export interface QrHistoryItem {
  id: string;
  typeId: QrTypeId;
  typeName: string;
  title: string;
  payload: string;
  summary: string;
  createdAt: number;
  options: QrStyleOptions;
}

export interface PresetColor {
  name: string;
  value: string;
}

export interface ValidationNotice {
  type: 'warning' | 'error' | 'info';
  message: string;
}
