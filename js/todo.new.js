'use strict';

let todoLister = {

  todoList: document.getElementById('todoList'),
  taskInputs: document.querySelectorAll('.check__task'),
  inputTask: document.getElementById('inputTask'),
  addTask: document.getElementById('addTask'),
  closeAlertBtn: document.getElementById('closeAlert'),
  resetBtn: document.getElementById('resetTodoList'),

  init: function() {

    this._getValues()
    this._labelForInput()
    this._storeCheck()
    this._addCheckmark()
    this._removeTasks()
    this._styleBtnReset()

    let self = this;

    // Ajoute une tache en appuyant sur la touche 'Enter'
    this.inputTask.addEventListener('keydown', function(e){
      if(e.key === 'Enter') {
        self._createTask();
      }
    })

    // Ajoute une tache en cliquant sur le boutton 'Ajouter'
    this.addTask.addEventListener('click', function(){
      self._createTask();
    })

    // Close alerte
    this.closeAlertBtn.addEventListener('click', function(){
      this.parentNode.style.display = 'none'
    })
  },

  /* --------------- Create Task: Ready --------------- */

  _createTask:function (){

    let newTask, checkTask, labelTask, btnRemoveTask;
    const self = this;

    // LI
    newTask = document.createElement('li');
    newTask.classList.add('list__item');

    // CHECKBOX
    checkTask = document.createElement('input');
    checkTask.setAttribute('type', 'checkbox');
    checkTask.classList.add('check__task');

    // LABEL
    labelTask = document.createElement('label');
    labelTask.classList.add('item__task');
    labelTask.innerHTML = '<span class="icon-checkmark2"></span>'+inputTask.value;

    // BTN
    btnRemoveTask = document.createElement('button');
    btnRemoveTask.classList.add('remove__task');
    btnRemoveTask.innerHTML = '<span class="icon-bin"></span>';
    btnRemoveTask.addEventListener('click', function(){
      // Supprime le localStorage lié à la checkbox
      if(this.previousSibling.previousSibling.checked === true) {
        let removeValue = this.previousSibling.previousSibling.id
        localStorage.removeItem(removeValue)
      }

      // Supprime la tâche
      this.parentNode.parentNode.removeChild(this.parentNode)
      // Style reset btn
      self._styleBtnReset();
      // Enregistre dans le localstorage
      self._store();
    })

    // Append
    newTask.appendChild(checkTask)
    newTask.appendChild(labelTask)
    newTask.appendChild(btnRemoveTask)

    // Alerte box
    this._alertBox(newTask)
    // Associe checkbox et label
    this._labelForInput()
    // Style reset btn
    this._styleBtnReset()
    // Stock la liste localement
    this._store()
    // Stock l'état de la checkbox localement
    this._storeCheck()

    // Vide le champ une fois la tâche ajoutée
    inputTask.value = ''
  },

  /* --------------- Alerte box: Ready --------------- */

  _alertBox: function (newTask) {
      // Alerte
      let alertBox = document.querySelector('.alert-danger')
      // Supprime l'alerte si existe au moment de l'ajout de la nouvelle tâche
      alertBox.style.display = 'none'
      // Si champ vide => alerte
      if(inputTask.value === '') {
        alertBox.style.display = 'flex'
      } else {
        // sinon => ajoute tâche
        this.todoList.appendChild(newTask);
      }
  },

  /* --------------- Associe le label à la checkbox: Ready --------------- */

  _labelForInput: function () {

    let taskLabels = document.querySelectorAll('.item__task');
    let taskInputs = document.querySelectorAll('.check__task');

    for(let i = 0; i < taskInputs.length; i++){
      let taskInput = taskInputs[i]
      let newId = 'task'+i
      taskInput.setAttribute('id', newId)
    }

    for(let i = 0; i<taskLabels.length; i++){
      let taskLabel = taskLabels[i]
      let newId = 'task'+i
      taskLabel.setAttribute('for', newId)
    }
  },

  /* --------------- Add checkmark: Ready --------------- */

  _addCheckmark: function () {

    let taskInputs = document.querySelectorAll('.check__task');

    for(let i = 0; i < taskInputs.length; i++){
      let taskInput = taskInputs[i]

      if(taskInput.checked === true) {
        taskInput.nextSibling.innerHTML = '<span class="icon-checkmark"></span>'+taskInput.nextSibling.innerText
      }

      if(taskInput.checked === false) {
        taskInput.nextSibling.innerHTML = '<span class="icon-checkmark2"></span>'+taskInput.nextSibling.innerText
      }
    }
  },

  /* --------------- localStorage: Ready --------------- */

  // Store checkbox values
  _storeCheck: function () {

    let taskInputs = document.querySelectorAll('.check__task');

    for(let i = 0; i < taskInputs.length; i++){
      let taskInput = taskInputs[i]

      taskInput.addEventListener('click', function(){
        if(taskInput.checked === true) {
          localStorage.setItem('task'+i, taskInput.checked)
          taskInput.nextSibling.innerHTML = '<span class="icon-checkmark"></span>'+taskInput.nextSibling.innerText
        } else {
          localStorage.removeItem('task'+i, taskInput.checked)
          taskInput.nextSibling.innerHTML = '<span class="icon-checkmark2"></span>'+taskInput.nextSibling.innerText
        }
      })
    }
  },

  // Store List
  _store: function () {
    window.localStorage.myTodoList = todoList.innerHTML
  },

  // Renvoie la liste et les valeurs des checkbox
  _getValues: function () {

    let taskInputs = document.querySelectorAll('.check__task');
    // Stock la clé du localStorage
    let storedValues = window.localStorage.myTodoList
    // Si la clé n'existe pas
    if(!storedValues) {
      return
    } else {
      // Sinon affiche la valeur stockée
      todoList.innerHTML = storedValues
    }

    for(let i = 0; i < taskInputs.length; i++){
      // Récupère la valeur de la checkbox
      let checked = localStorage.getItem('task'+i)
      // Applique la valeur de la checkbox
      taskInputs[i].checked = checked
    }
  },

  /* --------------- Remove Tasks: Ready --------------- */

  _removeTask: function (e){

    let self = e.target;
    let selfCheck = self.previousSibling.previousSibling;
    let selfParent = self.parentNode;
    let selfGrandParent = self.parentNode.parentNode;

    // Supprime le localStorage lié à la checkbox
    if(selfCheck.checked === true) {
      let removeValue = selfCheck.id;
      localStorage.removeItem(removeValue);
    }

    // Supprime la tâche
    selfGrandParent.removeChild(selfParent);
    // Style reset btn
    this._styleBtnReset();
    // Enregistre dans le localstorage
    this._store();
  },

  _removeTasks: function () {
    let btnsRemove = document.querySelectorAll('.remove__task');
    let self = this;

    for(let i=0; i<btnsRemove.length; i++){
      btnsRemove[i].addEventListener('click', function(e){
        self._removeTask(e);
      })
    }
  },

  /* --------------- Style btn reset: Ready --------------- */

  _styleBtnReset: function () {

    if(this.todoList.childElementCount === 0) {
      this.resetBtn.style.opacity = '.3'
      this.resetBtn.style.pointerEvents = 'none'
    } else {
      this.resetBtn.style.opacity = '1'
      this.resetBtn.style.pointerEvents = 'all'
    }
  },

  /* --------------- Clear Todo List: Ready --------------- */

  __clearTodoList: function () {

    // Supprime toutes les tâches
    while(this.todoList.lastChild) {
      this.todoList.removeChild(this.todoList.lastChild);
    }
    // Clear localStorage
    localStorage.clear();
    // Style reset btn
    this._styleBtnReset();
  }
}

//todoLister.init()