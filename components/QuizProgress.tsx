import type { GameMode, ThemeMode } from '@/components/types';

type QuizProgressProps = {
  round: number;
  totalRounds: number;
  mode: ThemeMode;
  gameMode: GameMode;
  livesRemaining: number | null;
};

export function QuizProgress({ round, totalRounds, mode, gameMode, livesRemaining }: QuizProgressProps) {
  const isVibrantMode = mode !== 'soft';
  const roundsLeft = Math.max(totalRounds - round, 0);

  return (
    <div
      className={`mb-5 flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-3 text-xs font-semibold shadow-md sm:flex-row sm:justify-between sm:text-sm ${
        isVibrantMode ? 'border border-white/40 bg-white/15 text-white' : 'border border-cacao/20 bg-white/90 text-cacao'
      }`}
    >
      <p>
        Round {round} of {totalRounds}
      </p>
      <p>{roundsLeft} rounds left</p>
      <p>{gameMode === 'easy' ? 'Mode: Easy' : `Mode: Hard | Lives: ${livesRemaining ?? 0}`}</p>
    </div>
  );
}
