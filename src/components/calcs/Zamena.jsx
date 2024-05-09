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
		<div className='container mx-auto'>
			<div className='card-group'>
				<div className='card border border-gray-300'>
					<div className='card-body'>
						<div className='card-text'>
							<br />
							<div className='form-group'>
								<div className='grid grid-cols-2 gap-4'>
									<label className='text-right p-2' htmlFor='sugar'>
										Количество сахара:
									</label>
									<input
										ref={sugarRef}
										id='sugar'
										className='form-control col-span-1'
										type='number'
										placeholder='0'
										onChange={calculateZamena}
									/>
									<div className='col-span-1 p-2'>, кг.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='card border border-gray-300 bg-primary text-center'>
					<div className='card-body'>
						<p>Количество глюкозы: {glucose} кг</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default SugarSubstituteCalculator
