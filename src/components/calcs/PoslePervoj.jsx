import React, { useState } from 'react'

const DilutionCalculator = () => {
	const [rawAlcoholVol, setRawAlcoholVol] = useState('')
	const [rawAlcoholFortr, setRawAlcoholFortr] = useState('')
	const [necessFortr, setNecessFortr] = useState(20) // Default value set to 20°

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

		let addWaterValue = (
			(rawAlcoholVolValue * rawAlcoholFortrValue) / necessFortrValue -
			rawAlcoholVolValue
		).toFixed(2)
		let reqVolValue = ((rawAlcoholVolValue * rawAlcoholFortrValue) / necessFortrValue).toFixed(2)

		document.getElementById('addWater').innerText =
			`Количество добавленной воды: ${addWaterValue} л`
		document.getElementById('reqVol').innerText = `Объем разбавленного самогона: ${reqVolValue} л`
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
									<select
										className='form-control'
										id='necessFortr'
										value={necessFortr}
										onChange={handleInputChange}
									>
										<option value='20'>20°</option>
										<option value='25'>25°</option>
										<option value='30'>30°</option>
										<option value='35'>35°</option>
										<option value='40'>40°</option>
									</select>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='card border-dark bg-primary text-center'>
					<blockquote className='blockquote mb-0 card-body'>
						<p id='addWater'>Количество добавленной воды: 0 л</p>
						<p id='reqVol'>Объем разбавленного самогона: 0 л</p>
					</blockquote>
				</div>
			</div>
			<br />
		</div>
	)
}

export default DilutionCalculator
