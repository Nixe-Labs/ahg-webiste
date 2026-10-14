/* Line icons, drawn on a 48 grid at a 1.4 stroke so they sit with the Garamond. */
type P = { className?: string };
const S = ({ children, className, vb = "0 0 48 48" }: P & { children: React.ReactNode; vb?: string }) => (
  <svg className={className} viewBox={vb} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export const Arrow = ({ className }: P) => <S className={className} vb="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5" /></S>;
export const ArrowL = ({ className }: P) => <S className={className} vb="0 0 16 16"><path d="M15 8H2M7 3L2 8l5 5" /></S>;
export const Phone = ({ className }: P) => <S className={className} vb="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2" /></S>;
export const Mail = ({ className }: P) => <S className={className} vb="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></S>;
export const Pin = ({ className }: P) => <S className={className} vb="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></S>;
export const WhatsApp = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
);
export const Instagram = ({ className }: P) => <S className={className} vb="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></S>;
export const LinkedIn = ({ className }: P) => <S className={className} vb="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></S>;
export const Quote = ({ className }: P) => (
  <svg className={className} viewBox="0 0 84 60" fill="currentColor" aria-hidden="true"><path d="M0 60V36C0 15 9 3 31 0l3 7C21 11 16 18 16 28h16v32Zm46 0V36c0-21 9-33 31-36l3 7c-13 4-18 11-18 21h16v32Z" /></svg>
);

export const AMENITY_ICONS: Record<string, (p: P) => React.ReactElement> = {
  security: (p) => <S {...p}><path d="M24 5 9 10v12c0 10 6.5 17.5 15 21 8.5-3.5 15-11 15-21V10Z" /><path d="m17 24 5 5 9-10" /></S>,
  wifi: (p) => <S {...p}><path d="M6 19a26 26 0 0 1 36 0M11.5 25a18 18 0 0 1 25 0M17 31a10 10 0 0 1 14 0" /><circle cx="24" cy="37" r="1.6" fill="currentColor" /></S>,
  laundry: (p) => <S {...p}><path d="M24 12a4 4 0 1 1 4 4c-2 0-4 1.5-4 3.5v1.5L6 33a2 2 0 0 0 1 3.5h34A2 2 0 0 0 42 33L24 21" /></S>,
  dining: (p) => <S {...p}><path d="M6 34h36M9 34a15 15 0 0 1 30 0M24 19v-3M20 16h8M5 39h38" /></S>,
  housekeeping: (p) => <S {...p}><path d="M5 36V18M5 30h38v6M43 30v-6a4 4 0 0 0-4-4H20v10" /><circle cx="12.5" cy="24" r="3.5" /><path d="m33 8 1.5 3 3 1.5-3 1.5L33 17l-1.5-3-3-1.5 3-1.5Z" /></S>,
  parking: (p) => <S {...p}><rect x="7" y="7" width="34" height="34" rx="4" /><path d="M19 34V15h7a6 6 0 0 1 0 12h-7" /></S>,
  meetings: (p) => <S {...p}><rect x="11" y="20" width="26" height="9" rx="1" /><path d="M15 29v8M33 29v8" /><circle cx="15" cy="12" r="3" /><circle cx="24" cy="10" r="3" /><circle cx="33" cy="12" r="3" /></S>,
  breakfast: (p) => <S {...p}><path d="M9 20h26v8a11 11 0 0 1-11 11h-4A11 11 0 0 1 9 28Z" /><path d="M35 23h2a5 5 0 0 1 0 10h-3.5M17 8c-2 2.5 2 3.5 0 6M24 8c-2 2.5 2 3.5 0 6M6 43h32" /></S>,
};
