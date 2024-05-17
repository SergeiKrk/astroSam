import React, { useRef, useState } from 'react'

const BragaCalculator = () => {
	const rawMaterialsRef = useRef(null)
	const massMaterialsRef = useRef(null)
	const mashVolumeRef = useRef(null)

	const [rawMaterials, setRawMaterials] = useState(0.59)
	const [massMaterials, setMassMaterials] = useState(0)
	const [mashVolume, setMashVolume] = useState(0)
	const [rawAlcohol, setRawAlcohol] = useState(0)
	const [waterVolume, setWaterVolume] = useState(0)
	const [alcoholStrength, setAlcoholStrength] = useState(0)
	let rawDensity
	switch (rawMaterials) {
		case 0.59:
			rawDensity = 1.587
			break
		case 0.53:
			rawDensity = 0.65
			break
		case 0.45:
			rawDensity = 0.9
			break
		default:
			rawDensity = 0.8
			break
	}

	const handleInputChange = () => {
		let rawMaterials = parseFloat(rawMaterialsRef.current.value) || 0
		let massMaterials = parseFloat(massMaterialsRef.current.value) || 0
		let mashVolume = parseFloat(mashVolumeRef.current.value) || 0

		let rawAlcoholValue = (rawMaterials * massMaterials).toFixed(2)
		let waterVolumeValue = (mashVolume - massMaterials / rawDensity).toFixed(2)
		let alcoholStrengthValue = ((rawMaterials * massMaterials * 100) / mashVolume).toFixed(2)

		setRawAlcohol(rawAlcoholValue)

		if (massMaterials && mashVolume) {
			setWaterVolume(waterVolumeValue)
			setAlcoholStrength(alcoholStrengthValue)
		}
	}

	return (
		<div className='w-full flex flex-col lg:flex-row'>
			<div className='basis-1/2 border-4 lg:rounded-l-lg border-[#1ABC9C] dark:border-[#00614B]'>
				<div className='p-6'>
					<form className='my-6 text-center content-center'>
						<div className='mx-auto my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full'>
								Сырье для самогона (дистиллята):
							</label>
							<select
								id='rawMaterials'
								ref={rawMaterialsRef}
								className='w-[70%] lg:w-[40%] border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52'
								onChange={handleInputChange}
							>
								<option value='0.59'>Сахар-песок</option>
								<option value='0.53'>Рисовая крупа / мука</option>
								<option value='0.45'>Кукурузная крупа / мука</option>
								<option value='0.43'>Пшеничная крупа / мука</option>
								<option value='0.39'>Пшено крупа / мука</option>
								<option value='0.35'>Гречиха крупа / мука</option>
								<option value='0.35'>Ячниевая крупа / мука</option>
								<option value='0.33'>Ржаная крупа / мука</option>
							</select>
						</div>
						<div className='mx-auto my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full'>Масса сырья:</label>
							<input
								id='massMaterials'
								ref={massMaterialsRef}
								className='w-[70%] lg:w-[40%] border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52'
								type='number'
								placeholder='0 кг.'
								onChange={handleInputChange}
							/>
						</div>
						<div className='mx-auto my-2 flex flex-wrap lg:flex-nowrap'>
							<label className='mr-4 lg:text-right lg:w-[60%] w-full'>Объем браги:</label>
							<input
								id='mashVolume'
								ref={mashVolumeRef}
								className='w-[70%] lg:w-[40%] border-2 rounded-lg border-[#1ABC9C] px-1 max-w-52'
								type='number'
								placeholder='0 л.'
								onChange={handleInputChange}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className='basis-1/2 content-center border-4 lg:rounded-r-lg border-[#1ABC9C] dark:border-[#00614B] bg-[#1ABC9C] dark:bg-[#00614B] text-center'>
				<div className='mb-0 py-6 text-xl text-white'>
					<p>Крепость браги:</p>
					<p className='text-4xl'>{alcoholStrength}°</p>
					<p>Выход абсолютного спирта:</p>
					<p>
						<span className='text-4xl'>{rawAlcohol}</span> л
					</p>
					<p>Воды для браги понадобится:</p>
					<p>
						<span className='text-4xl'>{waterVolume}</span> л
					</p>
				</div>
			</div>
		</div>
	)
}

export default BragaCalculator
