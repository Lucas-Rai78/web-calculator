const display = document.getElementById('display')
const btns = document.querySelectorAll('.btn')
const operators = ['+', '-', 'x', '÷']

function clearDisplay() {
  display.value = '0'
}

function showError() {
  display.value = 'Erro'
  display.classList.add('error-animation')
  display.scrollLeft = display.scrollWidth

  setTimeout(() => {
    display.classList.remove('error-animation')
  }, 2400)
}

function addCharacter(character) {
  if (display.value === '0' || display.value === 'Error') {
    display.value = character === ',' ? '0,' : character
  } else {
    const cleanedDisplay = display.value.replace(/,/g, '.')

    if (character === ',') {
      const lastNumber = cleanedDisplay.split(/[\+\-\x÷]/).pop()

      if (lastNumber.includes('.')) return
    }

    display.value += character
  }

  display.scrollLeft = display.scrollWidth
}

function addOperator(operator) {
  const lastCharacter = display.value[display.value.length - 1]

  if (display.value === '' || display.value === '0' || display.value === 'Erro')
    return

  if (operators.includes(lastCharacter)) {
    display.value = display.value.slice(0, -1) + operator
  } else {
    display.value += operator
  }

  display.scrollLeft = display.scrollWidth
}

function calculateResult() {
  let expression = display.value
    .replace(/x/g, '*')
    .replace(/÷/g, '/')
    .replace(/,/g, '.')

  try {
    const result = eval(expression)
    if (isNaN(result) || !isFinite(result)) {
      showError()
    } else {
      display.value = Number(result).toLocaleString('pt-BR')
      display.scrollLeft = display.scrollWidth
    }
  } catch {
    showError()
  }
}

function backspace() {
  if (display.value === 'Error' || display.value.length <= 1) {
    clearDisplay()
    return
  }

  display.value = display.value.slice(0, -1)

  if (display.value === '') {
    clearDisplay()
  }

  display.scrollLeft = display.scrollWidth
}

btns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const character = event.target.innerText
    const action = event.target.dataset.action

    switch (action) {
      case 'clear':
        clearDisplay()
        break
      case 'operator':
        addOperator(character)
        break
      case 'equal':
        calculateResult()
        break
      default:
        addCharacter(character)
        break
    }
  })
})

document.addEventListener('keydown', (event) => {
  const key = event.key

  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      addCharacter(key)
      break

    case ',':
    case '.':
      addCharacter(',')
      break

    case '+':
    case '-':
    case '*':
    case '/':
      const operatorMap = {
        '*': 'x',
        '/': '÷',
      }
      addOperator(operatorMap[key] || key)
      break

    case 'Enter':
    case '=':
      calculateResult()
      break

    case 'Backspace':
      backspace()
      break

    case 'c':
    case 'C':
      clearDisplay()
      break

    default:
      break
  }

  event.preventDefault()
})
