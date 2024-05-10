import React, { useState } from 'react'

const DilutionCalculator = () => {
	const [rawAlcoholVol, setRawAlcoholVol] = useState('')
	const [rawAlcoholFortr, setRawAlcoholFortr] = useState('')
	const [necessFortr, setNecessFortr] = useState('')
	const [initWater, setInitWater] = useState(0)
	const [reqVol, setReqVol] = useState(0)

	const handleInputChange = (e) => {
		const { id, value } = e.target
		switch (id) {
			case 'rawAlcoholVol':
				setRawAlcoholVol(value)
				break
			case 'rawAlcoholFortr':
				setRawAlcoholFortr(value)
				break
			case 'necessFortr':
				setNecessFortr(value)
				break
			default:
				break
		}
		calculate()
	}

	const calculate = () => {
		let rawAlcoholVolValue = parseFloat(rawAlcoholVol)
		let rawAlcoholFortrValue = parseFloat(rawAlcoholFortr)
		let necessFortrValue = parseFloat(necessFortr)

		let initWaterValue = (
			(rawAlcoholVolValue * (rawAlcoholFortrValue - necessFortrValue)) /
			necessFortrValue
		).toFixed(2)
		let reqVolValue = ((rawAlcoholVolValue * rawAlcoholFortrValue) / necessFortrValue).toFixed(3)

		setInitWater(initWaterValue)
		setReqVol(reqVolValue)
	}

	return (
		<div className='container'>
			<div className='card-group'>
				<div className='card border border-dark'>
					<div className='card-body'>
						<div className='card-text'>
							<form>
								<div className='form-group'>
									<label htmlFor='rawAlcoholVol'>Объем разбавляемого самогона, литры:</label>
									<input
										type='number'
										className='form-control'
										id='rawAlcoholVol'
										placeholder='Начальный объем, литры'
										value={rawAlcoholVol}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='rawAlcoholFortr'>
										Крепость разбавляемого самогона, градусов:
									</label>
									<input
										type='number'
										className='form-control'
										id='rawAlcoholFortr'
										placeholder='Начальная крепость, градусы'
										value={rawAlcoholFortr}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='necessFortr'>Крепость, которую хотите получить, градусов:</label>
									<input
										type='number'
										className='form-control'
										id='necessFortr'
										placeholder='Требуемая крепость, градусы'
										value={necessFortr}
										onChange={handleInputChange}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='card border-dark bg-primary text-center'>
					<blockquote className='blockquote mb-0 card-body'>
						<p>Количество добавленной воды: {initWater} л</p>
						<p>Объем разбавленного самогона: {reqVol} л</p>
					</blockquote>
				</div>
			</div>
			<br />
		</div>
	)
}

export default DilutionCalculator
