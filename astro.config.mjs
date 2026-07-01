import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/readTime.ts'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	site: 'https://samogoncalc.ru/', // Write here your website url
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
	image: {
		service: {
			entrypoint: 'astro/assets/services/noop'
		}
	},
	integrations: [
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				experimentalThemes: {
					light: 'vitesse-light',
					dark: 'material-theme-palenight'
				},
				wrap: true
			},
			drafts: true
		}),
		react(),
		sitemap({
			serialize(item) {
				// Set lastmod to build date
				item.lastmod = new Date()
				// Assign priority based on URL path
				if (item.url === 'https://samogoncalc.ru/') {
					item.priority = 1.0
				} else if (item.url.includes('/kalkulyator-') || item.url.includes('/razbavlenie-') || item.url.includes('/primernaya-')) {
					item.priority = 0.8
					item.changefreq = 'monthly'
				} else if (item.url.includes('/category/')) {
					item.priority = 0.6
				} else if (item.url === 'https://samogoncalc.ru/about/') {
					item.priority = 0.5
				} else {
					// Blog/recipe pages
					item.priority = 0.7
				}
				return item
			}
		}),
		tailwind()
	]
})
