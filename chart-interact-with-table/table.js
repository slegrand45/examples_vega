import { data } from "./model.js"

class Table extends HTMLElement {
	constructor() {
		super()
		this._data = this.addId([ data() ])
		this.innerHTML = `<table>
				<thead>
					<tr>
						<th>A</th>
						<th>B</th>
						<th>C</th>
						<th>D</th>
						<th>E</th>
					</tr>
				</thead>
				<tbody>
					${ this.html(this._data) }
				</tbody>
			</table>`
		this.attachEvents()
	}

	attachEvents() {
		const selector = col => `#graph svg.marks g.mark-rect.role-mark path:nth-child(${ col })`
			, setColor = (c) => (evt) => {
				const col = parseInt(evt.currentTarget.dataset.col, 10) + 1
					, elem = document.querySelector(selector(col))
				elem.style.fill = c
			}
		this.querySelectorAll('td').forEach(e => {
			e.onmouseover = setColor("red")
			e.onmouseout = setColor("steelblue")
		})
	}

	addId(data) {
		return data.map((r, i) => r.map((v, j) => ({ row: `${ i }`, col: `${ j }` , ...v })))
	}

	highlightOn(row, col) {
		this.highlightOff()
		this.querySelector(`td[data-id="${ row }.${ col }"]`).classList.add('highlight')
	}

	highlightOff() {
		this.querySelectorAll(`td`).forEach(e => e.classList.remove('highlight'))
	}

	html(data) {
		const fTd = (acc, e) => `${ acc }<td data-id="${ e.row }.${ e.col }" data-row="${ e.row }" data-col="${ e.col }">${ e.amount }</td>`
			, fTr = (acc, e) => `${ acc }<tr>${ e.reduce(fTd, '') }</tr>`
			, trs = data.reduce(fTr, '')
		return trs
	}

	refresh() {		
		this._data = this.addId([ data() ])
		this._data.forEach((r, i) => r.forEach((v, j) => {
			const nth = parseInt(j, 10) + 1
				, selector = `tbody tr td:nth-child(${ nth })`
			this.querySelector(selector).innerHTML = v.amount
		}))
	}
}

export { Table }