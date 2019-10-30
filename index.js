/////////////////// FUNCIÓN PARA IMPRIMIR ///////////////////
function getEmployees() {
    $.ajax({
        "type": "GET",
        "url": "http://dummy.restapiexample.com/api/v1/employees",
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => { printEmployees(data) },
        "error": (error) => { console.log(error) },
    })
}

//////////////// FUNCIÓ PER IMPRIMIR TOTES ELS EMPLEATS/////////////
function printEmployees(data) {
    let numberOfUsers = 0;
    let perPage = numberOfUsers + 10;
    let maxPages = Math.ceil(parseInt(data.lenght) / 10)

    for (let i = 1; i < maxPages; i++) {
        let currentPage = i;
        if (currentPage = 1) {
            numberOfUsers = 0;
        } else if (currentPage > maxPages) {
            numberOfUsers = perPage
        }
    }

    for (let i = 0; i < data.length; i++) {
        let employee = data[i];
        let profileName = employee["employee_name"];
        let salary = employee["employee_salary"];
        let age = employee["employee_age"];
        let id = employee["id"];
        $(".userTable").append(`<tr data-id="${id}"><td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4eJ3OolirjUOZvZnkWn9sVTjcaDm8uLcyqnLFMNOm9kz56SvD&s" class="user__img"></td><td>${profileName}</td><td>${salary}</td><td>${age}</td><td><div class="btn-group mr-2" role="group" aria-label="First group"><button type="button" class="btn btn-primary searchButton" data-toggle="modal" data-target="#searchModal"><i class="fa fa-search"></i></button><button type="button" class="btn btn-light editButton" data-toggle="modal" data-target="#editModal"><i class="fa fa-pencil"></i></button><button type="button" class="btn btn-danger deleteButton"><i class="fa fa-trash delete__icon"></i></button></div></td></tr>`);
    }
    numberOfUsers += 10;


    /////////// EVENT LISTENER AL BOTÓ SEARCH /////////
    $(".searchButton").each(function () {
        $(this).click(() => { getUser(this) })
    })

    /////////// EVENT LISTENER AL BOTÓ EDIT /////////
    $(".editButton").each(function () {
        $(this).click(() => { getUser(this) })
    })

    /////////// EVENT LISTENER AL BOTÓ SAVE CHANGES DINS DEL MODAL EDIT /////////
    $(".editSaveChanges").each(function () {
        $(this).click(() => { saveEdited() })
    })

    /////////// EVENT LISTENER AL BOTÓ DELETE /////////
    $(".deleteButton").off();
    $(".deleteButton").each(function () {
        $(this).click(() => { deleteUser(this) })

    })

    /////////// EVENT LISTENER AL BOTÓ ADD /////////
    $(".addUserButton").each(function () {
        $(this).click(() => { createUser() })
    })

}



/////////////// FUNCIÓ PER BUSCAR UN EMPLEAT ////////////////////
function getUser(searchButton) {

    let tr = $(searchButton).parent().parent().parent();
    let employeeId = tr.attr("data-id");

    $.ajax({
        "type": "GET",
        "url": `http://dummy.restapiexample.com/api/v1/employee/${employeeId}`,
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => {
            printEmployeeSearch(data)
            printEmployeeEdit(data)
        },
        "error": (error) => { console.log(error) },
    })

}

////////////// FUNCIÓ PER IMPRIMIR UN EMPLEAT ///////////////////
function printEmployeeSearch(data) {
    let employeeName = data["employee_name"]
    let employeeAge = data["employee_age"]
    let employeeSalary = data["employee_salary"]
    $(".searchModal__info").html(`<p><strong>Name</strong><span>     ${employeeName}</span></p><p><strong>Age</strong><span>     ${employeeAge}</span></p><p><strong>Salary</strong><span>     ${employeeSalary}</span></p>`)
}


