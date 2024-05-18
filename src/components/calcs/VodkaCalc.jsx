import React, { useRef, useState } from 'react'

const VodkaCalculator = () => {
	const firstVolumeRef = useRef(null)
	const alcoholStrRef = useRef(null)
	const firstTemperatureRef = useRef(null)
	const secondTemperatureRef = useRef(null)

	const [waterVolume, setWaterVolume] = useState(0)
	const [mixedVolume, setMixedVolume] = useState(0)

	const calculateVodka = () => {
		let volume = parseFloat(firstVolumeRef.current.value)
		let str = parseFloat(alcoholStrRef.current.value)
		let firstTemp = parseFloat(firstTemperatureRef.current.value)
		let secondTemp = parseFloat(secondTemperatureRef.current.value)

		if (isNaN(volume)) volume = 0
		if (isNaN(firstTemp)) firstTemp = 20
		if (isNaN(secondTemp)) secondTemp = 20

		if (!isNaN(volume) && !isNaN(str)) {
			let waterVol = (
				(volume * (str + 0.3 * (20 - firstTemp)) - 40 * volume) /
				(40 - 0.3 * (20 - secondTemp))
			).toFixed(2)
			let mixVol = (volume + parseFloat(waterVol)).toFixed(2)

			setWaterVolume(waterVol)
			setMixedVolume(mixVol)
		}
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<div>
					<form className='m-6 text-center'>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='p10 mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='firstVolume'>
								Объем спирта или дистиллята:
							</label>
							<input
								ref={firstVolumeRef}
								id='firstVolume'
								className='w-full lg:w-[30%] '
								type='number'
								placeholder='0 литров'
								onChange={calculateVodka}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='p10 mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='alcoholStr'>
								Крепость спирта или дистиллята:
							</label>
							<input
								ref={alcoholStrRef}
								id='alcoholStr'
								className='w-full lg:w-[30%] '
								type='number'
								placeholder='0 °'
								onChange={calculateVodka}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label
								className='p10 mr-4 lg:text-right lg:w-[70%] w-full'
								htmlFor='firstTemperature'
							>
								Температура спирта или дистиллята:
							</label>
							<input
								ref={firstTemperatureRef}
								id='firstTemperature'
								className='w-full lg:w-[30%] '
								type='number'
								placeholder='20 °C'
								onChange={calculateVodka}
							/>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label
								className='p10 mr-4 lg:text-right lg:w-[70%] w-full'
								htmlFor='secondTemperature'
							>
								Температура воды:
							</label>
							<input
								ref={secondTemperatureRef}
								id='secondTemperature'
								className='w-full lg:w-[30%] '
								type='number'
								placeholder='20 °C'
								onChange={calculateVodka}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Объем воды для разбавления:</p>
					<p className='text-3xl'>{waterVolume} л.</p>
					<p>Объем конечного продукта:</p>
					<p className='text-3xl'>{mixedVolume} л.</p>
				</div>
			</div>
		</div>
	)
}

export default VodkaCalculator
