import React, { useState } from 'react'

const FractionalDistillationCalculator = () => {
	const [rawAlcoholVol, setRawAlcoholVol] = useState('')
	const [rawAlcoholFortr, setRawAlcoholFortr] = useState('')
	const [afterDistillingFortr, setAfterDistillingFortr] = useState('')
	const [partHeadVol, setPartHeadVol] = useState(10) // Default value set to 10%
	const [partTailVol, setPartTailVol] = useState(10) // Default value set to 10%

	const handleInputChange = (e) => {
		const { id, value } = e.target
		switch (id) {
			case 'rawAlcoholVol':
				setRawAlcoholVol(value)
				break
			case 'rawAlcoholFortr':
				setRawAlcoholFortr(value)
				break
			case 'afterDistillingFortr':
				setAfterDistillingFortr(value)
				break
			case 'partHead':
				setPartHeadVol(value)
				break
			case 'partTail':
				setPartTailVol(value)
				break
			default:
				break
		}
		calculate()
	}

	const calculate = () => {
		let rawAlcoholVolValue = parseFloat(rawAlcoholVol)
		let rawAlcoholFortrValue = parseFloat(rawAlcoholFortr)
		let afterDistillingFortrValue = parseFloat(afterDistillingFortr)
		let partHeadVolValue = parseFloat(partHeadVol)
		let partTailVolValue = parseFloat(partTailVol)

		let absAlcoholValue = ((rawAlcoholFortrValue * rawAlcoholVolValue) / 100).toFixed(2)
		if (isNaN(absAlcoholValue)) {
			absAlcoholValue = 0
		}
		let outHeadsValue = (
			(rawAlcoholFortrValue * rawAlcoholVolValue * partHeadVolValue) /
			10000
		).toFixed(2)
		let outTailsValue = (
			(rawAlcoholFortrValue * rawAlcoholVolValue * partTailVolValue) /
			10000
		).toFixed(2)
		let reqVolValue = (
			(rawAlcoholVolValue * rawAlcoholFortrValue) / afterDistillingFortrValue -
			outHeadsValue -
			outTailsValue
		).toFixed(2)

		if (isNaN(outHeadsValue) || isNaN(outTailsValue) || isNaN(reqVolValue)) {
			outHeadsValue = 0
			outTailsValue = 0
			reqVolValue = 0
		}

		document.getElementById('absAlcohol').innerText =
			`Абсолютный объем спирта: ${absAlcoholValue} л`
		document.getElementById('outHeads').innerText = `Объем «Голов»: ${outHeadsValue} л`
		document.getElementById('outTails').innerText = `Объем «Хвостов»: ${outTailsValue} л`
		document.getElementById('reqVol').innerText = `Необходимый объем: ${reqVolValue} л`
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
										placeholder='начальный объем, литров'
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
										placeholder='начальная крепость, градусов'
										value={rawAlcoholFortr}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='afterDistillingFortr'>
										Нужная крепость после перегона, градусов:
									</label>
									<input
										type='number'
										className='form-control'
										id='afterDistillingFortr'
										placeholder='требуемая крепость, градусов'
										value={afterDistillingFortr}
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
								<div className='form-group'>
									<label htmlFor='partTail'>Доля «Хвостов», % от общего объема:</label>
									<select
										className='form-control'
										id='partTail'
										value={partTailVol}
										onChange={handleInputChange}
									>
										<option value='10'>10%</option>
										<option value='11'>11%</option>
										<option value='12'>12%</option>
										<option value='13'>13%</option>
										<option value='14'>14%</option>
										<option value='15'>15%</option>
										<option value='16'>16%</option>
										<option value='17'>17%</option>
										<option value='18'>18%</option>
										<option value='19'>19%</option>
										<option value='20'>20%</option>
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
						<p id='outTails'>Объем «Хвостов»: 0 л</p>
						<p id='reqVol'>Необходимый объем: 0 л</p>
					</blockquote>
				</div>
			</div>
			<br />
		</div>
	)
}

export default FractionalDistillationCalculator
