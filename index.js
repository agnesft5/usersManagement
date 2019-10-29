$.ajax({
    "type": "GET",
    "url": "https://reqres.in/api/users?page=2",
    "dataType": "json",
    "headers": { "Content-Type": "application/json" },
    "succes": (data) => { console.log(data) },
    "error": (error) => { console.log(error) },
})