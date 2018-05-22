'use strict';

toggleConsigne()
addItem()
removeTask()
resetTodo()

//Consignes
function toggleConsigne(){

  let btn = document.querySelector('.btn-consignes')
  
  function toggleClass(el1, el2, el3) {
    el1.classList.toggle('is-down')
    el2.classList.toggle('is-down')
    el3.classList.toggle('is-down')
  }

  function toggleConsigne(){
    let consigne = document.querySelector('.consignes')
    let content = document.querySelector('.content')
    let btn = document.querySelector('.btn-consignes')
    toggleClass(consigne, content, btn)
  }
  
  btn.addEventListener('click', toggleConsigne, false)  

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

    // TASK NAME
    itemTask = document.createElement('div')
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
    if(inputTask.value === '') {
      alert('Veuillez ajouter une tâche.')
      let alertBox = document.querySelector('.alert-box')
      alertBox.style.display = 'block'
    } else {
      todoList.appendChild(newListItem)
    }

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





