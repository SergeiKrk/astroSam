import React, { useRef, useState } from 'react'

const FractionalDistillationCalculator = () => {
	const rawAlcoholVolRef = useRef(null)
	const rawAlcoholFortrRef = useRef(null)
	const afterDistillingFortrRef = useRef(null)
	const partHeadRef = useRef(null)
	const partTailRef = useRef(null)

	const [absAlcoholValue, setRawAlcoholVol] = useState(0)
	const [outHeadsValue, setOutHeadslVol] = useState(0)
	const [outTailsValue, setOutTailsVol] = useState(0)
	const [reqVolValue, setReqVol] = useState(0)

	const calculateDrobnayaPeregonka = () => {
		let rawAlcoholVolValue = parseFloat(rawAlcoholVolRef.current.value)
		let rawAlcoholFortrValue = parseFloat(rawAlcoholFortrRef.current.value)
		let afterDistillingFortrValue = parseFloat(afterDistillingFortrRef.current.value)
		let partHeadVolValue = parseFloat(partHeadRef.current.value)
		let partTailVolValue = parseFloat(partTailRef.current.value)

		let absAlcohol = ((rawAlcoholFortrValue * rawAlcoholVolValue) / 100).toFixed(2)

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

		rawAlcoholFortrValue && rawAlcoholVolValue && setRawAlcoholVol(absAlcohol)
		rawAlcoholFortrValue && rawAlcoholVolValue && setOutHeadslVol(outHeadsValue)
		rawAlcoholFortrValue && rawAlcoholVolValue && setOutTailsVol(outTailsValue)
		rawAlcoholFortrValue &&
			rawAlcoholVolValue &&
			afterDistillingFortrValue &&
			setReqVol(reqVolValue)
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<form className='mx-6 my-6 lg:my-16 text-center'>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label className='p10 mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='rawAlcoholVol'>
							Объем спирта-сырца:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] border-2 rounded-lg border-[#1ABC9C] px-1 text-center lg:text-left bg-white'
							ref={rawAlcoholVolRef}
							placeholder='0 л.'
							onChange={calculateDrobnayaPeregonka}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label className='p10 mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='rawAlcoholFortr'>
							Крепость спирта-сырца:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] border-2 rounded-lg border-[#1ABC9C] px-1 text-center lg:text-left'
							ref={rawAlcoholFortrRef}
							placeholder='0 °'
							onChange={calculateDrobnayaPeregonka}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							className='p10 mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='afterDistillingFortr'
						>
							Нужная крепость после перегона:
						</label>
						<input
							type='number'
							className='w-full lg:w-[30%] border-2 rounded-lg border-[#1ABC9C] px-1 text-center lg:text-left'
							id='afterDistillingFortr'
							ref={afterDistillingFortrRef}
							placeholder='0 °'
							onChange={calculateDrobnayaPeregonka}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label className='p10 mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='partHead'>
							Доля «Голов»:
						</label>
						<select
							className='w-full lg:w-[30%] border-2 rounded-lg border-[#1ABC9C] px-1 text-center lg:text-left'
							id='partHead'
							ref={partHeadRef}
							onChange={calculateDrobnayaPeregonka}
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
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label className='p10 mr-4 lg:text-right lg:w-[70%] w-full' htmlFor='partTail'>
							Доля «Хвостов»:
						</label>
						<select
							className='w-full lg:w-[30%] border-2 rounded-lg border-[#1ABC9C] px-1 text-center lg:text-left'
							id='partTail'
							ref={partTailRef}
							onChange={calculateDrobnayaPeregonka}
						>
							<option value='10'>10%</option>
							<option value='15'>11%</option>
							<option value='20'>12%</option>
							<option value='25'>13%</option>
							<option value='30'>14%</option>
						</select>
					</div>
				</form>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Объем абсолютного спирта:</p>
					<p>
						<span className='text-4xl'>{absAlcoholValue}</span> л
					</p>
					<p>Объем «Голов»:</p>
					<p>
						<span className='text-4xl'>{outHeadsValue}</span> л
					</p>
					<p>Объем «Хвостов»:</p>
					<p>
						<span className='text-4xl'>{outTailsValue}</span> л
					</p>
					<p>Объем продукта на выходе:</p>
					<p>
						<span className='text-4xl'>{reqVolValue}</span> л
					</p>
				</div>
			</div>
		</div>
	)
}

export default FractionalDistillationCalculator
