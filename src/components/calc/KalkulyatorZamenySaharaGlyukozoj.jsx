import React, { useState } from 'react'

const ZamenaCalc = () => {
	const [sugar, setSugar] = useState('')
	const [calculateZamenaData, setCalculateZamenaData] = useState([])

	const handleSugarChange = (event) => {
		const sugarValue = event.target.value
		setSugar(sugarValue)

		let glucose = (sugarValue * 1.05).toFixed(2)

		if (sugarValue) {
			updateCalculateZamena(glucose)
		}
	}

	const updateCalculateZamena = (glucose) => {
		const existingDataIndex = calculateZamenaData.findIndex((data) => data.id === 1)
		if (existingDataIndex !== -1) {
			const updatedData = [...calculateZamenaData]
			updatedData[existingDataIndex] = { id: 1, volGlucose: glucose }
			setCalculateZamenaData(updatedData)
		} else {
			const newData = { id: 1, volGlucose: glucose }
			setCalculateZamenaData([newData])
		}
	}

	const ResultBlock = (props) => {
		return (
			<div className='text-black'>
				<p>Потребуется глюкозы или декстрозы:</p>
				<p>
					<span> {props.volGlucose ? props.volGlucose : 0} </span> кг.
				</p>
			</div>
		)
	}

	return (
		<div className='container mx-auto'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div className='bg-white border border-gray-300 p-4'>
					<h3 className='text-xl font-semibold mb-4'>Введите данные для расчетов</h3>
					<div className='flex items-center mb-4'>
						<label htmlFor='sugar' className='w-1/2 mr-2 text-right'>
							Количество сахара:
						</label>
						<input
							id='sugar'
							type='number'
							className='w-1/2 border border-gray-300 p-2'
							value={sugar}
							onChange={handleSugarChange}
							placeholder='масса сахара'
						/>
						<span className='ml-2'>кг.</span>
					</div>
				</div>
				<div className='bg-primary text-white p-4'>
					<h3 className='text-xl font-semibold mb-4'>Результаты</h3>
					<div className='grid gap-2'>
						{calculateZamenaData.map((data) => (
							<ResultBlock
								key={data.id}
								volGlucose={data.volGlucose}
								// Пропсы, если они нужны
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ZamenaCalc
