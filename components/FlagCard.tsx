import type { ThemeMode } from '@/components/types';

type FlagCardProps = {
  flag: string;
  mode: ThemeMode;
};

export function FlagCard({ flag, mode }: FlagCardProps) {
  const isVibrantMode = mode !== 'soft';

  return (
    <div
      className={`mx-auto flex h-36 w-full max-w-md items-center justify-center rounded-2xl border-4 shadow-album backdrop-blur sm:h-44 ${
        isVibrantMode ? 'border-white/60 bg-white/90' : 'border-cacao/20 bg-white'
      }`}
    >
      <span className="text-7xl leading-none sm:text-9xl" role="img" aria-label="country flag">
        {flag}
      </span>
    </div>
  );
}
