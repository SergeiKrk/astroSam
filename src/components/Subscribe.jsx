import React, { useState, useEffect } from 'react'

const Subscribe = () => {
	const [tooltipOpen, setTooltipOpen] = useState(false)

	useEffect(() => {
		const toggleTooltip = () => {
			setTooltipOpen((prevState) => !prevState)
		}

		const intervalId = setInterval(() => {
			toggleTooltip()
			setTimeout(toggleTooltip, 7000) // Закрыть tooltip через 10 секунд
		}, 20000) // Открыть tooltip через каждые 15 секунд (5 секунд ожидания + 10 секунд видимости)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className='fixed bottom-12 right-6 z-50 block'>
			<ul className='flex flex-col gap-3'>
				<li>
					<div
						className={`tooltip tooltip-left tooltip-accent flex items-center justify-center ${tooltipOpen ? 'tooltip-open' : ''}`}
						data-tip='Заходи, тут интересно!'
					>
						<span className='absolute -z-10 h-[35px] w-[35px] animate-ping rounded-full bg-[#407F7F] opacity-80'></span>
						<a aria-label='telegram' href='https://t.me/samogonco'>
							<svg viewBox='0 0 256 256' astro-icon='logos:telegram' className='h-10'>
								<path
									d='M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128 128-57.307 128-128S198.693 0 128 0z'
									fill='#40B3E0'
								></path>
								<path
									d='M190.283 73.63 167.42 188.899s-3.197 7.994-11.99 4.157l-52.758-40.448-19.184-9.272-32.294-10.872s-4.956-1.758-5.436-5.595c-.48-3.837 5.596-5.915 5.596-5.915l128.376-50.36s10.552-4.636 10.552 3.038'
									fill='#FFF'
								></path>
								<path
									d='M98.618 187.603s-1.54-.144-3.46-6.22c-1.917-6.075-11.67-38.049-11.67-38.049l77.538-49.24s4.477-2.718 4.317 0c0 0 .799.48-1.6 2.718-2.397 2.239-60.91 54.836-60.91 54.836'
									fill='#D2E5F1'
								></path>
								<path
									d='m122.901 168.115-20.867 19.026s-1.632 1.238-3.416.462l3.996-35.34'
									fill='#B5CFE4'
								></path>
							</svg>
						</a>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default Subscribe
