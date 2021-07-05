document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dog-form')
    const table = document.getElementById('table-body')
    const listDogs = function(dog){
        let dogRow = document.createElement('tr')
        dogRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>`
        table.appendChild(dogRow)
        dogRow.addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target.innerText === 'Edit'){
                form.innerHTML =
                    `<input type="text" name="name" value='${dog.name}' />
                    <input type="text" name="breed" value='${dog.breed}' />
                    <input type="text" name="sex" value='${dog.sex}' />
                    <input type="submit" value="Submit" />`
                form.addEventListener('submit', (e) => {
                    e.preventDefault()
                    fetch(`http://localhost:3000/dogs/${dog.id}`,{
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            accept: "application/json"
                        },
                        body: JSON.stringify({'name':form.name.value, 'breed':form.breed.value, 'sex':form.sex.value})
                    })
                    table.innerHTML = ''
                    fetch('http://localhost:3000/dogs')
                        .then(resp => resp.json())
                        .then(dogs => dogs.forEach(dog => listDogs(dog)))
                })
            }
        })
    }
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => listDogs(dog)))
    
})