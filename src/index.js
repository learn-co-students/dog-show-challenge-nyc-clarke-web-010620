document.addEventListener('DOMContentLoaded', () => {
    
    

    const BASE_DOGS = "http://localhost:3000/dogs"

    fetch(BASE_DOGS)
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(addDogs)
    })
    const addDogs = dog => {
        const tbody = document.getElementById("table-body")
        let tr = document.createElement("tr")
        tr.dataset.id = dog.id
        tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button value="edit-btn">Edit</button></td>
        `
        tbody.append(tr)
    }

    document.addEventListener("click", event => {
        switch (event.target.value) {
            case "Submit":
                // take form and make new dog
                let name = event.target.parentNode[0].value
                let breed = event.target.parentNode[1].value
                let sex = event.target.parentNode[2].value
                let id = event.target.parentNode.dataset.id
                if (id){
                    const dog = {name, breed, sex}
                    fetch(`${BASE_DOGS}/${id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json", 
                            accept: "application/json"
                        },
                        body: JSON.stringify(dog)
                    })
                } else {
                    const dog = {name, breed, sex}
                    fetch(`${BASE_DOGS}`, {
                        method: "POST",
                        headers: {
                        "content-type": "application/json", 
                        accept: "application/json"
                        },
                        body: JSON.stringify(dog)
                    })
                }
                

                break;
                case "edit-btn":
                    // take form and make new dog
                    let tr = event.target.parentNode.parentNode
                    let form = document.getElementById("dog-form")
                    form.dataset.id = tr.dataset.id
                    form.children[0].value = tr.children[0].innerText
                    form.children[1].value = tr.children[1].innerText
                    form.children[2].value = tr.children[2].innerText
                    break;
            default:
                break;
        }
    })
})