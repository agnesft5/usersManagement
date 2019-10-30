/////////////////// FUNCIÓN PARA IMPRIMIR ///////////////////
function getEmployees() {
    $.ajax({
        "type": "GET",
        "url": "https://cors-anywhere.herokuapp.com/https://recursoshumanos.free.beeceptor.com",
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
    let maxPages = Math.ceil(parseInt(data.lenght)/10)
    
    for (let i = 1; i<maxPages; i++){
        let currentPage = i;
        if(currentPage = 1){
            numberOfUsers = 0;
        }else if(currentPage > maxPages){
            numberOfUsers = perPage
        }
    }

    for (let i = 0; i < numberOfUsers+10; i++) {
        let employee = data[i];
        let profileName = employee["employee_name"];
        let salary = employee["employee_salary"];
        let age = employee["employee_age"];
        let id = employee["id"];
        $(".userTable").append(`<tr data-id="${id}"><td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4eJ3OolirjUOZvZnkWn9sVTjcaDm8uLcyqnLFMNOm9kz56SvD&s" class="user__img"></td><td>${profileName}</td><td>${salary}</td><td>${age}</td><td><div class="btn-group mr-2" role="group" aria-label="First group"><button type="button" class="btn btn-primary searchButton"><i class="fa fa-search"></i></button><button type="button" class="btn btn-light editButton"><i class="fa fa-pencil"></i></button><button type="button" class="btn btn-danger deleteButton"><i class="fa fa-trash delete__icon"></i></button></div></td></tr>`);
    }
    numberOfUsers += 10;
    
    $(".deleteButton").off();
    $(".deleteButton").click((event) => { deleteUser(event.target) })
}


/////////////// FUNCIÓ PER IMPRIMIR UN EMPLEAT ////////////////////


///////////// FUNCION PARA BORRAR /////////////
function deleteUser(deleteButton) {
    let tr = $(deleteButton).parent().parent().parent();
    let employeeId = tr.attr("data-id");
    console.log(employeeId)


    $.ajax({
        "type": "DELETE",
        "url": `https://recursoshumanos.free.beeceptor.com/delete/${employeeId}`,
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => {
            console.log(data)
            tr.remove();
        },
        "error": (error) => { console.log(error) },
    })


}


///////////// EVENT LISTENER /////////////////
$(window).ready(() => {
    getEmployees()
})