//////////// FUNCIÓ PER EDITAR UN EMPLEAT//////////////////////////////////
function printEmployeeEdit(data) {
    let employeeId = data["id"]
    let employeeName = data["employee_name"]
    let employeeAge = data["employee_age"]
    let employeeSalary = data["employee_salary"]
    $(".editModal__info").html(`<form class="form-group"> 
    <div class="container">
        <div class="row">
            <div class="col-sm-2">
                <label class="editModal__label" style="font-weight: bold;">Name*</label>
            </div>
            <div class="col-sm-8">
                <input class="editModal__inputName form-control" type="text" value="${employeeName}" placeholder="Employee Name">
            </div>
            <div class="col-sm-2">
                <p class="editModal__text float-right"><i class="fa fa-pencil"></i></p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-2">
                <label class="editModal__label" style="font-weight: bold;">Age*</label>
            </div>
            <div class="col-sm-8">
                <input class="editModal__inputAge form-control" type="text" value="${employeeAge}" placeholder="Employee Age">
            </div>
            <div class="col-sm-2">
                <p class="editModal__text float-right"><i class="fa fa-pencil"></i></p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-2">
                <label class="editModal__label" style="font-weight: bold;">Salary*</label>
            </div>
            <div class="col-sm-8">
                <input class="editModal__inputSalary form-control" type="text" value="${employeeSalary}" placeholder="Employee Salary">
            </div>
            <div class="col-sm-2">
                <p class="editModal__text float-right"><i class="fa fa-pencil"></i></p>
            </div>
        </div>
    </div>
    <input class="editModal__inputId" type="hidden" value="${employeeId}"></div>
</form>`)

}

function saveEdited() {
    let editedName = $(".editModal__inputName").val()
    let editedAge = $(".editModal__inputAge").val()
    let editedSalary = $(".editModal__inputSalary").val()
    let employeeId = $(".editModal__inputId").val()
    console.log(editedName, editedAge, editedSalary, employeeId)

    let objEdited = {
        "name": editedName,
        "salary": editedSalary,
        "age": editedAge,
        "id": employeeId
    };

    console.log(objEdited)


    $.ajax({
        "type": "PUT",
        "url": `http://dummy.restapiexample.com/api/v1/update/${employeeId}`,
        "dataType": "json",
        "data": JSON.stringify(objEdited),
        "headers": {
            "Content-Type": "application/json",
            "X-Requested-Width": "XMLHttpRequest"
        },
        "success": (data) => {
            console.log(data)
            alert("Changes saved!")
        },
        "error": (error) => {
            console.log(error)
            alert("Something went wrong")
        }

    })
}

///////////// FUNCION PARA BORRAR /////////////
function deleteUser(deleteButton) {
    let tr = $(deleteButton).parent().parent().parent();
    let employeeId = tr.attr("data-id");
    console.log(employeeId)



    $.ajax({
        "type": "DELETE",
        "url": `http://dummy.restapiexample.com/api/v1/delete/${employeeId}`,
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => {
            console.log(data)
            tr.remove();
        },
        "error": (error) => { console.log(error) },
    })


}


/////////////////// FUNCIÓ PER CREAR UN USUARI /////////////////////////////
function createUser() {
    let newName = $(".createModal__inputName").val()
    let newAge = $(".createModal__inputAge").val()
    let newSalary = $(".createModal__inputSalary").val()

    let objCreated = {
        "name": newName,
        "salary": newSalary,
        "age": newAge
    };
    console.log(objCreated)
    console.log(newName, newSalary, newAge)

    $.ajax({
        "type": "POST",
        "url": `http://dummy.restapiexample.com/api/v1/create`,
        "dataType": "json",
        "data": JSON.stringify(objCreated),
        "headers": {
            "Content-Type": "application/json",
            "X-Requested-Width": "XMLHttpRequest"
        },
        "success": (data) => {
            console.log(data)
            alert("Well done!!")
        },
        "error": (error) => {
            console.log(error)
            alert("Something went wrong")
        }

    })
}


///////////// EVENT LISTENER /////////////////
$(window).ready(() => {
    getEmployees()
})


