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
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<div>
					<form className='mx-6'>
						<div className='mt-10 flex'>
							<label className='p10 text-md-right base-1/3 w-full' htmlFor='alcoholVol'>
								Объем самогона:
							</label>
							<div className='base-1/3 w-full'>
								<input
									id='alcoholVol'
									className='form-control'
									type='number'
									placeholder='объем, литров'
									value={alcoholVol}
									onChange={handleInputChange}
								/>
							</div>
							<div className='p10 text-left base-1/3 w-full'>, л.</div>
						</div>
						<div className='flex'>
							<label className='base-1/3 w-full' htmlFor='alcoholFortr'>
								Крепость самогона:
							</label>
							<div className='base-1/3 w-full'>
								<input
									id='alcoholFortr'
									className='form-control'
									type='number'
									placeholder='крепость, градусов'
									value={alcoholFortr}
									onChange={handleInputChange}
								/>
							</div>
							<div className='base-1/3 w-full'>, °</div>
						</div>
						<div className='flex'>
							<label className='base-3/6 w-full' htmlFor='firstTemp'>
								Температура самогона:
							</label>
							<div className='base-2/6 w-full'>
								<input
									id='firstTemp'
									className='form-control'
									type='number'
									placeholder='температура, °C'
									value={firstTemp}
									onChange={handleInputChange}
								/>
							</div>
							<div className='base-1/6 w-full'>, °C</div>
						</div>
					</form>
				</div>
			</div>
			<div className='basis-1/2 border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0'>
					<p id='absAlcohol'>Объем абсолютного спирта: {absAlcohol} л</p>
					<p id='cleanAlcohol'>Объем чистого спирта: {cleanAlcohol} л</p>
				</div>
			</div>
		</div>
	)
}

export default AbsolyutnijSpirtCalc
