import type { GameMode, ThemeMode } from '@/components/types';

type ResultsScreenProps = {
  mode: ThemeMode;
  gameMode: GameMode;
  correctCount: number;
  roundsPlayed: number;
  totalRounds: number;
  incorrectlyGuessedCountries: string[];
  onRestart: () => void;
};

export function ResultsScreen({
  mode,
  gameMode,
  correctCount,
  roundsPlayed,
  totalRounds,
  incorrectlyGuessedCountries,
  onRestart
}: ResultsScreenProps) {
  const isVibrantMode = mode !== 'soft';

  return (
    <section
      className={`mx-auto w-full max-w-3xl rounded-2xl p-5 shadow-album backdrop-blur sm:rounded-3xl sm:p-8 ${
        isVibrantMode ? 'border border-white/50 bg-black/25 text-white' : 'border border-cacao/20 bg-white/88 text-cacao'
      }`}
    >
      <h2 className="text-2xl font-black uppercase tracking-wide sm:text-3xl">Final Results</h2>
      <p className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg">
        {gameMode === 'easy' ? 'First-attempt correct answers' : 'Correct answers'}: {correctCount} /{' '}
        {gameMode === 'easy' ? totalRounds : roundsPlayed}
      </p>

      <div
        className={`mt-6 rounded-2xl p-4 ${
          isVibrantMode ? 'border border-white/35 bg-white/15' : 'border border-cacao/15 bg-crema/85'
        }`}
      >
        <h3 className="text-sm font-black uppercase tracking-wide">
          {gameMode === 'easy' ? 'Countries Missed On First Attempt' : 'Countries Guessed Incorrectly'}
        </h3>
        {incorrectlyGuessedCountries.length === 0 ? (
          <p className={`mt-2 font-semibold ${isVibrantMode ? 'text-white' : 'text-bosque'}`}>
            Perfect first-attempt run. Nice work.
          </p>
        ) : (
          <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
            {incorrectlyGuessedCountries.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className={`mt-7 w-full rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider transition sm:mt-8 sm:w-auto ${
          isVibrantMode ? 'bg-white text-cacao hover:bg-crema' : 'bg-cacao text-white hover:bg-coral'
        }`}
      >
        Play Again
      </button>
    </section>
  );
}
