document.addEventListener('DOMContentLoaded', () => {
    let table = document.getElementById('table') 


    const baseUrl = 'http://localhost:3000/dogs'

    // Fetch index Page
    fetch(baseUrl)
    .then(response => response.json())
    .then(dogs => dogs.forEach(addDog)) 
    

    const editButtons = Array.from(document.getElementsByClassName('edit-button'))
    const editForm = document.getElementById('dog-form')
    const submitButton = document.getElementsByTagName('input')[3]


    
    
    // Function to List Each Dog into the Table 
    function addDog(dog) {
        let tr = document.createElement('tr')
        tr.dataset.id = dog.id
        tr.innerHTML = `
            <td> ${dog.name} </td>
            <td> ${dog.breed} </td>
            <td> ${dog.sex} </td>
            <td><button class='edit-button'>Edit Dog</button></td>
        `
        
        table.appendChild(tr)
    }

    document.addEventListener('click', function(event) {    // fetch(‘${baseURL}/${dog`}
    if (event.target.className === 'edit-button') {
        const dogId = event.target.parentNode.parentNode.dataset.id
        fetch(`${baseUrl}/${dogId}`)
        .then(resp => resp.json())
        .then(dog => { 
            editForm.name.value = dog.name
            editForm.breed.value = dog.breed
            editForm.sex.value = dog.sex 
            editForm.setAttribute('data-id', dog.id)

        })
    }
    })
    
    // addeventlistenr to submit of the form 
    // 

    editForm.addEventListener('submit', function(event){
        event.preventDefault()
        // const dogId = event.target.parentNode.parentNode.dataset.id
        let data = {name: `${editForm.name.value}`,breed: `${editForm.breed.value}`,sex:`${editForm.sex.value}` }

        fetch(`${baseUrl}/${editForm.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(dog => editDom(dog))

        // document.getElementById(`${editForm.dataset.id}`)
        // document.getElementsByTagName('tr').id === dog.id 
        
    })//FORM EVENT LISTENER 
         
    function editDom(dog){
        let dogId = parseInt(editForm.dataset.id,10)
        let tr = document.querySelectorAll("tr")[dogId]
        tr.innerHTML= 
        `
        <td > ${editForm.name.value} </td>
        <td > ${editForm.breed.value} </td>
        <td > ${editForm.sex.value} </td>
        <td><button class="edit-button"> Edit Dog</button></td>
        `
    }
        
    })

    
