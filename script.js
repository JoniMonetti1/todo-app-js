const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

//Funcion para agregar una nueva tarea
function addTask() {
    //ver si hay algo escrito en el input
    if(inputBox.value === '') {
        alert('Please enter a task.'); //si no hay salta una alerta
        return;
    } else {
        //se crea un elemento li con el valor ingresado al input
        let li = document.createElement('li');
        li.textContent = inputBox.value;

        //se añade el elemento li al listContainer(ul)
        listContainer.appendChild(li);

        //se crea un elemento span para el boton de eliminacion
        let span = document.createElement('span');
        span.textContent = "\u00d7";

        //se añade el elemento span al li
        li.appendChild(span);
    }
    // al finalizar se vacia el input y se guarda la informacion en el localStorage
    inputBox.value = ''; 
    saveData()
}

//añadir un escuchador de eventos keydown para que el boton de agregar task funcione al presionar la tecla enter
inputBox.addEventListener('keydown', e => {
    if (e.key === "Enter" && inputBox.value !== '') {
        addTask();
    } else if (e.key === 'Enter' && inputBox.value === ''){
        alert('Please enter a task.');
        return;
    }
})

//se añade un escuchador de eventos click al listContainer
listContainer.addEventListener('click', e => {
    //verifica si el elemento que fue clickeado es un elemento li
    if(e.target.tagName === "LI") {
        //alterna la clase checked en el li y guarda la informacion en el localStorage
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") { //verifica si el elemento clickeado fue span(boton de eliminacion)
        //elimina el elemento padre del span(li) y guarda la informacion en el localStorage
        e.target.parentElement.remove();
        saveData();
    }
}, false)

//funcion para guardar la informacion en el localStorage
function saveData() {
    //guarda el contenido de la lista bajo el nombre "data"
    localStorage.setItem('data', listContainer.innerHTML);
}

//funcion para mostrar las tareas guardadas
function showTask() {
    //recupera los datos del localstorage y los agrega como el contenido de la lista de tareas
    listContainer.innerHTML = localStorage.getItem("data");
}

//carga las tareas guardadas cada vez que se inicia la pagina
showTask();