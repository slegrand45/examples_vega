
let _data = [
    {"category": "A", "amount": 28},
    {"category": "B", "amount": 155},
    {"category": "C", "amount": 43},
    {"category": "D", "amount": 91},
    {"category": "E", "amount": 81}
]

function data() {
	return _data
}

function incrData(v) {
	_data = _data.map(e => ({ amount: e.amount + v, category: e.category }))
}

export { data, incrData }
