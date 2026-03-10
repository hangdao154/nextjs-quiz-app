'use client';

import { useEffect, useMemo, useState } from 'react';

import type { options, questions, quizzes } from '@/db/schema';

type QuizWithQuestions = {
  id: typeof quizzes.$inferSelect.id;
  title: typeof quizzes.$inferSelect.title;
  description: typeof quizzes.$inferSelect.description;
  questions: (typeof questions.$inferSelect & {
    options: (typeof options.$inferSelect)[];
  })[];
};

type QuizClientProps = {
  quiz: QuizWithQuestions;
  attemptId: number | null;
};

const QUESTION_TIME_SECONDS = 30;

export function QuizClient({ quiz, attemptId }: QuizClientProps) {
  const totalQuestions = quiz.questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: number; optionId: number | null; correct: boolean }[]
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];

  useEffect(() => {
    if (isFinished) return;

    setTimeLeft(QUESTION_TIME_SECONDS);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isFinished]);

  const handleTimeout = () => {
    if (isAnswered || isFinished) return;
    registerAnswer(null, false);
  };

  const handleOptionClick = (optionId: number, isCorrect: boolean) => {
    if (isAnswered || isFinished) return;
    setSelectedOptionId(optionId);
    registerAnswer(optionId, isCorrect);
  };

  const registerAnswer = (optionId: number | null, correct: boolean) => {
    setIsAnswered(true);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, optionId, correct },
    ]);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOptionId(null);
    setIsAnswered(false);
  };

  const progressPercent = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return ((currentIndex + (isFinished ? 1 : 0)) / totalQuestions) * 100;
  }, [currentIndex, isFinished, totalQuestions]);

  if (totalQuestions === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This quiz has no questions yet.
      </p>
    );
  }

  if (isFinished) {
    const percentage = totalQuestions
      ? Math.round((score / totalQuestions) * 100)
      : 0;

    return (
      <section className="space-y-6">
        <header>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Results
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            You scored {score} out of {totalQuestions} ({percentage}%)
            {attemptId ? ` • Attempt #${attemptId}` : null}
          </p>
        </header>

        <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          {quiz.questions.map((q) => {
            const answer = answers.find((a) => a.questionId === q.id);
            const correctOption = q.options.find((o) => o.isCorrect);

            return (
              <div
                key={q.id}
                className="border-b border-zinc-200 pb-3 last:border-b-0 last:pb-0 dark:border-zinc-800"
              >
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {q.text}
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Your answer:{' '}
                  {answer?.optionId
                    ? (q.options.find((o) => o.id === answer.optionId)?.text ??
                      'No answer')
                    : 'No answer'}
                </p>
                <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">
                  Correct answer: {correctOption?.text ?? 'N/A'}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>Time left: {timeLeft}s</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-[width]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          {currentQuestion.text}
        </p>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const showCorrect = isAnswered && option.isCorrect;
          const showIncorrect = isAnswered && isSelected && !option.isCorrect;

          const baseClasses =
            'w-full rounded-xl border px-4 py-2 text-left text-sm transition-colors';
          let stateClasses =
            'border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800';

          if (showCorrect) {
            stateClasses =
              'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-500/70 dark:bg-emerald-900/20 dark:text-emerald-200';
          } else if (showIncorrect) {
            stateClasses =
              'border-red-500 bg-red-50 text-red-900 dark:border-red-500/70 dark:bg-red-900/20 dark:text-red-200';
          } else if (isSelected) {
            stateClasses =
              'border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-500/70 dark:bg-blue-900/20 dark:text-blue-200';
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleOptionClick(option.id, option.isCorrect)}
              className={`${baseClasses} ${stateClasses} ${
                isAnswered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
        <span>
          Current score: {score} / {totalQuestions}
        </span>
        <button
          type="button"
          onClick={goToNextQuestion}
          disabled={!isAnswered}
          className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-300"
        >
          {currentIndex + 1 === totalQuestions
            ? 'Finish Quiz'
            : 'Next Question'}
        </button>
      </div>
    </section>
  );
}
