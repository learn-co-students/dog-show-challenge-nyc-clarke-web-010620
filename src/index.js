document.addEventListener('DOMContentLoaded', () => {
    const BASEURL = "http://localhost:3000/dogs" //BASEURL
    
    //FETCHDOGS
    fetch(BASEURL)
    .then(resp => resp.json())
    .then(dogs => {
    console.log(dogs)
    })//FETCHDOGS





})//DOMContentLoaded