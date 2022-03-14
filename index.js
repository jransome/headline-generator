const input = document.querySelector('#input')
const generateButton = document.querySelector('#generateBtn')
const output = document.querySelector('#output')

function shuffle(arr) {
  const copy = arr.slice()
  const result = []
  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length)
    result.push(copy[randomIndex])
    copy.splice(randomIndex, 1)
  }
  return result
}

generateButton.addEventListener('click', () => {
  output.textContent = ''
  const words = input.value.split(',')

  for (let i = 0; i < 10; i++) {
    const suggestion = document.createElement('li')
    suggestion.innerText = shuffle(words).join(' ')
    output.appendChild(suggestion)
  }
})
