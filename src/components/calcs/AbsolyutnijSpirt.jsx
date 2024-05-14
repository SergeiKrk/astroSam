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
					<form className='m-6'>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='p10 mr-4 lg:text-right lg:w-[50%] w-full' htmlFor='alcoholVol'>
								Объем самогона:
							</label>
							<div className='w-[70%] lg:w-[40%]'>
								<input
									id='alcoholVol'
									className='border-2 rounded-lg border-[#1ABC9C] px-1 w-44'
									type='number'
									placeholder='0 литров'
									value={alcoholVol}
									onChange={handleInputChange}
								/>
							</div>
							<div className='p10 text-left w-[10%]'>, л.</div>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='p10 mr-4 lg:text-right lg:w-[50%] w-full' htmlFor='alcoholFortr'>
								Крепость самогона:
							</label>
							<div className='w-[70%] lg:w-[40%]'>
								<input
									id='alcoholFortr'
									className='border-2 rounded-lg border-[#1ABC9C] px-1 w-44'
									type='number'
									placeholder='0 °'
									value={alcoholFortr}
									onChange={handleInputChange}
								/>
							</div>
							<div className='p10 text-left w-[10%]'>, °</div>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='p10 mr-4 lg:text-right lg:w-[50%] w-full' htmlFor='firstTemp'>
								Температура самогона:
							</label>
							<div className='w-[70%] lg:w-[40%]'>
								<input
									id='firstTemp'
									className='border-2 rounded-lg border-[#1ABC9C] px-1 w-44'
									type='number'
									placeholder='температура, °C'
									value={firstTemp}
									onChange={handleInputChange}
								/>
							</div>
							<div className='p10 text-left w-[10%]'>, °C</div>
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
