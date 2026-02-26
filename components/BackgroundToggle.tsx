import type { ThemeMode } from '@/components/types';

type BackgroundOption = {
  mode: ThemeMode;
  label: string;
  value: string;
};

type BackgroundToggleProps = {
  options: BackgroundOption[];
  activeValue: string;
  onChange: (value: string) => void;
  mode: ThemeMode;
};

export function BackgroundToggle({ options, activeValue, onChange, mode }: BackgroundToggleProps) {
  const isVibrantMode = mode !== 'soft';

  return (
    <div
      className={`mx-auto mb-4 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 rounded-2xl p-3 shadow-md backdrop-blur sm:mb-6 ${
        isVibrantMode ? 'border border-white/45 bg-black/20' : 'border border-white/60 bg-white/80'
      }`}
    >
      {options.map((option) => {
        const isActive = activeValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-h-10 rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition sm:px-4 sm:text-xs ${
              isActive
                ? isVibrantMode
                  ? 'border-white bg-white text-cacao'
                  : 'border-cacao bg-cacao text-white'
                : isVibrantMode
                  ? 'border-white/50 bg-white/15 text-white hover:border-white hover:bg-white/25'
                  : 'border-cacao/25 bg-white/90 text-cacao hover:border-cacao/60'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
