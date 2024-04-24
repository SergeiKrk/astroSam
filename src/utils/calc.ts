import { getCollection } from 'astro:content'

export const getCalcs = async () => {
	return await getCollection('calcs')
}
