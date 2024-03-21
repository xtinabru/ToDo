const BACKEND_ROOT_URL = 'http://localhost:3001'

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = true

const renderTask = (task) => {
  const li = document.createElement('li')
  li.setAttribute('class', 'list-group-item')
  li.innerHTML = task
  list.append(li)
}

input.addEventListener('keypress',(event) => {
  if(event.key === 'Enter'){
    event.preventDefault()
    const task = input.value.trim()
    if (task !== ''){
      renderTask(task)
      input.value = ''
    }

  }
})