import React, { useRef, useState } from 'react'

const DilutionCalculator = () => {
	const rawAlcoholVolRef = useRef(null)
	const rawAlcoholFortrRef = useRef(null)
	const necessFortrRef = useRef(null)

	const [addWater, setAddWaterValue] = useState(0)
	const [reqVol, setReqVolValue] = useState(0)

	const handleInputChange = () => {
		let rawAlcoholVolValue = parseFloat(rawAlcoholVolRef.current.value)
		let rawAlcoholFortrValue = parseFloat(rawAlcoholFortrRef.current.value)
		let necessFortrValue = parseFloat(necessFortrRef.current.value)

		let addWaterValue = (
			(rawAlcoholVolValue * rawAlcoholFortrValue) / necessFortrValue -
			rawAlcoholVolValue
		).toFixed(2)
		let reqVolValue = ((rawAlcoholVolValue * rawAlcoholFortrValue) / necessFortrValue).toFixed(2)

		rawAlcoholVolValue && rawAlcoholFortrValue && setAddWaterValue(addWaterValue)
		rawAlcoholVolValue && rawAlcoholFortrValue && setReqVolValue(reqVolValue)
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<form className='m-6 text-center'>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Объем разбавляемого самогона'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
						>
							Объем разбавляемого самогона, литры:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							ref={rawAlcoholVolRef}
							placeholder='0 л.'
							onChange={handleInputChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Крепость разбавляемого самогона'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
						>
							Крепость разбавляемого самогона:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							ref={rawAlcoholFortrRef}
							placeholder='0°'
							onChange={handleInputChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Крепость, которую хотите получить'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='necessFortr'
						>
							Крепость, которую хотите получить:
						</label>
						<select
							aria-label='20-40'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							ref={necessFortrRef}
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
					<p>Количество добавленной воды:</p>
					<p>
						<span className='text-4xl'>{addWater}</span> л
					</p>
					<p>Объем разбавленного самогона:</p>
					<p>
						<span className='text-4xl'>{reqVol}</span> л
					</p>
				</div>
			</div>
		</div>
	)
}

export default DilutionCalculator
