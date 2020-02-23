document.addEventListener('DOMContentLoaded', () => {
    
    const BASE_URL = "http://localhost:3000/dogs" //BASEURL
    const dogsTableBody = document.getElementById("table-body") //DOGS TABLE BODY
    const dogForm = document.getElementById("dog-form") //DOG FORM
    document.addEventListener("click",handleEvents) //DOCUMENT EVENT LISTENER

    //FETCHDOGS
    function fetchDogs () {
    fetch(BASE_URL)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(populateDogsTable))
    }
    fetchDogs()
    //FETCHDOGS
    
    //POPULATE TABLE
    function populateDogsTable(dog) {
    dogsTableBody.innerHTML += `<tr data-id=${dog.id}>
        <td data-attr="name"> ${dog.name} </td>
        <td data-attr="breed">${dog.breed}</td>
        <td data-attr="sex">${dog.sex}</td>
        <td><button id="edit-button">EDIT</button></td>
        </tr>`
    }//POPULATE TABLE

    //EDIT BUTTON DELIV
    //make clickable
    //input dog data into form when clicked
    //on submit, patch to update dog info in table
    
    //HANDLE EVENTS
    function handleEvents(e){
        e.preventDefault()//STOP SUBMIT RELOAD
        
        //BUTTON SWITCH
        switch (e.target.id) {
            case "edit-button":
                editDog(e)    
                break;
            
            case "submit":
                submitEdit(e)
                $("#table_of_items tr").remove(); 
                fetchDogs();
                break;
        }//BUTTON SWITCH
    }//HANDLE EVENTS
    
    function editDog(e) {
        let dogId = e.target.parentNode.parentNode.dataset.id 
        fetch(`${BASE_URL}/${dogId}`)
        .then(resp => resp.json())
        .then(dog => {
            dogForm.name.value = dog.name
            dogForm.breed.value = dog.breed
            dogForm.sex.value = dog.sex
            dogForm.dataset.id = dog.id
        })//FETCH .THEN    
    }//EDIT DOG FUNCTION
    




    function submitEdit(e) {
    let dog; //ISSA VARIABLE
    getDog();//THIS FINDS THE DOG TO BE UPDATED
    
        //THIS FUNCTION FINDS THE DOG TO BE UPDATED
        function getDog(){
	        fetch(`${BASE_URL}/${e.target.parentNode.dataset.id}`)
		        .then(resp => {
			    return resp.json();
		        })
		        .then(body => {
                editDog(body)
		    });
         }
            
        function editDog(dog) {
            fetch(`${BASE_URL}/${dog.id}`,{
                method: 'PATCH',
                headers: {
                "content-type": 'application/json',
                accepts: 'application/json'
                },
                body: JSON.stringify({
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value
                })
                })
            .then (resp => resp.json())
            .then (dog =>{
                let dogId= dog.id.toString(10) 
                let dogRow = document.querySelector(`tr[data-id="${dogId}"]`)  
                for (const child of dogRow.children) {
                    switch (child.dataset.attr) {
                    case "name":
                        child.innerHTML = dogForm.name.value
                        break;
                    case "breed":
                        child.innerHTML = dogForm.breed.value
                        break;
                    case "sex":
                        child.innerHTML = dogForm.sex.value
                        break; 
                    default:
                        break;
                    }//EDIT TABLE ROW SWITCH 
                }//TABLE ROW ITERATION 
            })//FETCH POST PATCH .THEN 
        }//FETCH EDIT PATCH FUNCTION 
    }//SUBMIT EDIT FORM
})//DOMContentLoaded