import { useEffect, useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
	const [input, setInput] = useState(0);
	const [expensiveValue, setExpensiveValue] = useState(0);
	// Your solution starts here

	useEffect(() => {
		console.log(input);
	}, [input]);

	function factorial(num) {
		console.log("reached factorial()");

		let factorial = 1;

		for (let i = num; i > 1; i--) {
			// console.log(`${i} * ${i - 1}`);
			factorial = factorial * i;
		}

		return factorial;
	}

	function debounce(fn) {
		let timeout;

		function random(...args) {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				console.log("executing debounced func");
				const result = fn(...args);

				setExpensiveValue(result);
			}, 1000);
		}

		return useMemo(() => random);
	}

	const debouncedFactorial = debounce(factorial);

	useMemo(() => debouncedFactorial(input), [input]);

	// Your solution ends here

	return (
		<div>
			<input
				type="number"
				value={input}
				onChange={(e) => setInput(Number(e.target.value))}
			/>
			<p>Calculated Value: {expensiveValue}</p>
		</div>
	);
}
