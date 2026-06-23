interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'SergeiKrk', // Site author
	title: 'SamogonCalc - онлайн-калькуляторов самогонщика', // Site title.
	description: 'Набор быстрых онлайн-калькуляторов для винокуров и самогонщиков', // Description to display in the meta tags
	lang: '	ru-RU',
	ogLocale: 'ru_RU',
	shareMessage: 'Поделиться постом', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
