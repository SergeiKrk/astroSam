import React, { useRef, useState } from 'react'

const SugarSubstituteCalculator = () => {
	const sugarRef = useRef(null)
	const [glucose, setGlucose] = useState(0)

	const calculateZamena = () => {
		let sugar = parseFloat(sugarRef.current.value)
		if (isNaN(sugar)) {
			sugar = 0
		}

		if (!isNaN(sugar)) {
			let glucoseAmount = (sugar * 1.05).toFixed(2)
			setGlucose(glucoseAmount)
		}
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<div className='p-6'>
					<form className='my-6 text-center content-center'>
						<div className='mx-auto my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full' htmlFor='sugar'>
								Количество сахара:
							</label>
							<input
								ref={sugarRef}
								id='sugar'
								className='w-full lg:w-[40%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left'
								type='number'
								placeholder='0 кг.'
								onChange={calculateZamena}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Количество глюкозы:</p>
					<p>
						<span className='text-4xl'>{glucose}</span> кг
					</p>
				</div>
			</div>
		</div>
	)
}

export default SugarSubstituteCalculator
