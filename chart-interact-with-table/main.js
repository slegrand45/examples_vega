import { Table } from "./table.js"
import { data, incrData } from "./model.js"
import { init, render } from "./view.js"

function main() {
	window.customElements.define('myvega-table', Table)

	fetch('chart.json')
		.then(res => res.json())
		.then(spec => {
			init(spec)
			render()
		})
		.catch(err => console.error(err))

	const table = document.querySelector('myvega-table')
		, click = (v) => (evt) => {
			evt.preventDefault()
			incrData(v)
			table.refresh()
			render()
	}

	document.getElementById('minus').onclick = click(-10)
	document.getElementById('plus').onclick = click(10)
}

export { main }
