import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			h1: z.string().max(80),
			description: z.string(),
			status: z.string().optional(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image(),
			ingr: z
				.array(
					z.object({
						name: z.string(),
						mass: z.string().optional(),
						value: z.string().optional(),
						ingrImage: image(),
						info: z.string().optional()
					})
				)
				.optional(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

const calcs = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80).optional(),
			h1: z.string().max(80).optional(),
			description: z.string(),
			pretext: z.string(),
			heroImage: image(),
			faq: z
				.array(
					z.object({
						q: z.string(),
						a: z.string()
					})
				)
				.optional()
		})
})

const sovety = defineCollection({
	// Same schema as blog — советы и обзоры оборудования
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			h1: z.string().max(80),
			description: z.string(),
			status: z.string().optional(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

const page = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			titlePage: z.string(),
			descriptionPage: z.string(),
			urlSeo: z.string(),
			headImg: image()
		})
})

export const collections = { blog, calcs, page, sovety }
