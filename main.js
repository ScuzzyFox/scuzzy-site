// ! Get element, attach event listener, run callback funciton
let testButton = document.getElementById("test-button");

function onClick() {
  console.log("😼💦");
}

testButton.addEventListener("click", onClick);

// ! Makin a todo list app

let todoItemInput = document.getElementById("todo-item-input");
let addTodoButton = document.getElementById("todo-button");
let todoItems = document.getElementById("todo-items");

addTodoButton.addEventListener("click", function () {
  // get text for todo item
  let todoItemText = todoItemInput.value;

  //format text to <li></li>
  let listItem = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  listItem.innerHTML = todoItemText;

  //append li to todo-items <ul></ul>
  listItem.appendChild(checkbox);
  todoItems.appendChild(listItem);

  todoItemInput.value = "";
  todoItemInput.focus();
});

//play with html input types
//assign inputs to js inputs
//render variables back in the DOM (checkbox would be true/false etc.)
//detect when the input values change!

//next time arrays and objects!

// ! turn the inputs into javascript variables
let cutenessCheckbox = document.getElementById("cuteness-check");
let emailInput = document.getElementById("email-input");
let passwordInput = document.getElementById("password-input");

//document.getElementById("cuteness-output").innerHTML = cutenessCheckbox.checked;

// ! add listeners to them with callback functions that update the state

// I wanted to use this, but idk how to pass in a callback function with parameters

/* function myCallback(elm, id) {
  let state = elm.value;
  htmlOutput = document.getElementById(id);
  htmlOutput.innerHTML = state;
} */

cutenessCheckbox.addEventListener("input", () => {
  // vvv this doesn't work for some reason
  //let state = cutenessCheckbox.value;

  let state = cutenessCheckbox.checked;

  htmlOutput = document.getElementById("cuteness-output");
  htmlOutput.innerHTML = state;

  // has some unexpected results if u spam click o.o
  if (cutenessCheckbox.checked == false) {
    setTimeout(() => {
      cutenessCheckbox.checked = true;
      htmlOutput.innerHTML = true;
    }, 3000);
  }
});

emailInput.addEventListener("input", () => {
  let state = emailInput.value;
  htmlOutput = document.getElementById("email-output");
  htmlOutput.innerHTML = state;
});

passwordInput.addEventListener("input", () => {
  let state = passwordInput.value;
  htmlOutput = document.getElementById("password-output");
  htmlOutput.innerHTML = state;
});
