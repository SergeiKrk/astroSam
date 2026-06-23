import React, { useRef, useState } from 'react'

const TemperatureCalculator = () => {
	const firstStrRef = useRef(null)
	const firstTempRef = useRef(null)
	const [strength, setStrength] = useState(0)

	const calculateTemperature = () => {
		let firstStr = parseFloat(firstStrRef.current.value)
		if (isNaN(firstStr)) {
			firstStr = 0
		}
		let firstTemp = parseFloat(firstTempRef.current.value)
		if (isNaN(firstTemp)) {
			firstTemp = 20
		}

		if (!isNaN(firstStr) && !isNaN(firstTemp)) {
			let calculatedStrength = (firstStr + 0.3 * (20 - firstTemp)).toFixed(2)
			setStrength(calculatedStrength)
		}
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<form className='m-6 text-center'>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Крепость по спиртометру'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='firstStr'
						>
							Крепость по спиртометру:
						</label>
						<input
							ref={firstStrRef}
							id='firstStr'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0°'
							onChange={calculateTemperature}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Температура спирта'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='firstTemp'
						>
							Температура спирта:
						</label>
						<input
							ref={firstTempRef}
							id='firstTemp'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='20 °C'
							onChange={calculateTemperature}
						/>
					</div>
				</form>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Крепость:</p>
					<p>
						<span className='text-4xl'>{strength}</span>°
					</p>
				</div>
			</div>
		</div>
	)
}

export default TemperatureCalculator
