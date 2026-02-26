import type { ThemeMode } from '@/components/types';

export type OptionStatus = 'idle' | 'correct' | 'incorrect';

type AnswerOptionsProps = {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onSelect: (answer: string) => void;
  isRoundSolved: boolean;
  isInputDisabled: boolean;
  mode: ThemeMode;
};

function getButtonClassesByStatus(mode: ThemeMode): Record<OptionStatus, string> {
  const isVibrantMode = mode !== 'soft';

  return {
    idle: isVibrantMode
      ? 'bg-white/10 hover:bg-white/20 border-white/45 text-white'
      : 'bg-white hover:bg-crema border-cacao/25 text-cacao',
    correct: 'bg-bosque text-white border-bosque animate-pulse',
    incorrect: 'bg-red-600 text-white border-red-700'
  };
}

export function AnswerOptions({
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
  isRoundSolved,
  isInputDisabled,
  mode
}: AnswerOptionsProps) {
  const buttonClassesByStatus = getButtonClassesByStatus(mode);

  return (
    <div className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3 sm:grid-cols-2">
      {options.map((option) => {
        let status: OptionStatus = 'idle';

        if (selectedAnswer === option) {
          status = option === correctAnswer ? 'correct' : 'incorrect';
        }

        if (isRoundSolved && option === correctAnswer) {
          status = 'correct';
        }

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            disabled={isInputDisabled}
            className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-semibold leading-snug transition duration-200 sm:text-base ${buttonClassesByStatus[status]} ${
              isInputDisabled ? 'cursor-not-allowed opacity-95' : ''
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
