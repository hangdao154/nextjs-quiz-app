import { db } from '@/db/client';
import { decks, flashcards } from '@/db/schema';
import { TDeckFormValues } from '@/types';
import { count, desc, eq, InferInsertModel } from 'drizzle-orm';
import { deckSchema } from '@/lib';

/** Upper bound per request to keep scans predictable (index-friendly range scans). */
const MAX_DECK_PAGE_SIZE = 100;

export type TDeckListRow = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  totalCards: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TGetAllDecksMeta = {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
};

export type TGetAllDecksResult = {
  items: TDeckListRow[];
  meta: TGetAllDecksMeta;
};

export default class FlashcardService {
  static getAllDecks = async (
    userId: string,
    limit = 5,
    offset = 0
  ): Promise<TGetAllDecksResult> => {
    const pageSize = Math.min(Math.max(1, limit), MAX_DECK_PAGE_SIZE);
    const pageOffset = Math.max(0, offset);
    const ownerScope = eq(decks.createdBy, userId);

    const listQuery = db
      .select({
        id: decks.id,
        title: decks.title,
        description: decks.description,
        category: decks.category,
        totalCards: decks.totalCards,
        createdAt: decks.createdAt,
        updatedAt: decks.updatedAt,
      })
      .from(decks)
      .where(ownerScope)
      .orderBy(desc(decks.updatedAt))
      .offset(pageOffset)
      .limit(pageSize);

    const countQuery = db
      .select({ totalItems: count() })
      .from(decks)
      .where(ownerScope);

    const [items, countRows] = await Promise.all([listQuery, countQuery]);

    const totalItems = Number(countRows[0]?.totalItems ?? 0);
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);
    const rawPage = Math.floor(pageOffset / pageSize) + 1;
    const page =
      totalItems === 0 ? 1 : Math.min(rawPage, Math.max(1, totalPages));

    return {
      items,
      meta: {
        limit: pageSize,
        page,
        totalItems,
        totalPages,
      },
    };
  };

  static create = async (input: TDeckFormValues, userId: string) => {
    const data = deckSchema.parse(input);
    const cardsData = data.cards;

    try {
      const [deck] = await db
        .insert(decks)
        .values({
          title: data.title,
          description: data.description,
          createdBy: userId,
          category: data.category,
          isPublic: true,
          totalCards: cardsData.length,
          isActive: true,
        })
        .returning();

      const deckCardInsertData: InferInsertModel<typeof flashcards>[] =
        cardsData.map((card, order) => ({
          deckId: deck.id,
          front: card.front,
          back: card.back,
          order,
        }));

      const deckCardResult = await db
        .insert(flashcards)
        .values(deckCardInsertData)
        .returning();

      return {
        ...deck,
        cards: { ...deckCardResult },
      };
    } catch (error) {
      throw new Error(
        `Failed to create deck: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };
}
