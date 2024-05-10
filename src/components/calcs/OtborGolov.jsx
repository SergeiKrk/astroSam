import React, { useState } from 'react'

const HeadsSelectionCalculator = () => {
	const [rawAlcoholVol, setRawAlcoholVol] = useState('')
	const [rawAlcoholFortr, setRawAlcoholFortr] = useState('')
	const [partHeadVol, setPartHeadVol] = useState(10) // Default value set to 10%

	const handleInputChange = (e) => {
		const { id, value } = e.target
		switch (id) {
			case 'rawAlcoholVol':
				setRawAlcoholVol(value)
				break
			case 'rawAlcoholFortr':
				setRawAlcoholFortr(value)
				break
			case 'partHead':
				setPartHeadVol(value)
				break
			default:
				break
		}
		calculate()
	}

	const calculate = () => {
		let rawAlcoholVolValue = parseFloat(rawAlcoholVol)
		let rawAlcoholFortrValue = parseFloat(rawAlcoholFortr)
		let partHeadVolValue = parseFloat(partHeadVol)

		let absAlcoholValue = ((rawAlcoholFortrValue * rawAlcoholVolValue) / 100).toFixed(2)
		if (isNaN(absAlcoholValue)) {
			absAlcoholValue = 0
		}
		let outHeadsValue = (
			(rawAlcoholFortrValue * rawAlcoholVolValue * partHeadVolValue) /
			10000
		).toFixed(2)

		if (isNaN(outHeadsValue)) {
			outHeadsValue = 0
		}

		document.getElementById('absAlcohol').innerText =
			`Абсолютный объем спирта: ${absAlcoholValue} л`
		document.getElementById('outHeads').innerText = `Объем «Голов»: ${outHeadsValue} л`
	}

	return (
		<div className='container'>
			<div className='card-group'>
				<div className='card border border-dark'>
					<div className='card-body'>
						<div className='card-text'>
							<form>
								<div className='form-group'>
									<label htmlFor='rawAlcoholVol'>Объем спирта-сырца, литры:</label>
									<input
										type='number'
										className='form-control'
										id='rawAlcoholVol'
										placeholder='Объем, литры'
										value={rawAlcoholVol}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='rawAlcoholFortr'>Крепость спирта-сырца, градусов:</label>
									<input
										type='number'
										className='form-control'
										id='rawAlcoholFortr'
										placeholder='Крепость, градусы'
										value={rawAlcoholFortr}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='partHead'>Доля «Голов», % от общего объема:</label>
									<select
										className='form-control'
										id='partHead'
										value={partHeadVol}
										onChange={handleInputChange}
									>
										<option value='10'>10%</option>
										<option value='11'>11%</option>
										<option value='12'>12%</option>
										<option value='13'>13%</option>
										<option value='14'>14%</option>
										<option value='15'>15%</option>
									</select>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='card border-dark bg-primary text-center'>
					<blockquote className='blockquote mb-0 card-body'>
						<p id='absAlcohol'>Абсолютный объем спирта: 0 л</p>
						<p id='outHeads'>Объем «Голов»: 0 л</p>
					</blockquote>
				</div>
			</div>
			<br />
		</div>
	)
}

export default HeadsSelectionCalculator
