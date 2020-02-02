import { data } from "./model.js"

let _view = null

function catToCol(cat) {
	switch (cat) {
		case 'A':
			return 0
		case 'B':
			return 1
		case 'C':
			return 2
		case 'D':
			return 3
		case 'E':
			return 4
	}
}

function init(spec) {
	_view = new vega.View(vega.parse(spec), {
        renderer: 'svg',
        container: '#graph',
        hover: true
    })
    //_view.logLevel(vega.Debug)

    const table = document.querySelector('myvega-table')

	_view.addSignalListener('overBar', function(name, v) {
		if (v.category) {
			const col = catToCol(v.category)
			table.highlightOn(0, col)
		}
	})

	_view.addSignalListener('outBar', function(name, v) {
		table.highlightOff()
	})
}

function render() {
	_view.data('table', data())
	_view.runAsync()
}

export { init, render }