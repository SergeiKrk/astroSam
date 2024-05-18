import React, { useRef, useState } from 'react'

const AbsolyutnijSpirtCalc = () => {
	const alcoholVolRef = useRef(null)
	const alcoholFortrRef = useRef(null)
	const firstTempRef = useRef(null)

	const [absAlcohol, setAbsAlcohol] = useState(0)
	const [cleanAlcohol, setCleanAlcohol] = useState(0)

	const handleInputChange = () => {
		let alcoholVol = parseFloat(alcoholVolRef.current.value) || 0
		let alcoholFortr = parseFloat(alcoholFortrRef.current.value) || 0
		let firstTemp = parseFloat(firstTempRef.current.value) || 20

		let strenghth = (Number(alcoholFortr) + 0.3 * (20 - Number(firstTemp))).toFixed(2)
		let calculatedAbsAlcohol = ((strenghth * alcoholVol) / 100).toFixed(2)
		let calculatedCleanAlcohol = (calculatedAbsAlcohol * 1.038421599169263).toFixed(2)

		setAbsAlcohol(calculatedAbsAlcohol)
		setCleanAlcohol(calculatedCleanAlcohol)
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<div className='py-6'>
					<form className='my-6 text-center'>
						<div className='mx-auto my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[50%] w-full' htmlFor='alcoholVol'>
								Объем самогона:
							</label>
							<div className='w-full lg:w-[40%]'>
								<input
									ref={alcoholVolRef}
									id='alcoholVol'
									className='bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52'
									type='number'
									placeholder='0 литров'
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[50%] w-full' htmlFor='alcoholFortr'>
								Крепость самогона:
							</label>
							<div className='w-full lg:w-[40%]'>
								<input
									ref={alcoholFortrRef}
									id='alcoholFortr'
									className='bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52'
									type='number'
									placeholder='0 °'
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className='my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[50%] w-full' htmlFor='firstTemp'>
								Температура самогона:
							</label>
							<div className='w-full lg:w-[40%]'>
								<input
									ref={firstTempRef}
									id='firstTemp'
									className='bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52'
									type='number'
									placeholder='20 °C'
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Объем абсолютного спирта:</p>
					<p className='text-4xl'>{absAlcohol} л</p>
					<p>Объем чистого спирта:</p>
					<p className='text-4xl'>{cleanAlcohol} л</p>
				</div>
			</div>
		</div>
	)
}

export default AbsolyutnijSpirtCalc
