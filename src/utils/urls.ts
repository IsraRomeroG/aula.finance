import { parseArticleId } from '@utils/articles';

export function toAbsoluteUrl(pathname: string, baseUrl: string | URL): string {
	return new URL(pathname, baseUrl).toString();
}

export function articlePathFromId(id: string): string {
	const { category, slug } = parseArticleId(id);
	return `/${category}/${slug}/`;
}
