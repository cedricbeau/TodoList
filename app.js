'use strict';

toggleConsigne()
addItem()
removeTask()
resetTodo()
closeAlert()

//Consignes
function toggleConsigne(){

  let btn = document.querySelector('.btn-consignes')
  
  function toggleClass(el1, el2, el3) {
    el1.classList.toggle('is-down')
    el2.classList.toggle('is-down')
    el3.classList.toggle('is-down')
  }

  function toggleEls(){
    let consigne = document.querySelector('.consignes')
    let content = document.querySelector('.content')
    let btn = document.querySelector('.btn-consignes')
    toggleClass(consigne, content, btn)
  }
  
  btn.addEventListener('click', toggleEls, false)  

}

//addItem
function addItem(){

  let todoList, listItems, inputTask, addTask

  todoList = document.getElementById('todoList')
  listItems = document.querySelectorAll('.list__item')
  inputTask = document.getElementById('inputTask')
  addTask = document.getElementById('addTask')  
  
  function createTask(){    
    
    let newListItem, inputCheck, itemTask, btnRemove
    
    // LI
    newListItem = document.createElement('li')
    newListItem.classList.add('list__item')
    
    // CHECKBOX
    inputCheck = document.createElement('input')
    inputCheck.setAttribute('type', 'checkbox')
    inputCheck.classList.add('check__task')    

    // LABEL
    itemTask = document.createElement('label')
    itemTask.classList.add('item__task')
    itemTask.innerText = inputTask.value

    // REMOVE
    btnRemove = document.createElement('button')
    btnRemove.classList.add('remove__task')
    btnRemove.innerText = 'x'
    btnRemove.addEventListener('click', function(e){
      console.log('click')
      console.log(e.target)
      btnRemove.parentNode.style.display = 'none'      
    })
    
    newListItem.appendChild(inputCheck)  
    newListItem.appendChild(itemTask)
    newListItem.appendChild(btnRemove)

    
    
    
    // Alerte si champ vide
    let alertBox = document.querySelector('.alert-danger')
    // Supprime l'alerte si existe au moment de l'ajout de la nouvelle tâche
    alertBox.style.display = 'none'
    if(inputTask.value === '') {
      alertBox.style.display = 'block'
    } else {
      todoList.appendChild(newListItem)
    }

    // Associate checkbox and label
    forId()

    // Vide le champ une fois la tâche ajoutée
    inputTask.value = ''

    

  }

  // Ajoute une tache en appuyant sur la touche 'Enter'
  inputTask.addEventListener('keydown', function(e){
    if(e.key === 'Enter') {
      createTask()
    }
  })

  // Ajoute une tache en cliquant sur le boutton 'Ajouter'
  addTask.addEventListener('click', createTask, false)
  
}

// Associate checkbox and label
function forId() {
  
  let taskInputs = document.querySelectorAll('.check__task')
  let taskLabels = document.querySelectorAll('.item__task')

  for(let i = 0; i<taskInputs.length; i++){    
    let taskInput = taskInputs[i]    
    let newId = 'task'+i
    taskInput.setAttribute('id', newId)    
  }

  for(let i = 0; i<taskLabels.length; i++){    
    let taskLabel = taskLabels[i]
    console.log(taskLabel)
    let newId = 'task'+i
    taskLabel.setAttribute('for', newId)    
  }  

}

//removeItem
function removeTask(){
  
  let btnRemove = document.querySelectorAll('.remove__task')

  for(let i=0; i<btnRemove.length; i++){
    btnRemove[i].addEventListener('click', function(e){
      btnRemove[i].parentNode.style.display = 'none'
    })
  }

}

//resetTotoList
function resetTodo() {

  let resetBtn = document.getElementById('resetTodoList')
  function resetTodoList() {
    
    let todoList = document.getElementById('todoList')  

    while(todoList.lastChild.id !== 'demoTask') {
      todoList.removeChild(todoList.lastChild)
    }

  }
  resetBtn.addEventListener('click', resetTodoList, false)

}

// Close alert
function closeAlert(){
  let closeAlertBtn = document.querySelector('.close-alert')
  closeAlertBtn.addEventListener('click', function(){
    this.parentNode.style.display = 'none'
  })
}





