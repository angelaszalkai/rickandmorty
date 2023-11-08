const rootElement = document.querySelector(#root)

const fetchUrl = (url) => fetch(url).then(res => res.json())

/*
//FETCH THEN-NEL (ASYNC AWAT HELYETT):
fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
*/

//returns an HTML string with the values of character object
const characterComponent = (characterData) => `
    <div class="char">
        <img src="${character.image}">    
        <h2>${character.name}</h2>
        <h3>appears in: ${character.episode.length} episodes</h3>
    </div>
`

const init = () => {
    fetchUrl("https://rickandmortyapi.com/api/character"). then(data => {
        //console.log(data)
        
        const info = data.info  //ez az info object
        const characters = data.results //ez a characters array

        characters.forEach(character => rootElement.insertAdjacentHTML("beforeend", characterComponent(character)))
    })
}

init()
