'use strict';

/* --------------- Variables: Ready --------------- */

let todoList = document.getElementById('todoList');
let inputTask = document.getElementById('inputTask');
let addTask = document.getElementById('addTask');
let closeAlertBtn = document.getElementById('closeAlert');
let resetBtn = document.getElementById('resetTodoList');

/* --------------- Appel fonctions: Ready --------------- */

getValues();
labelForInput();
storeCheck();
addCheckmark();
removeTasks();

/* --------------- Create Task: Ready --------------- */

function createTask(){

  // LI
  let newTask = document.createElement('li');
  newTask.classList.add('list__item');

  // CHECKBOX
  let checkTask = document.createElement('input');
  checkTask.type = 'checkbox';
  checkTask.classList.add('check__task');

  // LABEL
  let labelTask = document.createElement('label');
  labelTask.classList.add('item__task');
  labelTask.innerHTML = '<span class="icon-checkmark2"></span>'+inputTask.value;

  // BTN
  let btnRemoveTask = document.createElement('button');
  btnRemoveTask.classList.add('remove__task');
  btnRemoveTask.innerHTML = '<span class="icon-bin"></span>';
  btnRemoveTask.addEventListener('click', removeTask, false);

  // Append
  newTask.appendChild(checkTask);
  newTask.appendChild(labelTask);
  newTask.appendChild(btnRemoveTask);

  // Alerte
  let alertBox = document.querySelector('.alert-danger');

  // Si champ vide => alerte
  if(inputTask.value === '') {
    alertBox.style.display = 'flex';
  } else {
    // sinon => ajoute tâche
    todoList.appendChild(newTask);
  }

  // Associe checkbox et label
  labelForInput();
  // Style reset btn
  styleBtnReset();
  // Stock la liste localement
  store();
  // Stock l'état de la checkbox localement
  storeCheck();

  // Vide le champ une fois la tâche ajoutée
  inputTask.value = '';
}

// Ajoute une tache en appuyant sur la touche 'Enter'
inputTask.addEventListener('keydown', function(e){
  if(e.key === 'Enter') {
    createTask();
  }
})

// Ajoute une tache en cliquant sur le boutton 'Ajouter'
addTask.addEventListener('click', function() {
  createTask();
})

/* --------------- Associe le label à la checkbox: Ready --------------- */

function labelForInput() {

  let taskInputs = document.querySelectorAll('.check__task');
  let taskLabels = document.querySelectorAll('.item__task');

  for(let i = 0; i<taskInputs.length; i++){
    let taskInput = taskInputs[i];
    let newId = 'task'+i;
    taskInput.setAttribute('id', newId);
  }

  for(let i = 0; i<taskLabels.length; i++){
    let taskLabel = taskLabels[i];
    let newId = 'task'+i;
    taskLabel.setAttribute('for', newId);
  }
}

/* --------------- Add checkmark: Ready --------------- */

function addCheckmark() {
  let taskInputs = document.querySelectorAll('.check__task');

  for(let i = 0; i<taskInputs.length; i++){
    let taskInput = taskInputs[i];

    if(taskInput.checked === true) {
      taskInput.nextSibling.innerHTML = '<span class="icon-checkmark"></span>'+taskInput.nextSibling.innerText;
    } else {
      taskInput.nextSibling.innerHTML = '<span class="icon-checkmark2"></span>'+taskInput.nextSibling.innerText;
    }
  }
}

/* --------------- localStorage: Ready --------------- */

// Store checkbox values
function storeCheck() {

  let taskInputs = document.querySelectorAll('.check__task');

  for(let i = 0; i<taskInputs.length; i++){
    let taskInput = taskInputs[i];

    taskInput.addEventListener('click', function(){
      if(taskInput.checked === true) {
        localStorage.setItem('task'+i, taskInput.checked);
        taskInput.nextSibling.innerHTML = '<span class="icon-checkmark"></span>'+taskInput.nextSibling.innerText;
      } else {
        localStorage.removeItem('task'+i, taskInput.checked);
        taskInput.nextSibling.innerHTML = '<span class="icon-checkmark2"></span>'+taskInput.nextSibling.innerText;
      }
    }, false)
  }
}

// Store List
function store() {
  window.localStorage.myTodoList = todoList.innerHTML;

}

// Renvoie la liste et les valeurs des checkbox
function getValues() {

  // Stock la liste
  let todoList = document.getElementById('todoList');
  // Stock la clé du localStorage
  let storedValues = window.localStorage.myTodoList;
  // Si la clé n'existe pas
  if(!storedValues) {
    return
  } else {
    // Sinon affiche la valeur stockée
    todoList.innerHTML = storedValues;
  }

  let taskInputs = document.querySelectorAll('.check__task');
  for(let i = 0; i<taskInputs.length; i++){
    // Récupère la valeur de la checkbox
    let checked = localStorage.getItem('task'+i)
    // Applique la valeur de la checkbox
    taskInputs[i].checked = checked;
   }
}

/* --------------- Remove Tasks: Ready --------------- */

function removeTask(){

  // Supprime le localStorage lié à la checkbox
  if(this.previousSibling.previousSibling.checked === true) {
    let removeValue = this.previousSibling.previousSibling.id;
    localStorage.removeItem(removeValue);
  }

  // Supprime la tâche
  this.parentNode.parentNode.removeChild(this.parentNode)
  // Style reset btn
  styleBtnReset();
  // Enregistre dans le localstorage
  store();
}

function removeTasks() {
  let btnsRemove = document.querySelectorAll('.remove__task')
  for(let i=0; i<btnsRemove.length; i++){
    btnsRemove[i].addEventListener('click', removeTask, false)
  }
}

/* --------------- Style btn reset: Ready --------------- */

styleBtnReset()
function styleBtnReset() {

  if(todoList.childElementCount === 0) {
    resetBtn.style.opacity = '.3';
    resetBtn.style.pointerEvents = 'none';
  } else {
    resetBtn.style.opacity = '1';
    resetBtn.style.pointerEvents = 'all';
  }
}

/* --------------- Clear Todo List: Ready --------------- */

function clearTodoList() {

  // Supprime toutes les tâches
  while(todoList.lastChild) {
    todoList.removeChild(todoList.lastChild);
  }
  // Clear localStorage
  localStorage.clear();
  // Style reset btn
  styleBtnReset();
}
resetBtn.addEventListener('click', clearTodoList, false)

/* --------------- Close Alert: Ready --------------- */

closeAlertBtn.addEventListener('click', function(){
  this.parentNode.style.display = 'none';
})
