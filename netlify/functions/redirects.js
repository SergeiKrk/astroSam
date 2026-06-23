export async function handler(event) {
	const { path } = event.rawRequest

	if (path.startsWith('/kalkulyator-drobnoj-peregonki/')) {
		return {
			statusCode: 301,
			headers: { Location: '/kalkulyator-drobnoj-peregonki/' }
		}
	}

	// Добавьте дополнительные проверки для других путей

	return { statusCode: 404 }
}
