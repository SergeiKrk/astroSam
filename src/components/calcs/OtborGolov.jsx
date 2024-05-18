import React, { useRef, useState } from 'react'

const HeadsSelectionCalculator = () => {
	const rawAlcoholVolRef = useRef(null)
	const rawAlcoholFortrRef = useRef(null)
	const partHeadRef = useRef(null)

	const [absAlcohol, setRawAlcohol] = useState(0)
	const [outHeads, setOutHeads] = useState(0)

	const handleInputChange = () => {
		let rawAlcoholVolValue = parseFloat(rawAlcoholVolRef.current.value)
		let rawAlcoholFortrValue = parseFloat(rawAlcoholFortrRef.current.value)
		let partHeadVolValue = parseFloat(partHeadRef.current.value)

		let absAlcoholValue = ((rawAlcoholFortrValue * rawAlcoholVolValue) / 100).toFixed(2)
		let outHeadsValue = (
			(rawAlcoholFortrValue * rawAlcoholVolValue * partHeadVolValue) /
			10000
		).toFixed(2)

		setRawAlcohol(absAlcoholValue)
		setOutHeads(outHeadsValue)
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<form className='m-6 text-center'>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label className='mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='rawAlcoholVol'>
							Объем спирта-сырца, литры:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							ref={rawAlcoholVolRef}
							placeholder='0 л'
							onChange={handleInputChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label className='mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='rawAlcoholFortr'>
							Крепость спирта-сырца, градусов:
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
						<label className='mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='partHead'>
							Доля «Голов», % от общего объема:
						</label>
						<select
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
							ref={partHeadRef}
							onChange={handleInputChange}
						>
							<option value='10'>10%</option>
							<option value='3'>3%</option>
							<option value='7'>7%</option>
							<option value='11'>11%</option>
							<option value='12'>12%</option>
							<option value='13'>13%</option>
							<option value='14'>14%</option>
							<option value='15'>15%</option>
						</select>
					</div>
				</form>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Абсолютный объем спирта:</p>
					<p className='text-3xl'>{absAlcohol} л.</p>
					<p>Объем «Голов»:</p>
					<p className='text-3xl'>{outHeads} л.</p>
				</div>
			</div>
		</div>
	)
}

export default HeadsSelectionCalculator
