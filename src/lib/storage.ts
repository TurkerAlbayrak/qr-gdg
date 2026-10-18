import { QrHistoryItem } from '@/types/qr';

const HISTORY_STORAGE_KEY = 'qrgdg_history_v1';
const THEME_STORAGE_KEY = 'qrgdg_theme';

export function getStoredHistory(): QrHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}

export function saveHistoryItem(item: QrHistoryItem): QrHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredHistory();
    const filtered = current.filter(
      (h) => !(h.typeId === item.typeId && h.payload === item.payload)
    );
    const updated = [item, ...filtered].slice(0, 20);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save history:', err);
    return [];
  }
}

export function deleteHistoryItem(id: string): QrHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredHistory();
    const updated = current.filter((h) => h.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete history item:', err);
    return [];
  }
}

export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}

export function getStoredTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system';
  const val = localStorage.getItem(THEME_STORAGE_KEY);
  if (val === 'light' || val === 'dark') return val;
  return 'system';
}

export function setStoredTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
