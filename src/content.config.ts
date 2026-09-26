import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const authors = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
	schema: ({ image }) =>
		z.object({
			name: z.string().min(1),
			role: z.string().min(1),
			bio: z.string().min(1),
			credentials: z.array(z.string()).default([]),
			sameAs: z.array(z.url()).default([]),
			avatar: image().optional(),
		}),
});

const articles = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
	schema: ({ image }) =>
		z
			.object({
			title: z.string().min(1),
			description: z.string().min(50).max(170),
			publishedAt: z.coerce.date(),
			updatedAt: z.coerce.date().optional(),
			reviewedAt: z.coerce.date().optional(),
			author: reference('authors'),
			reviewedBy: reference('authors').optional(),
			tags: z.array(z.string()).max(8).default([]),
			cover: image().optional(),
			coverAlt: z.string().min(1).optional(),
			draft: z.boolean().default(true),
			featured: z.boolean().default(false),
			jurisdiction: z.enum(['MX', 'general']).default('MX'),
			affiliateDisclosure: z.boolean().default(false),
			sources: z
				.array(
					z.object({
						title: z.string().min(1),
						publisher: z.string().min(1),
						url: z.url(),
						accessedAt: z.coerce.date(),
					}),
				)
				.default([]),
		})
		.superRefine((article, context) => {
			if (article.cover && !article.coverAlt) {
				context.addIssue({
					code: 'custom',
					path: ['coverAlt'],
					message: 'coverAlt es obligatorio cuando se define cover.',
				});
			}
		}),
});

export const collections = { articles, authors };
