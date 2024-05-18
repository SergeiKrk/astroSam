import React, { useRef, useState } from 'react'

const SebestoimostCalc = () => {
	const materialCostRef = useRef(null)
	const volumeDrinkRef = useRef(null)
	const materialMassRef = useRef(null)
	const yeastCostRef = useRef(null)
	const bentoniteCostRef = useRef(null)
	const coalCostRef = useRef(null)
	const wgeCostRef = useRef(null)
	const [volumeDrink, setVolumeDrink] = useState(0)

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
		let volumeDrinkValue = parseFloat(volumeDrink) || 0

		let calculatedCostLiter = (
			(materialCost * materialMass + yeastCost + bentoniteCost + coalCost + wgeCost) /
			volumeDrinkValue
		).toFixed(2)

		if (isNaN(calculatedCostLiter) || calculatedCostLiter === Infinity) {
			calculatedCostLiter = 0
		}

		let calculatedCostHalfLiter = (calculatedCostLiter / 2).toFixed(2)
		let calculatedAbsoluteAlcoholVolume = ((materialMass * calculatedCostLiter) / 100).toFixed(2)

		setCostLiter(calculatedCostLiter)
		setCostHalfLiter(calculatedCostHalfLiter)
		setAbsoluteAlcoholVolume(calculatedAbsoluteAlcoholVolume)
	}

	return (
		<div className='container mx-auto'>
			<div className='w-full flex flex-col lg:flex-row'>
				<div className='card border border-gray-300'>
					<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
						<div className='card-text'>
							<br />
							<div className='my-2 flex flex-wrap lg:flex-nowrap'>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='materialCost'>
										Цена сырья за 1 кг.:
									</label>
									<input
										ref={materialCostRef}
										id='materialCost'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='цена за 1 кг.'
										onChange={allValuesOnChange}
									/>
									<div className='col-span-1 p-2'>, руб.</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='materialMass'>
										Масса сырья:
									</label>
									<input
										ref={materialMassRef}
										id='materialMass'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='масса, кг.'
										onChange={allValuesOnChange}
									/>
									<div className='col-span-1 p-2'>, кг.</div>
								</div>
								<br />
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='yeastCost'>
										Стоимость дрожжей:
									</label>
									<input
										ref={yeastCostRef}
										id='yeastCost'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='цена, руб.'
										onChange={allValuesOnChange}
									/>
									<div className='col-span-1 p-2'>, руб.</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='bentoniteCost'>
										Стоимость бентонита:
									</label>
									<input
										ref={bentoniteCostRef}
										id='bentoniteCost'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='стоимость, руб.'
										onChange={allValuesOnChange}
									/>
									<div className='col-span-1 p-2'>, руб.</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='coalCost'>
										Стоимость угля:
									</label>
									<input
										ref={coalCostRef}
										id='coalCost'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='стоимость, руб.'
										onChange={allValuesOnChange}
									/>
									<div className='col-span-1 p-2'>, руб.</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='wgeCost'>
										Вода, газ / электричество:
									</label>
									<input
										ref={wgeCostRef}
										id='wgeCost'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='стоимость, руб.'
										onChange={allValuesOnChange}
									/>
									<div className='col-span-1 p-2'>, руб.</div>
								</div>
								<br />
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='volumeDrink'>
										Объем готового напитка:
									</label>
									<input
										ref={volumeDrinkRef}
										id='volumeDrink'
										className='w-full lg:w-[30%] bg-white text-black border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52 text-center lg:text-left col-span-1'
										type='number'
										placeholder='Объем напитка, л.'
										onChange={(e) => setVolumeDrink(e.target.value)}
									/>
									<div className='col-span-1 p-2'>, л.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='card border border-gray-300 bg-primary text-center'>
					<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
						<p>Стоимость алкоголя (за литр): {costLiter} ₽</p>
						<p>Стоимость алкоголя (за пол-литра): {costHalfLiter} ₽</p>
						<p>Объем абсолютного спирта: {absoluteAlcoholVolume} л</p>
						<p>Объем алкоголя питейной крепости: {volumeDrink} л</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default SebestoimostCalc
