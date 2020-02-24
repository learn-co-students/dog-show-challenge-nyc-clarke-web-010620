document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/dogs')
        .then((response) => {
            return response.json();
        })
        .then(dogs => dogs.forEach(addDog))
            

            function addDog(dog) {
            let dogTable = document.querySelector("#table-body")
            // console.log(dogTable)
            let tr = document.createElement("tr")
            tr.id = dog.id
            tr.innerHTML = `
                    <td class = "name">${dog.name}</td>
                    <td class = "breed">${dog.breed}</td>
                    <td class = "sex">${dog.sex}</td>
                    <td><button data-id="edit-button">Edit</button></td>
                    `
                dogTable.appendChild(tr)
            
            }
        

        let tableBody = document.getElementById("table-body")
        let form = document.querySelector("#dog-form")

    tableBody.addEventListener("click", function(event){
        if (event.target.dataset.id === ("edit-button")) {
        let dogId= event.target.parentNode.parentNode.id
        
        fetch(`http://localhost:3000/dogs/${dogId}`)
            .then((response) => {
                return response.json();
            })
            .then((dog) => {
            form.name.value = dog.name
            form.breed.value = dog.breed
            form.sex.value = dog.sex
            form.dataset.id = dog.id 
            });


            }
            

    })
    
    form.addEventListener("submit", function(event){
            event.preventDefault()
            // console.log(event.target)

            const data = { name: event.target.name.value,
                breed: event.target.breed.value,
                sex: event.target.sex.value}
                console.log(data)
            let dogId= event.target.parentNode.parentNode.dataset.id   
            console.log(form.dataset.id)     
            fetch(`http://localhost:3000/dogs/${form.dataset.id}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                form.reset()
                let tr = document.getElementById(`${form.dataset.id}`)
                tr.innerHTML = `
                    <td class = "name">${data.name}</td>
                    <td class = "breed">${data.breed}</td>
                    <td class = "sex">${data.sex}</td>
                    <td><button data-id="edit-button">Edit</button></td>
                    `


                console.log(tr)
            })
            
        })
      
})//domload 