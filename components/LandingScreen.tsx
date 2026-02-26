import type { GameMode, ThemeMode } from '@/components/types';

type LandingScreenProps = {
  mode: ThemeMode;
  onStart: (gameMode: GameMode) => void;
};

export function LandingScreen({ mode, onStart }: LandingScreenProps) {
  const isVibrantMode = mode !== 'soft';

  return (
    <section
      className={`mx-auto w-full max-w-4xl rounded-2xl p-4 text-center shadow-album backdrop-blur sm:rounded-3xl sm:p-10 ${
        isVibrantMode ? 'border border-white/50 bg-black/25 text-white' : 'border border-cacao/20 bg-white/88 text-cacao'
      }`}
    >
      <h1 className="text-3xl font-black uppercase tracking-wide sm:text-5xl">
        Together We Are America
      </h1>
      <p className={`mx-auto mt-4 max-w-2xl text-sm font-medium sm:text-base ${isVibrantMode ? 'text-white/90' : 'text-cacao/80'}`}>
        Choose your mode and identify the flags of North, Central, South America, and the Caribbean.
      </p>

      <div className="mx-auto mt-6 max-w-[220px] overflow-hidden rounded-2xl sm:mt-8 sm:max-w-xs sm:rounded-3xl">
        <img
          src="/sapo-concho-world.png"
          alt="Debi Tirar Mas Fotos album cover"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-7 grid w-full gap-3 sm:mt-8 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onStart('easy')}
          className={`w-full rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider transition ${
            isVibrantMode ? 'bg-white text-cacao hover:bg-crema' : 'bg-cacao text-white hover:bg-bosque'
          }`}
        >
          Play Easy
        </button>
        <button
          type="button"
          onClick={() => onStart('hard')}
          className={`w-full rounded-full border px-7 py-3 text-sm font-bold uppercase tracking-wider transition ${
            isVibrantMode
              ? 'border-white/80 bg-transparent text-white hover:bg-white/20'
              : 'border-cacao bg-transparent text-cacao hover:bg-cacao/10'
          }`}
        >
          Play Hard
        </button>
      </div>
    </section>
  );
}
