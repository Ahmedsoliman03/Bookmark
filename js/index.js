var bookMarkName = document.getElementById("bookMarkName");
var bookMarkUrl = document.getElementById("bookMarkUrl");
var tableContent = document.getElementById("tableContent")
var box = document.getElementById("box");
var exampleModal = document.getElementById("exampleModal")
var itemList = []
if (localStorage.getItem("items") != null) {
    itemList = JSON.parse(localStorage.getItem("items"))
    displayItem(itemList)
}
function validateInp(element) {
    var regex = {
        bookMarkName: /^[A-Za-z0-9]{3,}$/,
        bookMarkUrl: /^((http|https):\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.add("d-none")

    }
    else {
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        element.nextElementSibling.classList.remove("d-none")
    }
}
function createItem() {
    var item = {
        name: bookMarkName.value,
        url: bookMarkUrl.value
    }
    if (bookMarkName.classList.contains("is-valid") && bookMarkUrl.classList.contains("is-valid")) {
        itemList.push(item)
        clearInputs();
        displayItem(itemList)
        localStorage.setItem("items", JSON.stringify(itemList))
      
    }
    else {
        exampleModal.classList.remove("d-none")
    }
    bookMarkName.classList.remove("is-valid")
    bookMarkUrl.classList.remove("is-valid")
}
function clearInputs() {
    bookMarkName.value = null
    bookMarkUrl.value = null
}
function displayItem(list) {
    var box = ``;

    for (var i = 0; i < list.length; i++) {

        box += `
        <tr>
                        <td>${i + 1}</td>
                        <td> <i class="fa-brands fa-${list[i].name.toLowerCase()} me-1"></i>${list[i].name}</td>
                        <td class="d-flex align-items-center justify-content-center"><a href="${itemList[i].url}" target="_blank" class="py-2 px-3 border-0 rounded a-visit"><i class="fa-solid fa-eye pe-2 text-white"></i>Visit</a></td>
                        <td><button class="btn btn-danger " onclick="deleteItem(${i})"> <i class="fa-solid fa-trash-can pe-2 text-white "></i> Delete</button></td>
                    </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = box;
}
function deleteItem(index) {
    itemList.splice(index, 1)
    localStorage.setItem("items", JSON.stringify(itemList))
    displayItem(itemList)
}

