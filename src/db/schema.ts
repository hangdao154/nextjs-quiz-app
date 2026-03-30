import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  passwordHash: text('password_hash'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  coverImage: text('cover_image'),
  isPublic: boolean('is_public').notNull().default(false),
  category: text('category'),
  totalQuestions: integer('total_questions').notNull().default(0),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  quizId: integer('quiz_id')
    .notNull()
    .references(() => quizzes.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  order: integer('order').notNull().default(0),
});

export const options = pgTable('options', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  isCorrect: boolean('is_correct').notNull().default(false),
});

export const decks = pgTable('decks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  totalCards: integer('total_cards').notNull().default(0),
  isPublic: boolean('is_public').notNull().default(false),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

export const flashcards = pgTable('flashcards', {
  id: serial('id').primaryKey(),
  deckId: integer('deck_id')
    .notNull()
    .references(() => decks.id, { onDelete: 'cascade' }),
  front: text('front').notNull(),
  back: text('back'),
  order: integer('order').notNull().default(0),
});

export const userAttempts = pgTable('user_attempts', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  quizId: integer('quiz_id')
    .notNull()
    .references(() => quizzes.id, { onDelete: 'cascade' }),
  score: integer('score').notNull().default(0),
  totalQuestions: integer('total_questions').notNull().default(0),
  maxScore: integer('max_score').notNull().default(100),
  isScheduledForReview: boolean('is_scheduled_for_review')
    .notNull()
    .default(false),
  startedAt: timestamp('started_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
});

export const usersRelations = relations(users, ({ many }) => ({
  attempts: many(userAttempts),
  quizzesCreated: many(quizzes),
  decksCreated: many(decks),
}));

export const quizzesRelations = relations(quizzes, ({ many, one }) => ({
  questions: many(questions),
  attempts: many(userAttempts),
  creator: one(users, {
    fields: [quizzes.createdBy],
    references: [users.id],
  }),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
  options: many(options),
}));

export const optionsRelations = relations(options, ({ one }) => ({
  question: one(questions, {
    fields: [options.questionId],
    references: [questions.id],
  }),
}));

export const decksRelations = relations(decks, ({ one, many }) => ({
  creator: one(users, {
    fields: [decks.createdBy],
    references: [users.id],
  }),
  cards: many(flashcards),
}));

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  deck: one(decks, {
    fields: [flashcards.deckId],
    references: [decks.id],
  }),
}));

export const userAttemptsRelations = relations(userAttempts, ({ one }) => ({
  user: one(users, {
    fields: [userAttempts.userId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [userAttempts.quizId],
    references: [quizzes.id],
  }),
}));
