// Tasks array
let initialTasks = [
  "Get up early",
  "Do some meditation",
  "Eat a healthy breakfast",
  "Drink plenty of water",
  "Exercise",
  "Smile :)",
];
// States array
let initialStates = [
  "check",
  "check",
  "uncheck",
  "uncheck",
  "uncheck",
  "uncheck",
];

// Get items from localStorage
if (localStorage.getItem("items")) {
  var tasks = JSON.parse(localStorage.getItem("items"));
} else {
  var tasks = initialTasks;
}

// Get states from localStorage
if (localStorage.getItem("states")) {
  var states = JSON.parse(localStorage.getItem("states"));
} else {
  var states = initialStates;
}

// Get the app element
let app = document.querySelector("#list");

// Create markup
app.innerHTML = tasks
  .map((task, i) => {
    return (
      '<li class="' +
      states[i] +
      '"><p>' +
      task +
      '</p><span><button type="button" class="btn">Delete</button></span></li>'
    );
  })
  .join("");

// Create new task
$("input").keypress(function (event) {
  let field = $("#input").val();
  if ((event.which === 13) & (field != 0)) {
    var toDoText = $(this).val();
    $(this).val("");
    $("ul").append(
      '<li class="uncheck"><p>' +
        toDoText +
        '</p><span><button type="button" class="btn">Delete</button></span></li>'
    );
    writeStorage();
  }
});

// Delete task
$("ul").on("click", "span", function () {
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
      writeStorage();
    });
});

// Delete all tasks
$("#clr").click(function () {
  $("li").remove();
  writeStorage();
});

// Check task
$("ul").on("click", "li", function () {
  if ($(this).hasClass("uncheck")) {
    $(this).removeClass("uncheck").addClass("check");
    writeStorage();
  } else {
    $(this).removeClass("check").addClass("uncheck");
    writeStorage();
  }
});

// Convert HTML elements to Array -> JSON & Write localStorage
var writeStorage = function () {
  let items = [];
  let classes = [];
  let list = document.getElementById("list").getElementsByTagName("li");
  [].forEach.call(list, (element) => {
    let text = element.childNodes[0].innerText;
    items.push(text);
    classes.push(element.className);
  });
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("states", JSON.stringify(classes));
};
