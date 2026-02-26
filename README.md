# Together We Are America

A React + Next.js + TypeScript + Tailwind quiz game for identifying flags from countries in North, Central, and South America, including Caribbean nations.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Created Using Codex
```
This project was created using GitHub Copilot (Codex). The following is the prompt that was used to generate the initial project:

I want to build a React, Next.js application that will act as a fun quiz/game. The game will be a quiz testing user's knowledge on identifying flags from all the countries that make up North, Central, and South America. We should also include any Carribean countries that are considered to be part of America.

Game Mechanics:
- The landing page should show the title of the game and the album cover of Bad Bunny's latest album: Debi Tirar Mas Fotos
- When starting the game we should present a flag, multiple choice options, game progression
- Each round should present a flag
- Under the flag should be displayed 4 multiple choice answers. One of which should be the correct answer
- At the top we should show the current round number and how many rounds are left
- Upon selecting the correct answer we should show some type of animation showing that the user is correct. Filling the multiple choice answer with the color green is one idea that we can run with
- Upon selecting the incorrect answer we should fill the multiple choice answer with the color red
- A user can't progress until they have selected the correct answer
- At the end of the game we should present how many correct answers were made on the first attempt
- We should also show the list of countries that were incorrectly guessed

Theme:
- Game should be titled: Together We Are America
- Theme & color pattlet: The color scheme that we are going to use should follow colors found on the following sites; https://shop.debitirarmasfotos.com, https://www.debitirarmasfotos.com

Technical Requirments
- App should be using Tailwind CSS
- We should be using React to create our application
- Components should be created under a components directory to ensure modularity
- Data that will power the questions and answers should be kept in a JSON file. This should contain the list json objects that stores the name and flag for the country being represented.
- We should be using typescript for this project
```