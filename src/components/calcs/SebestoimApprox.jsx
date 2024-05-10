import React, { useRef, useState } from 'react'

const SebestoimApproxCalc = () => {
	const rawMaterialsRef = useRef(null)
	const massMaterialsRef = useRef(null)
	const costMaterialsRef = useRef(null)
	const yeastCostRef = useRef(null)
	const wgeRef = useRef(null)
	const bentoniteCoalRef = useRef(null)
	const efficiencyRef = useRef(null)
	const headsRef = useRef(null)
	const tailsRef = useRef(null)

	const [costLiterApprox, setCostLiterApprox] = useState(0)
	const [costHalfLiterApprox, setCostHalfLiterApprox] = useState(0)
	const [volumeAbsAlcoholApprox, setVolumeAbsAlcoholApprox] = useState(0)
	const [reqVolApprox, setReqVolApprox] = useState(0)

	const allValuesOnChange = () => {
		let rawMaterials = parseFloat(rawMaterialsRef.current.value)
		let massMaterials = parseFloat(massMaterialsRef.current.value)
		let costMaterials = parseFloat(costMaterialsRef.current.value)
		let yeastCost = parseFloat(yeastCostRef.current.value) || 0
		let wge = parseFloat(wgeRef.current.value) || 0
		let bentoniteCoal = parseFloat(bentoniteCoalRef.current.value) || 0
		let efficiency = parseFloat(efficiencyRef.current.value) || 80
		let heads = parseFloat(headsRef.current.value)
		let tails = parseFloat(tailsRef.current.value)

		let volumeAbsAlcoholApproxValue = ((rawMaterials * massMaterials * efficiency) / 100).toFixed(2)
		let reqVolApproxValue = ((volumeAbsAlcoholApproxValue * (1 - (heads + tails))) / 0.4).toFixed(2)
		let costLiterApproxValue = (
			(costMaterials * massMaterials + wge + yeastCost + bentoniteCoal) /
			reqVolApproxValue
		).toFixed(2)
		let costHalfLiterApproxValue = (costLiterApproxValue / 2).toFixed(2)

		setCostLiterApprox(costLiterApproxValue)
		setCostHalfLiterApprox(costHalfLiterApproxValue)
		setVolumeAbsAlcoholApprox(volumeAbsAlcoholApproxValue)
		setReqVolApprox(reqVolApproxValue)
	}

	return (
		<div className='container mx-auto'>
			<div className='card-group'>
				<div className='card border border-dark'>
					<div className='card-body'>
						<div className='card-text'>
							<br />
							<div className='form-group'>
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>
										Сырье для самогона (дистиллята):
									</label>
									<div className='col-md-4'>
										<select
											ref={rawMaterialsRef}
											id='rawMaterials'
											className='form-control'
											onChange={allValuesOnChange}
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
									<label className='col-sm-6 text-md-right p-2'>Масса сырья:</label>
									<div className='col-md-4'>
										<input
											ref={massMaterialsRef}
											id='massMaterials'
											className='form-control'
											type='number'
											placeholder='масса, кг.'
											onInput={allValuesOnChange}
										/>
									</div>
									<div className='col p-2 text-left'>, кг.</div>
								</div>
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>Стоимость сырья за 1 кг.:</label>
									<div className='col-md-4'>
										<input
											ref={costMaterialsRef}
											id='costMaterials'
											className='form-control'
											type='number'
											placeholder='стоимость, руб.'
											onInput={allValuesOnChange}
										/>
									</div>
									<div className='col p-2 text-left'>, ₽.</div>
								</div>
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>Стоимость дрожжей:</label>
									<div className='col-md-4'>
										<input
											ref={yeastCostRef}
											id='yeastCost'
											className='form-control'
											type='number'
											placeholder='цена, руб.'
											onInput={allValuesOnChange}
										/>
									</div>
									<div className='col p-2 text-left'>, руб.</div>
								</div>
								<br />
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>Вода, газ / электричество:</label>
									<div className='col-md-4'>
										<input
											ref={wgeRef}
											id='wge'
											className='form-control'
											type='number'
											placeholder='стоимость, руб.'
											onInput={allValuesOnChange}
										/>
									</div>
									<div className='col p-2 text-left'>, ₽.</div>
								</div>
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>Стоимость бентонита / угля:</label>
									<div className='col-md-4'>
										<input
											ref={bentoniteCoalRef}
											id='bentoniteCoal'
											className='form-control'
											type='number'
											placeholder='стоимость, руб.'
											onInput={allValuesOnChange}
										/>
									</div>
									<div className='col p-2 text-left'>, ₽.</div>
								</div>
								<br />
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>КПД самогонного аппарата:</label>
									<div className='col-md-4'>
										<input
											ref={efficiencyRef}
											id='efficiency'
											className='form-control'
											type='number'
											placeholder='80'
											onInput={allValuesOnChange}
										/>
									</div>
									<div className='col p-2 text-left'>, %</div>
								</div>
								<br />
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>Доля «Голов»:</label>
									<div className='col-md-2'>
										<select
											ref={headsRef}
											id='heads'
											className='form-control'
											onChange={allValuesOnChange}
										>
											<option value='0.1'>10%</option>
											<option value='0.03'>3%</option>
											<option value='0.07'>7%</option>
											<option value='0.11'>11%</option>
											<option value='0.12'>12%</option>
											<option value='0.13'>13%</option>
											<option value='0.14'>14%</option>
											<option value='0.15'>15%</option>
										</select>
									</div>
									<div className='col-md-4 p-2 text-left'>от общего объёма</div>
								</div>
								<div className='row'>
									<label className='col-sm-6 text-md-right p-2'>Доля «Хвостов»:</label>
									<div className='col-md-2'>
										<select
											ref={tailsRef}
											id='tails'
											className='form-control'
											onChange={allValuesOnChange}
										>
											<option value='0.2'>20%</option>
											<option value='0.10'>10%</option>
											<option value='0.15'>15%</option>
											<option value='0.25'>25%</option>
										</select>
									</div>
									<div className='col-md-4 p-2 text-left'>от общего объёма</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='card border-dark bg-primary text-center'>
					<div className='blockquote mb-0 card-body' id='addCalculateSebestoimApproxElements'>
						<p>Стоимость алкоголя (за литр): {costLiterApprox} ₽</p>
						<p>Стоимость алкоголя (за пол-литра): {costHalfLiterApprox} ₽</p>
						<p>Объем абсолютного спирта: {volumeAbsAlcoholApprox} л</p>
						<p>Объем алкоголя питейной крепости: {reqVolApprox} л</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	)
}

export default SebestoimApproxCalc
