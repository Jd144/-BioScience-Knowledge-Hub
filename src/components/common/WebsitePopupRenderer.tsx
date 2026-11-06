/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Public Website Popup & Announcement Renderer
 * Renders active popups configured by Super Admin via Popup Manager.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';

import { safeFetchJson } from '../../utils/safeApi.ts';

interface PopupButton {
  id: string;
  label: string;
  url: string;
  color: string;
  style: 'solid' | 'outline' | 'ghost';
  openInNewTab: boolean;
  enabled: boolean;
}

interface WebsitePopup {
  id: string;
  title: string;
  message: string;
  imageUrl?: string;
  bgColor: string;
  textColor: string;
  position: 'center_modal' | 'toast_bottom_right' | 'toast_bottom_left' | 'top_banner' | 'bottom_banner';
  size: 'small' | 'medium' | 'large' | 'full';
  borderRadius: 'none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  startDateTime?: string;
  expiryDateTime?: string;
  displayDuration: number;
  frequency: 'once_per_session' | 'once_per_visitor' | 'every_page';
  enabled: boolean;
  showCancelButton: boolean;
  cancelButtonText?: string;
  buttons: PopupButton[];
}

export const WebsitePopupRenderer: React.FC = () => {
  const [activePopup, setActivePopup] = useState<WebsitePopup | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchActivePopups() {
      try {
        const res = await safeFetchJson<WebsitePopup[]>('/api/popups/active');
        if (!res.ok || !res.data) return;
        const popups = res.data;
        if (!isMounted || !popups || popups.length === 0) return;

        // Find the first popup that satisfies frequency constraints
        for (const popup of popups) {
          const sessionKey = `bsh_popup_session_${popup.id}`;
          const visitorKey = `bsh_popup_visitor_${popup.id}`;

          if (popup.frequency === 'once_per_session' && sessionStorage.getItem(sessionKey)) {
            continue;
          }
          if (popup.frequency === 'once_per_visitor' && localStorage.getItem(visitorKey)) {
            continue;
          }

          // This popup can be displayed
          setActivePopup(popup);
          setIsVisible(true);

          // Mark as shown
          if (popup.frequency === 'once_per_session') {
            sessionStorage.setItem(sessionKey, 'true');
          } else if (popup.frequency === 'once_per_visitor') {
            localStorage.setItem(visitorKey, 'true');
          }

          if (popup.displayDuration > 0) {
            setRemainingSeconds(popup.displayDuration);
          }
          break;
        }
      } catch {
        // silent fail for public stability
      }
    }

    fetchActivePopups();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setActivePopup(null);
  }, []);

  // Escape key listener to close modal
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleClose]);

  // Automatic countdown timer
  useEffect(() => {
    if (remainingSeconds === null || remainingSeconds <= 0 || !isVisible) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleClose();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds, isVisible, handleClose]);

  if (!isVisible || !activePopup) return null;

  // Size mapping
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    full: 'max-w-4xl w-full',
  }[activePopup.size] || 'max-w-lg';

  // Border radius mapping
  const radiusClass = {
    none: 'rounded-none',
    'rounded-lg': 'rounded-lg',
    'rounded-xl': 'rounded-xl',
    'rounded-2xl': 'rounded-2xl',
  }[activePopup.borderRadius] || 'rounded-2xl';

  const isModal = activePopup.position === 'center_modal';
  const isTopBanner = activePopup.position === 'top_banner';
  const isBottomBanner = activePopup.position === 'bottom_banner';
  const isToastRight = activePopup.position === 'toast_bottom_right';
  const isToastLeft = activePopup.position === 'toast_bottom_left';

  // Container styling for banners vs modals vs toasts
  let containerWrapper = '';
  if (isModal) {
    containerWrapper = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200';
  } else if (isTopBanner) {
    containerWrapper = 'fixed top-0 left-0 right-0 z-50 p-2 sm:p-3 animate-in slide-in-from-top duration-300';
  } else if (isBottomBanner) {
    containerWrapper = 'fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 animate-in slide-in-from-bottom duration-300';
  } else if (isToastRight) {
    containerWrapper = 'fixed bottom-5 right-5 z-50 max-w-md w-full p-2 animate-in slide-in-from-bottom-5 duration-300';
  } else if (isToastLeft) {
    containerWrapper = 'fixed bottom-5 left-5 z-50 max-w-md w-full p-2 animate-in slide-in-from-bottom-5 duration-300';
  }

  return (
    <div
      className={containerWrapper}
      onClick={(e) => {
        if (isModal && e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="region"
      aria-label="Website Announcement"
    >
      <div
        className={`w-full ${sizeClasses} ${radiusClass} shadow-2xl border border-slate-200/40 relative overflow-hidden transition-all`}
        style={{
          backgroundColor: activePopup.bgColor || '#ffffff',
          color: activePopup.textColor || '#0f172a',
        }}
      >
        {/* Auto-close Progress Bar */}
        {remainingSeconds !== null && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/10">
            <div
              className="h-full bg-cyan-600 transition-all ease-linear"
              style={{
                width: `${(remainingSeconds / (activePopup.displayDuration || 1)) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Close (×) Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-black/10 transition-colors z-10"
          style={{ color: activePopup.textColor || '#0f172a' }}
          aria-label="Close Announcement"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Optional Banner Image */}
        {activePopup.imageUrl && (
          <div className="w-full max-h-48 overflow-hidden bg-slate-100 border-b border-black/5">
            <img
              src={activePopup.imageUrl}
              alt={activePopup.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // hide broken images
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="p-5 sm:p-6 space-y-3">
          {/* Title */}
          <div className="flex items-start justify-between gap-4 pr-6">
            <h3 className="text-base sm:text-lg font-bold leading-snug">
              {activePopup.title}
            </h3>
            {remainingSeconds !== null && (
              <span className="text-[10px] opacity-60 font-mono shrink-0">
                Auto-closes in {remainingSeconds}s
              </span>
            )}
          </div>

          {/* Message (supports basic markdown or paragraphs) */}
          <div className="text-xs sm:text-sm leading-relaxed opacity-90 whitespace-pre-line">
            {activePopup.message}
          </div>

          {/* CTA Buttons & Cancel */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {activePopup.buttons &&
              activePopup.buttons
                .filter((btn) => btn.enabled)
                .map((btn) => {
                  const isExternal = btn.url.startsWith('http://') || btn.url.startsWith('https://');
                  return (
                    <a
                      key={btn.id}
                      href={btn.url}
                      target={btn.openInNewTab ? '_blank' : '_self'}
                      rel={btn.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:opacity-90 active:scale-95"
                      style={{
                        backgroundColor: btn.style === 'solid' ? (btn.color || '#0284c7') : 'transparent',
                        color: btn.style === 'solid' ? '#ffffff' : (btn.color || '#0284c7'),
                        border: btn.style !== 'solid' ? `1.5px solid ${btn.color || '#0284c7'}` : 'none',
                      }}
                    >
                      <span>{btn.label}</span>
                      {isExternal && <ExternalLink className="w-3 h-3 opacity-80" />}
                    </a>
                  );
                })}

            {activePopup.showCancelButton && (
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-2 rounded-xl text-xs font-semibold opacity-70 hover:opacity-100 hover:bg-black/5 transition-colors"
                style={{ color: activePopup.textColor }}
              >
                {activePopup.cancelButtonText || 'Dismiss'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
