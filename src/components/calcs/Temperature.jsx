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
		<div className='container mx-auto'>
			<div className='card-group'>
				<div className='card border border-gray-300'>
					<div className='card-body'>
						<h5 className='card-title'>Введите данные для расчета:</h5>
						<div className='card-text'>
							<br />
							<div className='form-group'>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='firstStr'>
										Крепость по спиртометру:
									</label>
									<input
										ref={firstStrRef}
										id='firstStr'
										className='form-control col-span-1'
										type='number'
										placeholder='градусов'
										onChange={calculateTemperature}
									/>
									<div className='col-span-1 p-2'>, °</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='firstTemp'>
										Температура спирта:
									</label>
									<input
										ref={firstTempRef}
										id='firstTemp'
										className='form-control col-span-1'
										type='number'
										placeholder='20 °C'
										onChange={calculateTemperature}
									/>
									<div className='col-span-1 p-2'>, °C.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='card border border-gray-300 bg-primary text-center'>
					<div className='card-body'>
						<p>Крепость: {strength}°</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default TemperatureCalculator
