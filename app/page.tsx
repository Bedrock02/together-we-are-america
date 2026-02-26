'use client';

import { useState } from 'react';
import { BackgroundToggle } from '@/components/BackgroundToggle';
import { LandingScreen } from '@/components/LandingScreen';
import { QuizGame } from '@/components/QuizGame';
import type { GameMode, ThemeMode } from '@/components/types';

const backgroundOptions = [
  { mode: 'sky' as ThemeMode, label: 'Azul', value: 'rgb(64, 144, 196)' },
  { mode: 'red' as ThemeMode, label: 'Rojo Rubi', value: 'rgb(218, 0, 1)' },
  { mode: 'soft' as ThemeMode, label: 'Blanco Opaco', value: 'rgb(247, 242, 233)' }
];

export default function Home() {
  const [activeGameMode, setActiveGameMode] = useState<GameMode | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(backgroundOptions[0].value);
  const activeTheme = backgroundOptions.find((option) => option.value === backgroundColor)?.mode ?? 'sky';

  return (
    <main
      className={`relative flex min-h-screen items-center justify-center px-3 py-4 transition-colors sm:px-4 sm:py-8 ${activeTheme === 'soft' ? 'text-cacao' : 'text-white'}`}
      style={{
        backgroundColor
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-3 z-10 px-3 sm:top-5 sm:px-4">
        <div className="pointer-events-auto mx-auto w-full max-w-4xl">
          <BackgroundToggle
            options={backgroundOptions}
            activeValue={backgroundColor}
            onChange={setBackgroundColor}
            mode={activeTheme}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        {activeGameMode ? (
          <QuizGame mode={activeTheme} gameMode={activeGameMode} />
        ) : (
          <LandingScreen mode={activeTheme} onStart={setActiveGameMode} />
        )}
      </div>
    </main>
  );
}
