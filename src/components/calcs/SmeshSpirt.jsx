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
		<div className='container mx-auto'>
			<div className='card-group'>
				<div className='card border border-gray-300'>
					<div className='card-body'>
						<div className='card-text'>
							<br />
							<div className='form-group'>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='firstVolume'>
										Объем 1-ой жидкости:
									</label>
									<input
										ref={firstVolumeRef}
										id='firstVolume'
										className='form-control col-span-1'
										type='number'
										placeholder='объем, литров'
										onChange={calculateMixedValues}
									/>
									<div className='col-span-1 p-2'>, л.</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='firstStrength'>
										Крепость 1-ой жидкости:
									</label>
									<input
										ref={firstStrengthRef}
										id='firstStrength'
										className='form-control col-span-1'
										type='number'
										placeholder='градусов'
										onChange={calculateMixedValues}
									/>
									<div className='col-span-1 p-2'>, °</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='firstTemperature'>
										Температура 1-ой жидкости:
									</label>
									<input
										ref={firstTemperatureRef}
										id='firstTemperature'
										className='form-control col-span-1'
										type='number'
										placeholder='температура, °C'
										onChange={calculateMixedValues}
									/>
									<div className='col-span-1 p-2'>, °C</div>
								</div>
								<br />
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='secondVolume'>
										Объем 2-ой жидкости:
									</label>
									<input
										ref={secondVolumeRef}
										id='secondVolume'
										className='form-control col-span-1'
										type='number'
										placeholder='объем, литров'
										onChange={calculateMixedValues}
									/>
									<div className='col-span-1 p-2'>, л.</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='secondStrength'>
										Крепость 2-ой жидкости:
									</label>
									<input
										ref={secondStrengthRef}
										id='secondStrength'
										className='form-control col-span-1'
										type='number'
										placeholder='градусов'
										onChange={calculateMixedValues}
									/>
									<div className='col-span-1 p-2'>, °</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='secondTemperature'>
										Температура 2-ой жидкости:
									</label>
									<input
										ref={secondTemperatureRef}
										id='secondTemperature'
										className='form-control col-span-1'
										type='number'
										placeholder='температура, °C'
										onChange={calculateMixedValues}
									/>
									<div className='col-span-1 p-2'>, °C</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='card border border-gray-300 bg-primary text-center'>
					<div className='card-body'>
						<p>Смешанная крепость: {mixedStrength}°</p>
						<p>Объем смеси: {mixedVolume} литров</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default AlcoholMixCalculator
