document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(addDog))

    function addDog(dog){
        let tbody = document.getElementById('table-body')
        let tr = document.createElement('tr')
        tr.dataset.id = dog.id

        tr.innerHTML = `
        <td data-attr = "name">${dog.name}</td>
        <td data-attr = "breed">${dog.breed}</td>
        <td data-attr = "sex">${dog.sex}</td>
        <td><button class = "edit-button" > Edit Button </button></td>
        `
        tbody.append(tr)
    }

    let dogForm = document.getElementById('dog-form')
    document.addEventListener('click', function(event){
        if (event.target.className === "edit-button"){
            
            let tableRow = event.target.parentNode.parentNode.dataset.id
            fetch(`http://localhost:3000/dogs/${tableRow}`)
            .then(resp => resp.json())
            .then(dog => {
                dogForm.name.value = dog.name
                dogForm.breed.value = dog.breed
                dogForm.sex.value = dog.sex
                dogForm.setAttribute('id', dog.id)
            })
            
            // Array.from(tableRow.children).forEach(td =>{
            // switch (td.dataset.attr) {
            //     case "name":
            //         dogForm.name.value = td.innerHTML
            //         break;

            //     case "breed":
            //         dogForm.breed.value = td.innerHTML
            //         break;
        
            //     case "sex":
            //         dogForm.sex.value = td.innerHTML
            //         break;

            //     default:
            //         break;
            // }
        
        }
    })

    
    dogForm.addEventListener('submit', function(event){
        event.preventDefault()

        console.log(event.target)

        data = {
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
        }

        fetch(`http://localhost:3000/dogs/${dogForm.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
            
        })
        .then(resp => resp.json())
        .then(data => {
            dogForm.reset()
            let tableRow = document.querySelector(`[data-id = '${event.target.id}'] `)
            tableRow.innerHTML = `
            <td data-attr = "name">${data.name}</td>
            <td data-attr = "breed">${data.breed}</td>
            <td data-attr = "sex">${data.sex}</td>
            <td><button class = "edit-button" > Edit Button </button></td>
            `
        })
    })

})