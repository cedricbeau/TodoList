'use strict';
(function(){

	let btn = document.querySelector('.btn-consignes')

  function toggleClass(el1, el2) {
    el1.classList.toggle('is-down')
    el2.classList.toggle('is-down')
  }

  function toggleEls(){
    let consigne = document.querySelector('.consignes')
    let btn = document.querySelector('.btn-consignes')
    toggleClass(consigne, btn)
  }

  btn.addEventListener('click', toggleEls, false)

})()
