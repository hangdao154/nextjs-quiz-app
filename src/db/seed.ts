import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
// Added quizzes, questions, and options to your imports
import {
  users,
  decks,
  flashcards,
  quizzes,
  questions,
  options,
} from './schema';

// Load environment variables
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env.local');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// Realistic dummy categories for the generated data
const dummyTopics = [
  {
    title: 'React.js Architecture & Hooks',
    description:
      'Advanced concepts, performance, and state management in React.',
    category: 'React.js',
    cards: [
      {
        front: 'What does useMemo do?',
        back: 'Caches the result of a calculation between renders.',
      },
      {
        front: 'What is the virtual DOM?',
        back: 'A lightweight JavaScript representation of the actual DOM.',
      },
    ],
  },
  {
    title: 'Next.js 15 App Router',
    description: 'Server components, actions, and routing mechanics.',
    category: 'Next.js',
    cards: [
      {
        front: 'What is a Server Action?',
        back: 'An asynchronous function executed on the server, often used for form submissions.',
      },
      {
        front: 'Difference between page.tsx and layout.tsx?',
        back: 'Pages are unique UI for a route; layouts are shared UI across multiple routes.',
      },
    ],
  },
  {
    title: 'Literary Theory: Philip Roth',
    description: 'Thematic analysis of Postmodern American Fiction.',
    category: 'Literary Theory',
    cards: [
      {
        front: "What is the central theme of 'American Pastoral'?",
        back: 'The collapse of the American Dream and the illusion of control.',
      },
      {
        front: "Who is Roth's frequent fictional alter ego?",
        back: 'Nathan Zuckerman.',
      },
    ],
  },
  {
    title: 'Contemporary Vietnamese Lit: Dương Thụy',
    description: 'Exploring cultural collisions and modern romance.',
    category: 'Contemporary Vietnamese Literature',
    cards: [
      {
        front: "What is the core conflict in 'Oxford Thương Yêu'?",
        back: 'The intersection of traditional cultural expectations and modern, international youth experiences.',
      },
      {
        front: "Common setting motif in Dương Thụy's works?",
        back: 'European academic or professional environments contrasting with Vietnamese identity.',
      },
    ],
  },
];

async function main() {
  // eslint-disable-next-line no-console
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Fetch at least one user to assign as the creator of these decks/quizzes.
    const existingUsers = await db.select().from(users).limit(1);

    if (existingUsers.length === 0) {
      throw new Error(
        'No users found in the database. Please register a user first!'
      );
    }

    const creatorId = existingUsers[0].id;

    // Counters for our log output
    let totalDecks = 0;
    let totalFlashcards = 0;
    let totalQuizzes = 0;
    let totalQuestions = 0;

    // ------------------------------------------------------------------
    // 2. SEED DECKS & FLASHCARDS
    // ------------------------------------------------------------------
    // eslint-disable-next-line no-console
    console.log('📚 Generating Decks and Flashcards...');

    for (let i = 0; i < 10; i++) {
      const topic = dummyTopics[i % dummyTopics.length];

      // Insert Deck
      const [insertedDeck] = await db
        .insert(decks)
        .values({
          title: `${topic.title} (Part ${Math.floor(i / 4) + 1})`,
          description: topic.description,
          createdBy: creatorId,
          category: topic.category,
          isActive: true,
          isPublic: true,
          totalCards: 10, // Hardcoded since we generate 10 below
        })
        .returning({ id: decks.id });

      totalDecks++;

      // Generate 10 flashcards per deck
      const cardsToInsert = [];
      for (let j = 0; j < 10; j++) {
        const specificCard = topic.cards[j];

        cardsToInsert.push({
          deckId: insertedDeck.id,
          front: specificCard
            ? specificCard.front
            : `Concept Question #${j + 1} for ${topic.title}`,
          back: specificCard
            ? specificCard.back
            : `Detailed explanation and definition for concept #${j + 1}.`,
        });
      }

      await db.insert(flashcards).values(cardsToInsert);
      totalFlashcards += cardsToInsert.length;
    }

    // ------------------------------------------------------------------
    // 3. SEED QUIZZES, QUESTIONS, AND OPTIONS
    // ------------------------------------------------------------------
    // eslint-disable-next-line no-console
    console.log('📝 Generating Quizzes and Multiple Choice Questions...');

    for (let i = 0; i < 10; i++) {
      const topic = dummyTopics[i % dummyTopics.length];

      // Insert Quiz
      const [insertedQuiz] = await db
        .insert(quizzes)
        .values({
          title: `${topic.title} Master Quiz ${i + 1}`,
          description: `Test your knowledge on ${topic.description}`,
          createdBy: creatorId,
          category: topic.category,
          totalQuestions: 5,
          coverImage: `https://via.placeholder.com/150`,
          isActive: true,
          isPublic: true,
        })
        .returning({ id: quizzes.id });

      totalQuizzes++;

      // Generate 5 Questions for this quiz
      for (let j = 0; j < 5; j++) {
        const specificCard = topic.cards[j];

        // Insert Question
        const [insertedQuestion] = await db
          .insert(questions)
          .values({
            quizId: insertedQuiz.id,
            text: specificCard
              ? specificCard.front
              : `Which of the following best describes concept #${j + 1} of ${topic.category}?`,
          })
          .returning({ id: questions.id });

        totalQuestions++;

        // Insert Options (4 options per question, 1 correct)
        const optionsToInsert = [
          {
            questionId: insertedQuestion.id,
            text: specificCard
              ? specificCard.back
              : `Correct definition for concept #${j + 1}.`,
            isCorrect: true,
          },
          {
            questionId: insertedQuestion.id,
            text: `Incorrect distractor A for question #${j + 1}.`,
            isCorrect: false,
          },
          {
            questionId: insertedQuestion.id,
            text: `Incorrect distractor B for question #${j + 1}.`,
            isCorrect: false,
          },
          {
            questionId: insertedQuestion.id,
            text: `Incorrect distractor C for question #${j + 1}.`,
            isCorrect: false,
          },
        ];

        // Shuffle the options so the correct answer isn't always the first one in the DB
        // (though your frontend should ideally shuffle them too)
        const shuffledOptions = optionsToInsert.sort(() => 0.5 - Math.random());

        await db.insert(options).values(shuffledOptions);
      }
    }

    // eslint-disable-next-line no-console
    console.log(
      `✅ Seeding complete!\n` +
        `   - Decks generated: ${totalDecks}\n` +
        `   - Flashcards generated: ${totalFlashcards}\n` +
        `   - Quizzes generated: ${totalQuizzes}\n` +
        `   - Multiple-choice questions generated: ${totalQuestions} (with 4 options each)`
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

main();
