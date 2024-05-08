import React, { useState } from 'react'

function Counter() {
	// Создаем состояние счетчика и функции для его обновления
	const [count, setCount] = useState(0)

	// Функция для увеличения счетчика на 1
	const increment = () => {
		setCount(count + 1)
	}

	// Функция для уменьшения счетчика на 1
	const decrement = () => {
		setCount(count - 1)
	}

	return (
		<div>
			<h2>Счетчик</h2>
			<button onClick={increment}>Увеличить</button>
			<span>{count}</span>
			<button onClick={decrement}>Уменьшить</button>
		</div>
	)
}

export default Counter
