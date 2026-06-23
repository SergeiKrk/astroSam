import React, { useRef, useState } from 'react'

const AlcoholMixCalculator = () => {
	const firstVolumeRef = useRef(null)
	const firstStrengthRef = useRef(null)
	const firstTemperatureRef = useRef(null)
	const secondVolumeRef = useRef(null)
	const secondStrengthRef = useRef(null)
	const secondTemperatureRef = useRef(null)

	const [mixedStrength, setMixedStrength] = useState(0)
	const [mixedVolume, setMixedVolume] = useState(0)

	const calculateMixedValues = () => {
		let firstVol = parseFloat(firstVolumeRef.current.value) || 0
		let firstStr = parseFloat(firstStrengthRef.current.value) || 0
		let firstTemp = parseFloat(firstTemperatureRef.current.value) || 20
		let secondVol = parseFloat(secondVolumeRef.current.value) || 0
		let secondStr = parseFloat(secondStrengthRef.current.value) || 0
		let secondTemp = parseFloat(secondTemperatureRef.current.value) || 20

		let calculatedMixedStrength = (
			(firstVol * (firstStr + 0.3 * (20 - firstTemp)) +
				secondVol * (secondStr + 0.3 * (20 - secondTemp))) /
			(firstVol + secondVol)
		).toFixed(2)

		let calculatedMixedVolume = (firstVol + secondVol).toFixed(2)

		setMixedStrength(calculatedMixedStrength)
		setMixedVolume(calculatedMixedVolume)
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<div className=''>
					<form className='m-6 text-center'>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='firstVolume'>
								Объем 1-ой жидкости:
							</label>
							<input
								ref={firstVolumeRef}
								id='firstVolume'
								className='w-full lg:w-[40%] text-center lg:text-left border-2 rounded-lg border-[#1ABC9C] px-1'
								type='number'
								placeholder='0 литров'
								onChange={calculateMixedValues}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='firstStrength'>
								Крепость 1-ой жидкости:
							</label>
							<input
								ref={firstStrengthRef}
								id='firstStrength'
								className='w-full lg:w-[40%] text-center lg:text-left border-2 rounded-lg border-[#1ABC9C] px-1'
								type='number'
								placeholder='0 °'
								onChange={calculateMixedValues}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='firstTemperature'>
								Температура 1-ой жидкости:
							</label>
							<input
								ref={firstTemperatureRef}
								id='firstTemperature'
								className='w-full lg:w-[40%] text-center lg:text-left border-2 rounded-lg border-[#1ABC9C] px-1'
								type='number'
								placeholder='20 °C'
								onChange={calculateMixedValues}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='secondVolume'>
								Объем 2-ой жидкости:
							</label>
							<input
								ref={secondVolumeRef}
								id='secondVolume'
								className='w-full lg:w-[40%] text-center lg:text-left border-2 rounded-lg border-[#1ABC9C] px-1'
								type='number'
								placeholder='0 литров'
								onChange={calculateMixedValues}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='secondStrength'>
								Крепость 2-ой жидкости:
							</label>
							<input
								ref={secondStrengthRef}
								id='secondStrength'
								className='w-full lg:w-[40%] text-center lg:text-left border-2 rounded-lg border-[#1ABC9C] px-1'
								type='number'
								placeholder='0 °'
								onChange={calculateMixedValues}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='secondTemperature'>
								Температура 2-ой жидкости:
							</label>
							<input
								ref={secondTemperatureRef}
								id='secondTemperature'
								className='w-full lg:w-[40%] text-center lg:text-left border-2 rounded-lg border-[#1ABC9C] px-1'
								type='number'
								placeholder='20 °C'
								onChange={calculateMixedValues}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Смешанная крепость:</p>
					<p className=' text-3xl'>{mixedStrength}°</p>
					<p>Объем смеси:</p>
					<p className=' text-3xl'>{mixedVolume} л</p>
				</div>
			</div>
		</div>
	)
}

export default AlcoholMixCalculator
