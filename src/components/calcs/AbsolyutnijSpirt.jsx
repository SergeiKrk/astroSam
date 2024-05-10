import React, { useState } from 'react'

const AbsolyutnijSpirtCalc = () => {
	const [alcoholVol, setAlcoholVol] = useState('')
	const [alcoholFortr, setAlcoholFortr] = useState('')
	const [firstTemp, setFirstTemp] = useState(20)
	const [absAlcohol, setAbsAlcohol] = useState(0)
	const [cleanAlcohol, setCleanAlcohol] = useState(0)

	const calculateResults = () => {
		const strenghth = (parseFloat(alcoholFortr) + 0.3 * (20 - firstTemp)).toFixed(2)
		const absAlcoholValue = ((strenghth * parseFloat(alcoholVol)) / 100).toFixed(2)
		const cleanAlcoholValue = (absAlcoholValue * 1.038421599169263).toFixed(2)

		if (!isNaN(alcoholVol) && !isNaN(alcoholFortr) && !isNaN(firstTemp)) {
			setAbsAlcohol(absAlcoholValue)
			setCleanAlcohol(cleanAlcoholValue)
		} else {
			setAbsAlcohol(0)
			setCleanAlcohol(0)
		}
	}

	const handleInputChange = (e) => {
		const { id, value } = e.target
		switch (id) {
			case 'alcoholVol':
				setAlcoholVol(value)
				break
			case 'alcoholFortr':
				setAlcoholFortr(value)
				break
			case 'firstTemp':
				setFirstTemp(parseFloat(value))
				break
			default:
				break
		}
		calculateResults()
	}

	return (
		<div className='container'>
			<div className='card-group'>
				<div className='card border border-dark'>
					<div className='card-body'>
						<div className='card-text'>
							<form>
								<div className='form-row' style={{ marginTop: '10px' }}>
									<label className='p10 text-md-right col-sm-6' htmlFor='alcoholVol'>
										Объем самогона:
									</label>
									<div className='col-xs-9 col-md-4'>
										<input
											id='alcoholVol'
											className='form-control'
											type='number'
											placeholder='объем, литров'
											value={alcoholVol}
											onChange={handleInputChange}
										/>
									</div>
									<div className='p10 text-left col-xs-3 col-md-2'>, л.</div>
								</div>
								<div className='form-row'>
									<label className='p10 text-md-right col-sm-6' htmlFor='alcoholFortr'>
										Крепость самогона:
									</label>
									<div className='col-xs-9 col-md-4'>
										<input
											id='alcoholFortr'
											className='form-control'
											type='number'
											placeholder='крепость, градусов'
											value={alcoholFortr}
											onChange={handleInputChange}
										/>
									</div>
									<div className='p10 text-left col-xs-3 col-md-2'>, °</div>
								</div>
								<div className='form-row'>
									<label className='p10 text-md-right col-sm-6' htmlFor='firstTemp'>
										Температура самогона:
									</label>
									<div className='col-xs-9 col-md-4'>
										<input
											id='firstTemp'
											className='form-control'
											type='number'
											placeholder='температура, °C'
											value={firstTemp}
											onChange={handleInputChange}
										/>
									</div>
									<div className='p10 text-left col-xs-3 col-md-2'>, °C</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='card border-dark bg-primary text-center'>
					<div className='blockquote mb-0 card-body'>
						<p id='absAlcohol'>Объем абсолютного спирта: {absAlcohol} л</p>
						<p id='cleanAlcohol'>Объем чистого спирта: {cleanAlcohol} л</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default AbsolyutnijSpirtCalc
