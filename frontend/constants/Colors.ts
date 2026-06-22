/**
 * Votosi Design System Colors
 * Dark theme with civic green accent — premium, trustworthy aesthetic.
 */
export const Colors = {
  // Background layers
  background: '#0A0F1C',
  backgroundSecondary: '#111827',
  backgroundTertiary: '#1A2235',
  surface: '#1E293B',
  surfaceElevated: '#243044',

  // Brand accent — civic green
  primary: '#10B981',
  primaryLight: '#34D399',
  primaryDark: '#059669',
  primaryMuted: 'rgba(16, 185, 129, 0.15)',
  primaryGlow: 'rgba(16, 185, 129, 0.3)',

  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0A0F1C',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  errorMuted: 'rgba(239, 68, 68, 0.15)',
  info: '#3B82F6',

  // Borders & Dividers
  border: '#2D3A4F',
  borderLight: '#374357',
  borderFocus: '#10B981',

  // Glassmorphism
  glassBg: 'rgba(30, 41, 59, 0.8)',
  glassStroke: 'rgba(148, 163, 184, 0.1)',

  // Fingerprint accent
  biometric: '#06B6D4',
  biometricMuted: 'rgba(6, 182, 212, 0.15)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
} as const;
