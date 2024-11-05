let itemsContainer = document.getElementById("itemsContainer");

let todoList = getTodoList();
let todoCount = todoList.length;

function getTodoList(){
    let stringifiedList = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringifiedList);
    if(parsedList === null){
        return [];
    }else{
        return parsedList;
    }
}

for (let todo of todoList) {
    createTodoList(todo);
}

function createTodoList(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let listItems = document.createElement('li');
    listItems.classList.add('todo-item-container', 'd-flex', 'flex-row');
    listItems.id = todoId;
    itemsContainer.appendChild(listItems)

    let inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.id = checkboxId;
    inputCheck.checked = todo.isChecked;
    inputCheck.onclick = function(){
        todoSrtike(checkboxId,labelId,todoId);
    };
    inputCheck.classList.add('checkbox-input')
    listItems.appendChild(inputCheck);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add("label-container", 'd-flex', 'flex-row');
    listItems.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.classList.add('checkbox-label');
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if(todo.isChecked === true){
        labelElement.classList.toggle('strike');
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash-o','delete-icon');
    deleteIcon.onclick = function(){
        deleteList(todo.uniqueNo,todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

let addTodo = document.getElementById('addTodo');
addTodo.onclick = function(){
    addList();
}

function addList(){
    let userInput = document.getElementById('userInput');
    let userInputValue = userInput.value;
    if(userInputValue == ""){
        alert('Please enter the texr!');
    }
    
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createTodoList(newTodo);
    userInput.value = "";

    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function todoSrtike(checkboxId,labelId,todoId){
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId)
    labelEl.classList.toggle("strike");

    let todoIndex = todoList.findIndex(eachTodo => {
        let eachTodoId = "todo"+eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    })
    let todoObject = todoList[todoIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteList(uniqueNo,todoId){
    let todoEl = document.getElementById(todoId);
    itemsContainer.removeChild(todoEl);

    let deleleIndexEl = todoList.findIndex(eachTodo => {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    });

    todoList.splice(deleleIndexEl,1)

    // todoList = todoList.filter(todo => todo.uniqueNo !== uniqueNo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}