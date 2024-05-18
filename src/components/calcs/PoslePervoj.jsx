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
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<form className='m-6 text-center'>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							htmlFor='rawAlcoholVol'
						>
							Объем разбавляемого самогона, литры:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							id='rawAlcoholVol'
							placeholder='Начальный объем, литры'
							value={rawAlcoholVol}
							onChange={handleInputChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							htmlFor='rawAlcoholFortr'
						>
							Крепость разбавляемого самогона, градусов:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							id='rawAlcoholFortr'
							placeholder='Начальная крепость, градусы'
							value={rawAlcoholFortr}
							onChange={handleInputChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							htmlFor='necessFortr'
						>
							Крепость, которую хотите получить, градусов:
						</label>
						<select
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
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
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p id='addWater'>Количество добавленной воды: 0 л</p>
					<p id='reqVol'>Объем разбавленного самогона: 0 л</p>
				</div>
			</div>
		</div>
	)
}

export default DilutionCalculator
