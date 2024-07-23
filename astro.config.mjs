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
		sitemap(),
		tailwind()
	],
	redirects: {
		'/kalkulyator-razbavleniya-samogona-vodoj/kalkulyator-razbavleniya-samogona-vodoj/': {
			status: 301,
			destination: '/kalkulyator-razbavleniya-samogona-vodoj/'
		}
	}
})
