CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" text NOT NULL UNIQUE,
  "name" text,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "quizzes" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS "questions" (
  "id" serial PRIMARY KEY,
  "quiz_id" integer NOT NULL REFERENCES "quizzes"("id") ON DELETE CASCADE,
  "text" text NOT NULL,
  "order" integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "options" (
  "id" serial PRIMARY KEY,
  "question_id" integer NOT NULL REFERENCES "questions"("id") ON DELETE CASCADE,
  "text" text NOT NULL,
  "is_correct" boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "user_attempts" (
  "id" serial PRIMARY KEY,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "quiz_id" integer NOT NULL REFERENCES "quizzes"("id") ON DELETE CASCADE,
  "score" integer NOT NULL DEFAULT 0,
  "total_questions" integer NOT NULL DEFAULT 0,
  "started_at" timestamptz NOT NULL DEFAULT now(),
  "completed_at" timestamptz
);

