import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORY_IDS, type CategoryId } from '@config/categories';

export type ArticleEntry = CollectionEntry<'articles'>;

export async function getAllArticles(): Promise<ArticleEntry[]> {
	const articles = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);

	return articles.sort(
		(first, second) => second.data.publishedAt.getTime() - first.data.publishedAt.getTime(),
	);
}

export function parseArticleId(id: string): { category: CategoryId; slug: string } {
	const segments = id.split('/');
	const [category, slug] = segments;

	if (segments.length !== 2 || !category || !slug) {
		throw new Error(
			`ID de artículo inválido "${id}". Se esperaba exactamente "{category}/{slug}".`,
		);
	}

	if (!(CATEGORY_IDS as readonly string[]).includes(category)) {
		throw new Error(
			`Categoría de artículo inválida "${category}" en "${id}". Categorías permitidas: ${CATEGORY_IDS.join(', ')}.`,
		);
	}

	return { category: category as CategoryId, slug };
}
