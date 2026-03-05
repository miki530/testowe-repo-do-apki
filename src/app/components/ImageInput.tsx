import { useRef, useState } from 'react';
import { Camera, Image as GalleryIcon, Link2, X, Upload, RefreshCw } from 'lucide-react';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
}

type Mode = 'camera' | 'gallery' | 'link';

async function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('canvas')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageInput({ value, onChange }: ImageInputProps) {
  const [mode, setMode] = useState<Mode>('camera');
  const [urlInput, setUrlInput] = useState(value?.startsWith('http') ? value : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const hasImage = Boolean(value);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Plik musi być obrazem');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } catch {
      setError('Nie udało się wczytać zdjęcia');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlConfirm = () => {
    if (!urlInput.trim()) { setError('Wklej adres URL'); return; }
    try { new URL(urlInput.trim()); }
    catch { setError('Nieprawidłowy adres URL'); return; }
    setError('');
    onChange(urlInput.trim());
  };

  const clearImage = () => {
    onChange('');
    setUrlInput('');
    setError('');
    if (cameraRef.current) cameraRef.current.value = '';
    if (galleryRef.current) galleryRef.current.value = '';
  };

  const tabs: { key: Mode; label: string; icon: React.ReactNode }[] = [
    { key: 'camera', label: 'Kamera', icon: <Camera className="w-4 h-4" /> },
    { key: 'gallery', label: 'Galeria', icon: <GalleryIcon className="w-4 h-4" /> },
    { key: 'link', label: 'Link', icon: <Link2 className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Preview */}
      {hasImage && (
        <div className="relative mb-3 rounded-2xl overflow-hidden" style={{ height: '200px' }}>
          <img
            src={value}
            alt="Podgląd"
            className="w-full h-full object-cover"
            onError={() => { setError('Nie można załadować obrazu'); onChange(''); }}
          />
          <div className="absolute inset-0 flex items-end p-3 gap-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }}>
            <button
              type="button"
              onClick={clearImage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white"
              style={{ background: 'rgba(220,38,38,0.85)', backdropFilter: 'blur(4px)' }}
            >
              <X className="w-3.5 h-3.5" />
              Usuń zdjęcie
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                if (mode === 'camera') setTimeout(() => cameraRef.current?.click(), 100);
                if (mode === 'gallery') setTimeout(() => galleryRef.current?.click(), 100);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Zmień
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      {!hasImage && (
        <div className="rounded-2xl border border-orange-100 overflow-hidden bg-white">
          {/* Tab bar */}
          <div className="flex border-b border-orange-100">
            {tabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => { setMode(tab.key); setError(''); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm transition-all"
                style={{
                  background: mode === tab.key ? '#fff0e6' : '#fafafa',
                  color: mode === tab.key ? '#ea580c' : '#9e7b6b',
                  borderBottom: mode === tab.key ? '2px solid #ea580c' : '2px solid transparent',
                  fontWeight: mode === tab.key ? 600 : 400,
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Camera */}
            {mode === 'camera' && (
              <div className="flex flex-col items-center gap-3 py-2">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-center" style={{ color: '#9e7b6b' }}>
                  Zrób zdjęcie aparatem urządzenia
                </p>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => cameraRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                >
                  <Camera className="w-4 h-4" />
                  {loading ? 'Ładowanie…' : 'Otwórz aparat'}
                </button>
                <input
                  ref={cameraRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
              </div>
            )}

            {/* Gallery */}
            {mode === 'gallery' && (
              <div
                className="flex flex-col items-center gap-3 py-2 cursor-pointer"
                onClick={() => galleryRef.current?.click()}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: '#fef3e2' }}
                >
                  <GalleryIcon className="w-8 h-8" style={{ color: '#f97316' }} />
                </div>
                <p className="text-sm text-center" style={{ color: '#9e7b6b' }}>
                  Wybierz zdjęcie z galerii lub plików
                </p>
                <div
                  className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 transition-all hover:border-orange-300 hover:bg-orange-50"
                  style={{ borderColor: '#fed7aa' }}
                >
                  <Upload className="w-6 h-6" style={{ color: '#fdba74' }} />
                  <span className="text-sm" style={{ color: '#c2410c' }}>Kliknij lub upuść plik tutaj</span>
                  <span className="text-xs" style={{ color: '#9e7b6b' }}>JPG, PNG, WEBP</span>
                </div>
                <input
                  ref={galleryRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
              </div>
            )}

            {/* URL / Link */}
            {mode === 'link' && (
              <div className="flex flex-col gap-3 py-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#fef3e2' }}>
                  <Link2 className="w-4 h-4 shrink-0" style={{ color: '#f97316' }} />
                  <span className="text-xs" style={{ color: '#9e7b6b' }}>Wklej adres URL zdjęcia z internetu</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={e => { setUrlInput(e.target.value); setError(''); }}
                    placeholder="https://przyklad.pl/zdjecie.jpg"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-orange-100 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white"
                    style={{ color: '#1c0a00' }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleUrlConfirm(); } }}
                  />
                  <button
                    type="button"
                    onClick={handleUrlConfirm}
                    className="px-4 py-2 rounded-xl text-sm text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                  >
                    Dodaj
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs mt-2 text-center" style={{ color: '#dc2626' }}>{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
