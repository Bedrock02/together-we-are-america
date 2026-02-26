'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import countryData from '@/data/countries.json';
import { AnswerOptions } from '@/components/AnswerOptions';
import { FlagCard } from '@/components/FlagCard';
import { QuizProgress } from '@/components/QuizProgress';
import { ResultsScreen } from '@/components/ResultsScreen';
import type { CountryFlag, GameMode, ThemeMode } from '@/components/types';

const allCountries = countryData as CountryFlag[];
const HARD_MODE_LIVES = 3;
const HARD_MODE_DELAY_MS = 550;

function shuffle<T>(items: T[]): T[] {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function buildRoundOptions(currentCountry: CountryFlag, countries: CountryFlag[]): string[] {
  const wrongChoices = shuffle(countries.filter((country) => country.name !== currentCountry.name))
    .slice(0, 3)
    .map((country) => country.name);

  return shuffle([currentCountry.name, ...wrongChoices]);
}

type QuizGameProps = {
  mode: ThemeMode;
  gameMode: GameMode;
};

export function QuizGame({ mode, gameMode }: QuizGameProps) {
  const isVibrantMode = mode !== 'soft';
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [roundOrder, setRoundOrder] = useState<CountryFlag[]>(() => shuffle(allCountries));
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRoundSolved, setIsRoundSolved] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectlyGuessedCountries, setIncorrectlyGuessedCountries] = useState<string[]>([]);
  const [hasMissedCurrentRound, setHasMissedCurrentRound] = useState(false);
  const [livesRemaining, setLivesRemaining] = useState<number | null>(gameMode === 'hard' ? HARD_MODE_LIVES : null);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHardGameOver, setIsHardGameOver] = useState(false);

  const totalRounds = roundOrder.length;
  const currentCountry = roundOrder[roundIndex];

  const answerOptions = useMemo(() => {
    if (!currentCountry) {
      return [];
    }

    return buildRoundOptions(currentCountry, roundOrder);
  }, [currentCountry, roundOrder]);

  const isGameFinished = gameMode === 'easy' ? roundIndex >= totalRounds : isHardGameOver || roundIndex >= totalRounds;

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [gameMode]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clearRoundState = () => {
    setSelectedAnswer(null);
    setIsRoundSolved(false);
    setHasMissedCurrentRound(false);
    setIsTransitioning(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (!currentCountry || isTransitioning || (gameMode === 'easy' && isRoundSolved)) {
      return;
    }

    const isCorrect = answer === currentCountry.name;
    setSelectedAnswer(answer);

    if (gameMode === 'hard') {
      setRoundsPlayed((count) => count + 1);
      setIsTransitioning(true);

      if (isCorrect) {
        setCorrectCount((count) => count + 1);
      } else {
        const nextLives = Math.max((livesRemaining ?? HARD_MODE_LIVES) - 1, 0);
        setLivesRemaining(nextLives);
        setIncorrectlyGuessedCountries((previous) => [...previous, currentCountry.name]);

        if (nextLives === 0) {
          timeoutRef.current = setTimeout(() => {
            setIsHardGameOver(true);
            setIsTransitioning(false);
          }, HARD_MODE_DELAY_MS);
          return;
        }
      }

      timeoutRef.current = setTimeout(() => {
        if (roundIndex >= totalRounds - 1) {
          setRoundIndex(totalRounds);
          setIsHardGameOver(true);
          clearRoundState();
          return;
        }

        setRoundIndex((index) => index + 1);
        clearRoundState();
      }, HARD_MODE_DELAY_MS);

      return;
    }

    if (isCorrect) {
      setIsRoundSolved(true);

      if (!hasMissedCurrentRound) {
        setCorrectCount((count) => count + 1);
      }
    } else {
      setHasMissedCurrentRound(true);
      setIncorrectlyGuessedCountries((previous) => {
        if (previous.includes(currentCountry.name)) {
          return previous;
        }

        return [...previous, currentCountry.name];
      });
    }
  };

  const handleNextRound = () => {
    if (gameMode !== 'easy' || !isRoundSolved) {
      return;
    }

    setRoundIndex((index) => index + 1);
    clearRoundState();
  };

  const handleRestart = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setRoundOrder(shuffle(allCountries));
    setRoundIndex(0);
    setCorrectCount(0);
    setIncorrectlyGuessedCountries([]);
    setLivesRemaining(gameMode === 'hard' ? HARD_MODE_LIVES : null);
    setRoundsPlayed(0);
    setIsHardGameOver(false);
    clearRoundState();
  };

  if (isGameFinished) {
    return (
      <ResultsScreen
        mode={mode}
        gameMode={gameMode}
        correctCount={correctCount}
        roundsPlayed={gameMode === 'hard' ? roundsPlayed : totalRounds}
        totalRounds={totalRounds}
        incorrectlyGuessedCountries={incorrectlyGuessedCountries}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <section
      className={`mx-auto w-full max-w-3xl rounded-2xl p-4 shadow-album backdrop-blur sm:rounded-3xl sm:p-8 ${
        isVibrantMode ? 'border border-white/50 bg-black/25 text-white' : 'border border-cacao/20 bg-white/88 text-cacao'
      }`}
    >
      <QuizProgress
        round={roundIndex + 1}
        totalRounds={totalRounds}
        mode={mode}
        gameMode={gameMode}
        livesRemaining={livesRemaining}
      />

      <FlagCard flag={currentCountry.flag} mode={mode} />

      <AnswerOptions
        options={answerOptions}
        selectedAnswer={selectedAnswer}
        correctAnswer={currentCountry.name}
        onSelect={handleAnswerSelect}
        isRoundSolved={isRoundSolved || (gameMode === 'hard' && selectedAnswer === currentCountry.name)}
        isInputDisabled={gameMode === 'easy' ? isRoundSolved : isTransitioning}
        mode={mode}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className={`text-center text-sm font-semibold sm:text-left ${isVibrantMode ? 'text-white/90' : 'text-cacao/80'}`}>
          {gameMode === 'easy'
            ? isRoundSolved
              ? 'Correct. Continue to the next round.'
              : 'Select the country that matches the flag.'
            : isTransitioning
              ? selectedAnswer === currentCountry.name
                ? 'Correct. Loading next flag...'
                : 'Wrong. Loading next flag...'
              : 'Hard mode: one guess per flag. Wrong answers cost a life.'}
        </p>

        {gameMode === 'easy' ? (
          <button
            type="button"
            onClick={handleNextRound}
            disabled={!isRoundSolved}
            className={`w-full rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition disabled:cursor-not-allowed sm:w-auto ${
              isVibrantMode
                ? 'bg-white text-cacao hover:bg-crema disabled:bg-white/40 disabled:text-white'
                : 'bg-cacao text-white hover:bg-bosque disabled:bg-cacao/40'
            }`}
          >
            {roundIndex === totalRounds - 1 ? 'Finish' : 'Next'}
          </button>
        ) : null}
      </div>
    </section>
  );
}
