'use strict';

/* --------------- Variables: Ready --------------- */

let todoList = document.getElementById('todoList')
const inputTask = document.getElementById('inputTask')
const addTask = document.getElementById('addTask')
const closeAlertBtn = document.getElementById('closeAlert')
const resetBtn = document.getElementById('resetTodoList') 

/* --------------- Variables: End --------------- */

/* --------------- Appel fonctions: Ready --------------- */

getValues()
labelForInput()
storeCheck()
addCheckmark()
removeTasks()

/* --------------- Appel fonctions: End --------------- */

/* --------------- Create Task: Ready --------------- */

function createTask(){
	  
  let newTask, checkTask, labelTask, btnRemoveTask
	    
  // LI
  newTask = document.createElement('li')
  newTask.classList.add('list__item')
        
  // CHECKBOX
  checkTask = document.createElement('input')
  checkTask.setAttribute('type', 'checkbox')
  checkTask.classList.add('check__task')    

  // LABEL
  labelTask = document.createElement('label')
  labelTask.classList.add('item__task')
  labelTask.innerHTML = '<svg><use xlink:href="#icon-checkmark2"></use></svg>'+inputTask.value
  console.log(labelTask)

  // BTN
  btnRemoveTask = document.createElement('button')
  btnRemoveTask.classList.add('remove__task')
  btnRemoveTask.innerHTML = '<svg><use xlink:href="#icon-bin"></use></svg>'
  btnRemoveTask.addEventListener('click', removeTask, false)
    
  // Append
  newTask.appendChild(checkTask)  
  newTask.appendChild(labelTask)
  newTask.appendChild(btnRemoveTask)    
    
  // Alerte
  let alertBox = document.querySelector('.alert-danger')
  // Supprime l'alerte si existe au moment de l'ajout de la nouvelle tâche
  alertBox.style.display = 'none'
  // Si champ vide => alerte  
  if(inputTask.value === '') {
    alertBox.style.display = 'block'
  } else {
    // sinon => ajoute tâche
    todoList.appendChild(newTask)
  }
  
  // Associe checkbox et label
  labelForInput()
  // Style reset btn
  styleBtnReset()    
  // Stock la liste localement
  store()  
  // Stock l'état de la checkbox localement  
  storeCheck()	
	
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

/* --------------- Create Task: End --------------- */

/* --------------- Associe le label à la checkbox: Ready --------------- */

function labelForInput() {  
	
  let taskInputs = document.querySelectorAll('.check__task')
  let taskLabels = document.querySelectorAll('.item__task')
  
  for(let i = 0; i<taskInputs.length; i++){    
    let taskInput = taskInputs[i]    
    let newId = 'task'+i
    taskInput.setAttribute('id', newId)    
  }
  
  for(let i = 0; i<taskLabels.length; i++){    
    let taskLabel = taskLabels[i]
    let newId = 'task'+i
    taskLabel.setAttribute('for', newId)    
  }
  
}

/* --------------- Associe le label à la checkbox: End --------------- */

/* --------------- Add checkmark: Ready --------------- */

function addCheckmark() {
  let taskInputs = document.querySelectorAll('.check__task')
    for(let i = 0; i<taskInputs.length; i++){		  
      let taskInput = taskInputs[i]     
      if(taskInput.checked === true) {
        taskInput.nextSibling.innerHTML = '<svg><use xlink:href="#icon-checkmark"></use></svg>'+taskInput.nextSibling.innerText	    
      } 
      if(taskInput.checked === false) { 
        taskInput.nextSibling.innerHTML = '<svg><use xlink:href="#icon-checkmark2"></use></svg>'+taskInput.nextSibling.innerText
      }          
  }
}

/* --------------- Add checkmark: End --------------- */

/* --------------- localStorage: Ready --------------- */

// Store checkbox values
function storeCheck() {	
		
  let taskInputs = document.querySelectorAll('.check__task')	
  for(let i = 0; i<taskInputs.length; i++){		  
    let taskInput = taskInputs[i]      
    taskInput.addEventListener('click', function(){	    
      if(taskInput.checked === true) {
	console.log(taskInput.checked)		    
	localStorage.setItem('task'+i, taskInput.checked)
	taskInput.nextSibling.innerHTML = '<svg><use xlink:href="#icon-checkmark"></use></svg>'+taskInput.nextSibling.innerText	    
      } else {
	console.log(taskInput.checked)
	localStorage.removeItem('task'+i, taskInput.checked)
	taskInput.nextSibling.innerHTML = '<svg><use xlink:href="#icon-checkmark2"></use></svg>'+taskInput.nextSibling.innerText
      }	    
    }, false) 
          
  }
  	
}

// Store List
function store() {
	
  window.localStorage.myTodoList = todoList.innerHTML	
		
}

// Renvoie la liste et les valeurs des checkbox
function getValues() {	
	
	// Stock la liste
	let todoList = document.getElementById('todoList')
	// Stock la clé du localStorage
	let storedValues = window.localStorage.myTodoList	
	// Si la clé n'existe pas
	if(!storedValues) {
		return				
	} else {
		// Sinon affiche la valeur stockée
		todoList.innerHTML = storedValues
	}
		
	let taskInputs = document.querySelectorAll('.check__task')	
	for(let i = 0; i<taskInputs.length; i++){  
		// Récupère la valeur de la checkbox   
		let checked = localStorage.getItem('task'+i)
	  // Applique la valeur de la checkbox  
	  taskInputs[i].checked = checked    
	 }	
	 
}

/* --------------- localStorage: End --------------- */

/* --------------- Remove Tasks: Ready --------------- */



function removeTask(){	
	
  // Supprime le localStorage lié à la checkbox
	if(this.previousSibling.previousSibling.checked === true) {		
		let removeValue = this.previousSibling.previousSibling.id
		localStorage.removeItem(removeValue)		
	}
	
	// Supprime la tâche		
	this.parentNode.parentNode.removeChild(this.parentNode)	
	// Style reset btn
	styleBtnReset()	
	// Enregistre dans le localstorage
	store() 	
	
}

function removeTasks() {
	let btnsRemove = document.querySelectorAll('.remove__task')
	for(let i=0; i<btnsRemove.length; i++){	
		btnsRemove[i].addEventListener('click', removeTask, false)
	}  
}



/* --------------- Remove Tasks: End --------------- */

/* --------------- Style btn reset: Ready --------------- */

styleBtnReset()
function styleBtnReset() {	
	
	if(todoList.childElementCount === 0) {
		resetBtn.style.opacity = '.3'
		resetBtn.style.pointerEvents = 'none'
	} else {
		resetBtn.style.opacity = '1'
		resetBtn.style.pointerEvents = 'all'
	}	
		
}

/* --------------- Style btn reset: End --------------- */

/* --------------- Clear Todo List: Ready --------------- */

function clearTodoList() {
	
	// Supprime toutes les tâches
	while(todoList.lastChild) {
  	todoList.removeChild(todoList.lastChild)
	}
	// Clear localStorage
	localStorage.clear();
	// Style reset btn
	styleBtnReset()	
	
}
resetBtn.addEventListener('click', clearTodoList, false)

/* --------------- Clear Todo List: End --------------- */

/* --------------- Close Alert: Ready --------------- */

closeAlertBtn.addEventListener('click', function(){
	this.parentNode.style.display = 'none'
})

/* --------------- Close Alert: End --------------- */
