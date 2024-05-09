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
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<div className='card border border-gray-300'>
				<div className='card-body'>
					<h5 className='card-title'>Введите данные для разбавления до водочной крепости</h5>
					<div className='card-text'>
						<br />
						<div className='form-group'>
							<div className='grid grid-cols-2 gap-4'>
								<label className='text-right p-2' htmlFor='firstVolume'>
									Объем спирта или дистиллята:
								</label>
								<input
									ref={firstVolumeRef}
									id='firstVolume'
									className='form-control col-span-1'
									type='number'
									placeholder='объем, литров'
									onChange={calculateVodka}
								/>
								<div className='col-span-1 p-2'>, л.</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<label className='text-right p-2' htmlFor='alcoholStr'>
									Крепость спирта или дистиллята:
								</label>
								<input
									ref={alcoholStrRef}
									id='alcoholStr'
									className='form-control col-span-1'
									type='number'
									placeholder='градусов'
									onChange={calculateVodka}
								/>
								<div className='col-span-1 p-2'>, °</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<label className='text-right p-2' htmlFor='firstTemperature'>
									Температура спирта или дистиллята:
								</label>
								<input
									ref={firstTemperatureRef}
									id='firstTemperature'
									className='form-control col-span-1'
									type='number'
									placeholder='20 °C'
									onChange={calculateVodka}
								/>
								<div className='col-span-1 p-2'>, °C.</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<label className='text-right p-2' htmlFor='secondTemperature'>
									Температура воды:
								</label>
								<input
									ref={secondTemperatureRef}
									id='secondTemperature'
									className='form-control col-span-1'
									type='number'
									placeholder='20 °C'
									onChange={calculateVodka}
								/>
								<div className='col-span-1 p-2'>, °C.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='card border border-gray-300 bg-primary text-center'>
				<div className='card-body'>
					<p>Объем воды для разбавления: {waterVolume} л.</p>
					<p>Объем конечного продукта: {mixedVolume} л.</p>
				</div>
			</div>
		</div>
	)
}

export default VodkaCalculator
