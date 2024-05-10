import React, { useState } from 'react'

const BragaCalculator = () => {
	const [rawMaterials, setRawMaterials] = useState(0.59) // Default value set to Сахар-песок
	const [massMaterials, setMassMaterials] = useState('')
	const [mashVolume, setMashVolume] = useState('')
	const [rawAlcohol, setRawAlcohol] = useState(0)
	const [waterVolume, setWaterVolume] = useState(0)
	const [alcoholStrength, setAlcoholStrength] = useState(0)

	const calculateBraga = () => {
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

		let rawAlcoholValue = ((rawMaterials * massMaterials) / 0.4).toFixed(2)
		let waterVolumeValue = (mashVolume - massMaterials / rawDensity).toFixed(2)
		let alcoholStrengthValue = ((rawMaterials * massMaterials * 100) / mashVolume).toFixed(2)

		if (isNaN(waterVolumeValue)) {
			waterVolumeValue = 0
		}
		if (isNaN(alcoholStrengthValue)) {
			alcoholStrengthValue = 0
		}

		setRawAlcohol(rawAlcoholValue)
		setWaterVolume(waterVolumeValue)
		setAlcoholStrength(alcoholStrengthValue)
	}

	const handleInputChange = (e) => {
		const { id, value } = e.target
		switch (id) {
			case 'rawMaterials':
				setRawMaterials(parseFloat(value))
				break
			case 'massMaterials':
				setMassMaterials(parseFloat(value))
				break
			case 'mashVolume':
				setMashVolume(parseFloat(value))
				break
			default:
				break
		}
		calculateBraga()
	}

	return (
		<div className='container'>
			<div className='card-group'>
				<div className='card border border-dark'>
					<div className='card-body'>
						<h5 className='card-title'>Введите данные для расчета:</h5>
						<div className='card-text'>
							<br />
							<form>
								<div className='form-group'>
									<div className='row'>
										<label className='col-sm-6 text-md-right p10'>
											Сырье для самогона (дистиллята):
										</label>
										<div className='col-md-4'>
											<select
												id='rawMaterials'
												className='form-control'
												value={rawMaterials}
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
									</div>
									<div className='row'>
										<label className='col-sm-6 text-md-right p10'>Масса сырья:</label>
										<div className='col-md-4'>
											<input
												id='massMaterials'
												className='form-control'
												type='number'
												placeholder='масса, кг.'
												value={massMaterials}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col p10 text-left'>, кг.</div>
									</div>
									<div className='row'>
										<label className='col-sm-6 text-md-right p10'>Объем браги:</label>
										<div className='col-md-4'>
											<input
												id='mashVolume'
												className='form-control'
												type='number'
												placeholder='объем, л.'
												value={mashVolume}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col p10 text-left'>, л.</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='card border-dark bg-primary text-center'>
					<div className='blockquote mb-0 card-body'>
						<p>Количество сырого спирта: {rawAlcohol} л</p>
						<p>Объем воды: {waterVolume} л</p>
						<p>Процент алкоголя: {alcoholStrength}%</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default BragaCalculator
