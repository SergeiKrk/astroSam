import React, { useRef, useState } from 'react'

const SebestoimostCalc = () => {
	const materialCostRef = useRef(null)
	const volumeDrinkRef = useRef(null)
	const materialMassRef = useRef(null)
	const yeastCostRef = useRef(null)
	const bentoniteCostRef = useRef(null)
	const coalCostRef = useRef(null)
	const wgeCostRef = useRef(null)

	const [costLiter, setCostLiter] = useState(0)
	const [costHalfLiter, setCostHalfLiter] = useState(0)
	const [absoluteAlcoholVolume, setAbsoluteAlcoholVolume] = useState(0)

	const allValuesOnChange = () => {
		let materialCost = parseFloat(materialCostRef.current.value) || 0
		let materialMass = parseFloat(materialMassRef.current.value) || 0
		let yeastCost = parseFloat(yeastCostRef.current.value) || 0
		let bentoniteCost = parseFloat(bentoniteCostRef.current.value) || 0
		let coalCost = parseFloat(coalCostRef.current.value) || 0
		let wgeCost = parseFloat(wgeCostRef.current.value) || 0
		let volumeDrinkValue = parseFloat(volumeDrinkRef.current.value) || 0

		let calculatedCostLiter = (
			(materialCost * materialMass + yeastCost + bentoniteCost + coalCost + wgeCost) /
			volumeDrinkValue
		).toFixed(2)

		let calculatedCostHalfLiter = (calculatedCostLiter / 2).toFixed(2)
		let calculatedAbsoluteAlcoholVolume = ((materialMass * calculatedCostLiter) / 100).toFixed(2)

		materialCost && materialMass && volumeDrinkValue && setCostLiter(calculatedCostLiter)
		materialCost && materialMass && volumeDrinkValue && setCostHalfLiter(calculatedCostHalfLiter)
		materialCost &&
			materialMass &&
			volumeDrinkValue &&
			setAbsoluteAlcoholVolume(calculatedAbsoluteAlcoholVolume)
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<form className='m-6 text-center'>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Цена сырья'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='materialCost'
						>
							Цена сырья за 1 кг.:
						</label>
						<input
							ref={materialCostRef}
							id='materialCost'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 руб.'
							onChange={allValuesOnChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Масса сырья'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='materialMass'
						>
							Масса сырья:
						</label>
						<input
							ref={materialMassRef}
							id='materialMass'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 кг.'
							onChange={allValuesOnChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Объем готового напитка'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='volumeDrink'
						>
							Объем готового напитка:
						</label>
						<input
							ref={volumeDrinkRef}
							id='volumeDrink'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 л.'
							onChange={allValuesOnChange}
						/>
					</div>
					<br />
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Стоимость дрожжей'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='yeastCost'
						>
							Стоимость дрожжей:
						</label>
						<input
							ref={yeastCostRef}
							id='yeastCost'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 руб.'
							onChange={allValuesOnChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Стоимость бентонита'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='bentoniteCost'
						>
							Стоимость бентонита:
						</label>
						<input
							ref={bentoniteCostRef}
							id='bentoniteCost'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 руб.'
							onChange={allValuesOnChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Стоимость угля'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='coalCost'
						>
							Стоимость угля:
						</label>
						<input
							ref={coalCostRef}
							id='coalCost'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 руб.'
							onChange={allValuesOnChange}
						/>
					</div>
					<div className='my-2 flex flex-wrap lg:flex-nowrap'>
						<label
							aria-label='Вода, газ'
							className='mr-4 lg:text-right lg:w-[70%] w-full'
							htmlFor='wgeCost'
						>
							Вода, газ / электричество:
						</label>
						<input
							ref={wgeCostRef}
							id='wgeCost'
							className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
							type='number'
							placeholder='0 руб.'
							onChange={allValuesOnChange}
						/>
					</div>
				</form>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Стоимость алкоголя (за литр):</p>
					<p>
						<span className='text-4xl'>{costLiter}</span> ₽
					</p>
					<p>Стоимость алкоголя (за пол-литра):</p>
					<p>
						<span className='text-4xl'>{costHalfLiter}</span> ₽
					</p>
					<p>Объем абсолютного спирта:</p>
					<p>
						<span className='text-4xl'>{absoluteAlcoholVolume}</span> л
					</p>
				</div>
			</div>
		</div>
	)
}

export default SebestoimostCalc
