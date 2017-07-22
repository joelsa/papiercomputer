// initialize variables
const registers = [0, 0, 0, 0, 0, 0, 0, 0]
const instructions = {
	nop: -1,
	isz: 0,
	inc: 1,
	dec: 2,
	jmp: 3,
	stp: 4,
}
const states = {
	inactive: 0,
	running: 1,
	paused: 2,
	stopped: 3,
	failure: 4,
}
let instructionCounter = 0
const program = [[-1], [-1], [-1], [-1], [-1]]
let instructionPointer = 0;
let numberOfInstructionFields = 5
let status = 0
let timer
updateInstructionPointer()
setUpRegisterListeners()
updateRegisterFields()

setUpListeners(document.getElementsByTagName('input'))
setUpListeners(document.getElementsByTagName('select'))


// ui-functions
function reset() {
	instructionPointer = 0
	instructionCounter = 0
	status = 0
	updateInstructionPointer()
}

function reload() {
	location.reload()
}

// multi-step
function run() {
	status = 1;
	timer = setInterval(function(){ step(); }, 500);
}

// single-step
function step() {
	if (instructionPointer >= program.length || instructionPointer+1 === numberOfInstructionFields) {
		status = 4
		clearInterval(timer)
		return false
	}
	const [instruction, register] = program[instructionPointer]
	switch (instruction) {
		case instructions.nop:
			instructionPointer++
			instructionCounter++
			break
		case instructions.isz:
			instructionPointer++
			instructionCounter++
			if (registers[register] === 0) {
				instructionPointer++
				instructionCounter++
			}
			break
		case instructions.inc:
			registers[register]++
			instructionPointer++
			instructionCounter++
			break
		case instructions.dec:
			registers[register]--
			instructionPointer++
			instructionCounter++
			break
		case instructions.jmp:
			instructionPointer = register
			instructionCounter++
			break
		case instructions.stp:
			status = 3
			clearInterval(timer)
			return false
			break
		default:
			break
	}
	updateInstructionPointer()
	updateRegisterFields()
	return true
}

// setup functions
function setUpListeners(elements) {
	for (let i = 0; i < elements.length; i++) {
		elements[i].addEventListener('change', updateArray, false)	
	}	
}

function setUpRegisterListeners() {
	registerElements = document.getElementsByClassName("register")
	for (let i = 0; i < registers.length; i++) {
		registerElements[i].addEventListener('change', updateRegisters, false)	
	}	
}

function updateArray(event) {
	const elem = event.target
	const trow = elem.parentNode.parentNode
	const index = Array.prototype.indexOf.call(trow.parentNode.childNodes, trow)
	if (program[index] === undefined)
		program[index] = [instructions.nop]
	
	//console.log(trow.parentNode.childNodes)
	//console.log(elem.tagName, index, program)
	
	program[index][elem.tagName === "INPUT" ? 1 : 0] = parseInt(elem.value, 10)
	const diff = numberOfInstructionFields-index
	if(diff < 5)
		expandFields(index, 5-diff)
}

function expandFields(index, diff) {
	// Find a <table> element with id="myTable":
	var table = document.getElementById("main");

	for (var i = index; i < index+diff; i++) {
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(numberOfInstructionFields+1)
		// Insert new cells (<td> elements) at the 1st - 4th position of the "new" <tr> element:
		var cell1 = row.insertCell(0)
		var cell2 = row.insertCell(1)
		var cell3 = row.insertCell(2)
		var cell4 = row.insertCell(3)
		row.className = "instruction"
		cell1.className = "command_col"
		cell2.className = "address_col"
		cell3.className = "line_col"
		cell4.className = "pointer_col"

		// Add html to new cells:
		cell1.innerHTML = "<select class='command form-control'><option value=-1 selected='selected'></option><option value=0>isz</option><option value=1>inc</option><option value=2>dec</option><option value=3>jmp</option><option value=4>stp</option></select>"
		cell2.innerHTML = "<input type='number' min=0 class='address form-control'/>"
		cell3.innerHTML = numberOfInstructionFields
		cell4.innerHTML = "&nbsp;"

		// add change listeners
		setUpNewListeners(row)

		// expand array
		if (program[numberOfInstructionFields] === undefined)
			program[numberOfInstructionFields] = [instructions.nop]

		// increase
		numberOfInstructionFields++
	}
}

function setUpNewListeners(row) {
	row.getElementsByTagName('input')[0].addEventListener('change', updateArray, false)
	row.getElementsByTagName('select')[0].addEventListener('change', updateArray, false)
}


function updateInstructionPointer() {
	const arrow = document.getElementsByClassName("arrow")[0]
	const boundingRectParent = document.getElementsByClassName("line_col")[0].getBoundingClientRect()
	const boundingRectNeighbor = document.getElementsByClassName("line_col")[1].getBoundingClientRect()
	const boundingRectArrow = arrow.getBoundingClientRect()
	const containerOffset = document.getElementsByClassName("container")[0].getBoundingClientRect().left
	const navBarOffset = document.getElementsByClassName("navbar")[0].getBoundingClientRect().bottom
	
	const horizontalDiff = boundingRectParent.top - boundingRectNeighbor.top
	const leftOffset = boundingRectParent.right - containerOffset
	const topOffset = boundingRectParent.top + (boundingRectArrow.top-boundingRectArrow.bottom)/2 - horizontalDiff * instructionPointer - navBarOffset
	
	arrow.style.left = leftOffset + "px" 
	arrow.style.top = topOffset + "px"
}

function updateRegisters(event) {
	const elem = event.target
	const trow = elem.parentNode.parentNode
	const index = Array.prototype.indexOf.call(trow.parentNode.childNodes, trow)
	registers[index] = parseInt(elem.value, 10)
}

function updateRegisterFields() {
	registerElements = document.getElementsByClassName("register")
	for (let i = 0; i < registers.length; i++) {
		registerElements[i].value = registers[i]
	}
}