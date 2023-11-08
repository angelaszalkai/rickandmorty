const rootElement = document.querySelector("#root")

const fetchUrl = (url) => fetch(url).then(res => res.json())

const skeletonComponent = () => `
  <div class="characters"></div>
  <div class="buttons"></div>
`

//returns an HTML string with the values of character object (image, name <h2>-ben, 'appears in: x episodes' in <h3>)
const characterComponent = (characterData) => ` 
  <div class="char">
    <img src=${characterData.image}>
    <h2>${characterData.name}</h2>
    <h3>appears in: ${characterData.episode.length} episodes</h3>
  </div>
`

//button component
const buttonComponent = (id, text) => `<button id=${id}>${text}</button>`

//button event component, ebben van az esemenyfigyelo (.addEventListener)
const buttonEventComponent = (id, url) => {
  const buttonElement = document.querySelector(`#${id}`)
  buttonElement.addEventListener("click", () => {
    console.log(`fetch: ${url}`)
    rootElement.innerHTML = "LOADING..."
    fetchUrl(url).then(data => makeDomFromData(data, rootElement))
  })
}

const makeDomFromData = (data, rootElement) => {
  rootElement.innerHTML = skeletonComponent()

  const charactersElement = document.querySelector(".characters")
  const buttonsElement = document.querySelector(".buttons") 

  const info = data.info
  const characters = data.results

  characters.forEach(character => charactersElement.insertAdjacentHTML("beforeend", characterComponent(character)))

//GOMBOKAT LETREHOZZA, IF-EKKEL VAN MEGHATAROZVA, MIKOR, MELYIK KELL
//megvizsgaljuk, hogy letezik-e a prev
  if (info.prev) {
    buttonsElement.insertAdjacentHTML("beforeend", buttonComponent("prev", "previous"))
    buttonEventComponent("prev", info.prev)
  }

//megvizsgaljuk, hogy letezik-e a next
  if (info.next) {
    buttonsElement.insertAdjacentHTML("beforeend", buttonComponent("next", "next"))
    buttonEventComponent("next", info.next)
  }
}

const init = () => {
  rootElement.innerHTML = "LOADING..."
  fetchUrl("https://rickandmortyapi.com/api/character").then(data => makeDomFromData(data, rootElement))
}

init()






/*
//HIANYOS, EZ AZ, AMIT EN IRTAM A WS-ON

const rootElement = document.querySelector(#root)

const fetchUrl = (url) => fetch(url).then(res => res.json())
*/
/*
//FETCH THEN-NEL (ASYNC AWAT HELYETT):
fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
*/
/*
//returns an HTML string with the values of character object
const characterComponent = (characterData) => `
    <div class="char">
        <img src="${character.image}">    
        <h2>${character.name}</h2>
        <h3>appears in: ${character.episode.length} episodes</h3>
    </div>
`


//button component
const buttonComponent = (id, text) => `<button id=${id}>${text}</button>`

const makeDomFromData = (data, rootElement) => {
    const info = data.info  //ez az info object
    const characters = data.results //ez a characters array
    
    characters.forEach(character => rootElement.insertAdjacentHTML("beforeend", characterComponent(character)))

    console.log(info)

    //GOMBOKAT LETREHOZZA, IF-EKKEL VAN MEGHATAROZVA, MIKOR, MELYIK KELL
    //megvizsgaljuk, hogy letezik-e a prev
    if (info.prev) {
        rootElement.insertAdjacentHTML("beforeend", buttonComponent("prev", "previous"))
        //ESEMENYFIGYELO IDE - .addEventListener() - ez vegul ki lett "szervezve" a buttonEventComponent-be
    }

    //megvizsgaljuk, hogy letezik-e a next
    if (info.next) {
        rootElement.insertAdjacentHTML("beforeend", buttonComponent("next", "next"))
        //ESEMENYFIGYELO IDE - .addEventListener() - ez vegul ki lett "szervezve" a buttonEventComponent-be
    }


}


const init = () => {
    fetchUrl("https://rickandmortyapi.com/api/character").then(data => makeDomFromData(data, rootElement))
        //console.log(data)  
}

init()
*/