document.addEventListener('DOMContentLoaded', () => {
    fetchData()

    buttonEventListener()
    formEventListener()
})

function fetchData(){
    return fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(json => {
        json.forEach(dog => renderRegisteredDog(dog))
    })
}

function renderRegisteredDog(dog){
    const table = document.getElementById("table-body")
    const row = document.createElement('tr')
    row.className = "dog-info"
    row.dataset.dogId = dog.id
    row.innerHTML = `
    <td name="name">${dog.name}</td>
    <td name="breed">${dog.breed}</td>
    <td name="sex">${dog.sex}</td>
    <button class="edit-button">Edit</button>
    `
    table.appendChild(row)
}

function buttonEventListener(){
    const form = document.getElementById("dog-form")
    document.addEventListener("click", function(event){
        if (event.target.className === "edit-button"){
            let dogInfo = event.target.parentNode
            form.dataset.dogId = dogInfo.dataset.dogId
            form.elements["name"].value = dogInfo.children["name"].innerText
            form.elements["breed"].value = dogInfo.children["breed"].innerText
            form.elements["sex"].value = dogInfo.children["sex"].innerText
        }
    })
}

function formEventListener(){
    const form = document.getElementById("dog-form")
    form.addEventListener("submit", function(event){
        event.preventDefault()
        fetch(`http://localhost:3000/dogs/${event.target.dataset.dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target.elements["name"].value,
                breed: event.target.elements["breed"].value,
                sex: event.target.elements["sex"].value
            })
        })
        .then(resp => resp.json())
        .then(fetchData())
        form.dataset.dogId = null
        form.elements["name"].value = null
        form.elements["breed"].value = null
        form.elements["sex"].value = null
    })
}