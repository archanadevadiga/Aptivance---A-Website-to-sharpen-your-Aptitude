import React, { useState } from 'react';
import { SITLogo, NAACLogo, IICLogo } from './InstitutionalLogos';
import { Logo } from './Logo';
import { Upload, RotateCcw, X, Check, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({ isOpen, onClose }) => {
  const [, setTick] = useState(0);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleFileUpload = (key: string, file: File, label: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        localStorage.setItem(key, result);
        if (key === 'aptivance_custom_logo' || key === 'optivance_custom_logo') {
          localStorage.setItem('attached_logo_raw', result);
          localStorage.setItem('aptivance_custom_logo', result);
          localStorage.setItem('optivance_custom_logo', result);
        }
        setTick((prev) => prev + 1);
        window.dispatchEvent(new Event('logo_updated'));
        window.dispatchEvent(new Event('storage'));
        showSuccess(`${label} updated successfully!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGlobalAttach = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        localStorage.setItem('attached_logo_raw', result);
        localStorage.setItem('aptivance_custom_logo', result);
        localStorage.setItem('optivance_custom_logo', result);
        setTick((prev) => prev + 1);
        window.dispatchEvent(new Event('logo_updated'));
        window.dispatchEvent(new Event('storage'));
        showSuccess('APTIVANCE Logo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (key: string, label: string) => {
    localStorage.removeItem(key);
    if (key === 'aptivance_custom_logo' || key === 'optivance_custom_logo') {
      localStorage.removeItem('attached_logo_raw');
      localStorage.removeItem('aptivance_custom_logo');
      localStorage.removeItem('optivance_custom_logo');
    }
    setTick((prev) => prev + 1);
    window.dispatchEvent(new Event('logo_updated'));
    window.dispatchEvent(new Event('storage'));
    showSuccess(`${label} restored to default official asset.`);
  };

  const logoConfigs = [
    {
      id: 'aptivance',
      storageKey: 'aptivance_custom_logo',
      title: 'APTIVANCE Platform Logo (Logo.jpeg)',
      subtitle: 'Primary brand logo displayed in the header, navbar, and footer',
      renderPreview: () => <Logo size="lg" showTagline={false} />,
    },
    {
      id: 'sit',
      storageKey: 'sit_custom_logo',
      title: 'Srinivas Institute of Technology (SIT)',
      subtitle: 'A. Shama Rao Foundation, Valachil, Mangaluru',
      renderPreview: () => <SITLogo size="lg" />,
    },
    {
      id: 'naac',
      storageKey: 'naac_custom_logo',
      title: 'NAAC Official Logo',
      subtitle: 'National Assessment and Accreditation Council (Clean, No Grade A)',
      renderPreview: () => <NAACLogo size="lg" />,
    },
    {
      id: 'iic',
      storageKey: 'iic_custom_logo',
      title: 'IIC (Ministry of Education) Logo',
      subtitle: "Institution's Innovation Council, Govt. of India (Clean, No Stars)",
      renderPreview: () => <IICLogo size="lg" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0c0e14] border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Self-Service Logo Customization</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
            Yes, You Can Update The Logo Yourself!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            You have full control to change any logo on the website. Upload your image file (<code className="text-amber-300 font-mono">.jpeg</code>, <code className="text-amber-300 font-mono">.png</code>, <code className="text-amber-300 font-mono">.svg</code>, or <code className="text-amber-300 font-mono">.webp</code>) below. Changes apply instantly across the entire website and are saved in your browser.
          </p>
        </div>

        {/* Success toast notice */}
        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Primary Dropzone for Logo.jpeg */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActiveId('primary');
          }}
          onDragLeave={() => setDragActiveId(null)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActiveId(null);
            const file = e.dataTransfer.files?.[0];
            if (file) handleGlobalAttach(file);
          }}
          className={`mb-6 p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
            dragActiveId === 'primary'
              ? 'bg-amber-500/20 border-amber-400 border-dashed scale-[1.01]'
              : 'bg-amber-500/10 border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Quick Update APTIVANCE Logo</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  Logo.jpeg
                </span>
              </div>
              <div className="text-xs text-zinc-300 mt-0.5">
                Drag and drop your file here, or click to select from your device
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-md flex-shrink-0 hover:scale-105">
            <Upload className="w-4 h-4" />
            <span>Choose File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleGlobalAttach(file);
              }}
            />
          </label>
        </div>

        {/* All 4 Individual Logos Cards */}
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            All Website Logos (Click Upload or Reset on any item)
          </div>

          {logoConfigs.map((item) => {
            const hasCustom = Boolean(localStorage.getItem(item.storageKey));
            const isDragging = dragActiveId === item.id;

            return (
              <div
                key={item.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActiveId(item.id);
                }}
                onDragLeave={() => setDragActiveId(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActiveId(null);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(item.storageKey, file, item.title);
                }}
                className={`p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isDragging
                    ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Preview and Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800/90 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                    {item.renderPreview()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                      <span>{item.title}</span>
                      {hasCustom && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Custom Logo Active
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</p>
                  </div>
                </div>

                {/* Upload & Reset Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-amber-500 text-zinc-300 hover:text-zinc-950 border border-zinc-700/80 hover:border-amber-400 text-xs font-semibold transition-all cursor-pointer shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(item.storageKey, file, item.title);
                      }}
                    />
                  </label>

                  {hasCustom && (
                    <button
                      onClick={() => handleReset(item.storageKey, item.title)}
                      className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-800 text-xs transition-colors"
                      title="Reset to default official insignia"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works Guide */}
        <div className="mt-6 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 space-y-1.5">
          <div className="font-semibold text-zinc-300">How logo updates work:</div>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            <li>Files you select or drag-and-drop are stored securely in your browser's local storage.</li>
            <li>All header banners, navigation bars, cards, and footers update immediately.</li>
            <li>You can click <strong className="text-zinc-300">Reset</strong> at any time to return to the original default image.</li>
          </ul>
        </div>

        {/* Bottom Done Action */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between">
          <span className="text-xs text-zinc-500">Live preview active</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Apply &amp; Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
