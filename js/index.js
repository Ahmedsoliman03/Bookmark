var bookMarkName = document.getElementById("bookMarkName");
var bookMarkUrl = document.getElementById("bookMarkUrl");
var tableContent = document.getElementById("tableContent");
var box = document.getElementById("box");
var exampleModal = document.getElementById("exampleModal");
var layer = document.getElementById("layer");
var itemList = [];


if (localStorage.getItem("items") != null) {
    itemList = JSON.parse(localStorage.getItem("items"));
    displayItem(itemList);
}


function validateInp(element) {
    var regex = {
        bookMarkName: /[A-Za-z]{3,}/,
        bookMarkUrl: /^((http|https):\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/
    };
    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
        return false;
    }
}

function createItem() {
    var item = {
        name: bookMarkName.value,
        url: bookMarkUrl.value
    };
    if (validateInp(bookMarkName) && validateInp(bookMarkUrl)) {
        itemList.push(item);
        clearInputs();
        displayItem(itemList);
        localStorage.setItem("items", JSON.stringify(itemList));
}
}
function clearInputs() {
    bookMarkName.value = "";
    bookMarkUrl.value = "";
    bookMarkName.classList.remove("is-valid", "is-invalid");
    bookMarkUrl.classList.remove("is-valid", "is-invalid");
}

function displayItem(list) {
    var box = ``;
    for (var i = 0; i < list.length; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td> <i class="fa-brands fa-${list[i].name.toLowerCase()} me-1"></i>${list[i].name}</td>
            <td><a href="${itemList[i].url}" target="_blank" class="py-2 px-3 border-0 rounded a-visit"><i class="fa-solid fa-eye pe-2 text-white"></i>Visit</a></td>
            <td><button class="btn btn-danger " onclick="deleteItem(${i})"> <i class="fa-solid fa-trash-can pe-2 text-white "></i> Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tableContent").innerHTML = box;
}


function deleteItem(index) {
    itemList.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(itemList));
    displayItem(itemList);
}
