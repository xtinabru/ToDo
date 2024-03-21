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

const getTask = async () => {
  try {
    const response = await fetch(BACKEND_ROOT_URL)
    const json = await response.json()
    json.forEach(task => {
      renderTask(task.description)
    })
    input.disabled = false
  } catch (error) {
    alert("Error retrieving tasks " + error.message)
  }
}
const saveTask = async (task) => {
  try {
    const json = JSON.stringify({description: task})
    const response = await fetch(BACKEND_ROOT_URL + '/new',{
      method: 'post',
      headers: {
        'Content-Type':'application/json'
      },
      body: json
    })
    return response.json()
  } catch (error) {
    alert("Error saving task" + error.message)
  }
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

getTask()