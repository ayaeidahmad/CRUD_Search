const data = JSON.parse(localStorage.getItem("todo")) || [];
const loadDataToTable = (name, last, handle, elementIndex) => {
  const tableBody = document.querySelector(".table tbody");
  tableBody.insertAdjacentHTML(
    "beforeend",
    `
          <tr>
              <th scope="row">${elementIndex}</th>
              <td>${name}</td>
              <td>${last}</td>
              <td>${handle}</td>
              <td>      
              <button data-index=${elementIndex} onclick="deleteRow(event)" class="btn btn-danger delete-button-${elementIndex}">Delete row</button>
              <button data-index=${elementIndex} onclick="updateRow(event)" class="btn btn-warning delete-button-${elementIndex}">Update</button>
              </td>
          </tr>
  `
  );
};
data.forEach((item, index) => {
  loadDataToTable(item.name, item.last, item.handle, index);
});
const tableBody = document.querySelector(".table tbody");
const addRowToTable = (name, last, handle, elementIndex) => {
  tableBody.insertAdjacentHTML(
    "beforeend",
    `
          <tr>
              <th scope="row">${elementIndex}</th>
              <td>${name}</td>
              <td>${last}</td>
              <td>${handle}</td>
              <td>      
              <button data-index=${elementIndex} onclick="deleteRow(event)" class="btn btn-danger delete-button-${elementIndex}">Delete row</button>
              <button data-index=${elementIndex} onclick="updateRow(event)" class="btn btn-warning delete-button-${elementIndex}">Update</button>
              </td>
          </tr>
  `
  );
  data.push({
    name: name,
    last: last,
    handle: handle,
  });

  localStorage.setItem("todo", JSON.stringify(data));
};

let elementIndex = tableBody.children.length;
const newRowButton = document.querySelector(".add-new-button");
newRowButton.addEventListener("click", () => {
  const nameInput = document.querySelector(".name");
  const lastInput = document.querySelector(".last");
  const handleInput = document.querySelector(".handle");
  addRowToTable(
    nameInput.value,
    lastInput.value,
    handleInput.value,
    elementIndex
  );
  elementIndex += 1;
  nameInput.value = "";
  lastInput.value = "";
  handleInput.value = "";
});
const deleteRow = (event) => {
  event.target.parentElement.parentElement.remove();
  const index = event.target.dataset.index;
  delete data[index];
  const newData = data.filter((item) => item);
  localStorage.setItem("todo", JSON.stringify(newData));
};
const saveButton = document.querySelector(".save-after-update");
let lastIndex = 0;
const updateRow = (event) => {
  const index = event.target.dataset.index;
  lastIndex = index;
  const todoItem = data[index];
  saveButton.classList.remove("d-none");
  const nameInput = document.querySelector(".name");
  const lastInput = document.querySelector(".last");
  const handleInput = document.querySelector(".handle");
  nameInput.value = todoItem.name;
  lastInput.value = todoItem.last;
  handleInput.value = todoItem.handle;
};
saveButton.addEventListener("click", () => {
  const nameInput = document.querySelector(".name");
  const lastInput = document.querySelector(".last");
  const handleInput = document.querySelector(".handle");
  const tbody = document.querySelector("tbody");
  tbody.children[lastIndex].innerHTML = `
        <th scope="row">${lastIndex}</th>
        <td>${nameInput.value}</td>
        <td>${lastInput.value}</td>
        <td>${handleInput.value}</td>
        <td>      
            <button onclick="deleteRow(event)" class="btn btn-danger delete-button-${lastIndex}">Delete row</button>
            <button data-index=${lastIndex} onclick="updateRow(event)" class="btn btn-warning delete-button-${lastIndex}">Update</button>
        </td>
  `;
  data[lastIndex] = {
    name: nameInput.value,
    last: lastInput.value,
    handle: handleInput.value,
  };
  saveButton.classList.add("d-none");
  nameInput.value = "";
  lastInput.value = "";
  handleInput.value = "";
  localStorage.setItem('todo', JSON.stringify(data))
});

//////SEARCH//////////
const searchInput = document.querySelector(".search");
searchInput.addEventListener("input", function() {
  const search = this.value.toLowerCase();
  const filteredData = data.filter(item => {
    return item.name.toLowerCase().includes(search) ||
            item.last.toLowerCase().includes(search) ||
            item.handle.toLowerCase().includes(search);
});

tableBody.innerHTML = "";

filteredData.forEach((item, index) => {
  loadDataToTable(item.name, item.last, item.handle, index);
});
});





