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

//To do button event listener, creates a list item and appends it to the ul
//also adds a checkbox to the li. each checkbox has a listener that queries all the
// checkboxes to see if the the whole list is checked off or not.
addTodoButton.addEventListener("click", function () {
  // get text for todo item
  let todoItemText = todoItemInput.value;

  //format text to <li></li>
  let listItem = document.createElement("li");
  let checkbox = document.createElement("input");

  //add a checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "todo-checkbox");
  checkbox.addEventListener("input", () => {
    let allCheckboxes = document.querySelectorAll("#todo-checkbox");
    let isDone = false;
    let stateArray = [];

    for (let i = 0; i < allCheckboxes.length; i++) {
      stateArray.push(allCheckboxes[i].checked);
    }
    // if done
    if (!stateArray.includes(false)) {
      document.getElementById("todo-complete").innerHTML =
        "YOU FINISHED YOUR LIST";
    } else {
      document.getElementById("todo-complete").innerHTML = "";
    }
  });
  listItem.innerHTML = todoItemText;

  //append li to todo-items <ul></ul>
  listItem.appendChild(checkbox);

  //since a new list item was added, the list is NOT complete
  document.getElementById("todo-complete").innerHTML = "";
  todoItems.appendChild(listItem);

  //clears the textbox
  todoItemInput.value = "";
  //makes sure the textbox is focused after clicking the button
  todoItemInput.focus();
});

//!---------------------------------------------------------------------------------

//play with html input types
//assign inputs to js inputs
//render variables back in the DOM (checkbox would be true/false etc.)
//detect when the input values change!

//next time arrays and objects!

// ! turn the inputs into javascript variables
let cutenessCheckbox = document.getElementById("cuteness-check");
let emailInput = document.getElementById("email-input");
let passwordInput = document.getElementById("password-input");
let colorInput = document.getElementById("color-input");

//document.getElementById("cuteness-output").innerHTML = cutenessCheckbox.checked;

// ! add listeners to them with callback functions that update the state

// display output of the checkbox in html
cutenessCheckbox.addEventListener("input", () => {
  // vvv this doesn't work for some reason vvv
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

// I wanted to use this since I wrote the same function twice, but idk how to pass
// in a callback function with parameters

/* function myCallback(elm, id) {
  let state = elm.value;
  htmlOutput = document.getElementById(id);
  htmlOutput.innerHTML = state;
} */

//update the output html element with the input's value
emailInput.addEventListener("input", () => {
  let state = emailInput.value;
  htmlOutput = document.getElementById("email-output");
  htmlOutput.innerHTML = state;
});

//update the output html element with the input's value
passwordInput.addEventListener("input", () => {
  let state = passwordInput.value;
  htmlOutput = document.getElementById("password-output");
  htmlOutput.innerHTML = state;
});

//update the output html element with the input's value
colorInput.addEventListener("input", () => {
  let state = colorInput.value;
  //console.log(state);

  bodyElement = document.querySelector("body");
  bodyElement.style.backgroundColor = state;

  //code i found online to convert hex string to hex number
  if (parseInt(state.replace(/^#/, ""), 16) < 0x361b1b) {
    bodyElement.style.color = "#ffffff";
  } else {
    bodyElement.style.color = "#000000";
  }
});
