// Simon Dutton
// due April 28th, 2023

const container = document.querySelector('.container');
let newHTML; // have to store this globally since accessing in multiple functions

const getFormData = async (e) => {
    e.preventDefault(); // don't reload the page
    container.innerHTML = '' // set this to nothing to re-start

    // while we are waiting, we print out a little loading message
    newHTML = document.createElement('h1');
    newHTML.innerText = 'Searching for Pokémon...'
    newHTML.className = 'loading'
    container.append(newHTML);

    const inputted_pokemon = e.target.pokemon_input.value; // what the user has typed

    const url = `http://pokeapi.co/api/v2/pokemon/${inputted_pokemon}`

    const response = await fetch(url);
    if (!response.ok || inputted_pokemon == '') { // if the info was not properly received or nothing was inputted
        newHTML.innerText = 'This Pokémon was not found.';
        newHTML.className = 'not-found'
        container.append(newHTML);
    } else { // if the pokemon exists, render the data
        const data = await response.json();
        // reset the searching
        newHTML.innerHTML = '' 
        newHTML.className = ''
        render(data);
    }

}

const render = (data) => {
    newHTML = document.createElement('div') // center the card in the container
    newHTML.style.display = 'flex';
    newHTML.style.justifyContent = 'center';

        newHTML.innerHTML = `
        <div class="basic-card card" align="center" style="width: 12rem; height: 17rem;">
            <h5 class="card-title card-title-top card-title-basic">${data.name}</h5>
            <img class="card-img-top" src="${data.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="...">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                <li class="list-group-item card-text"><b>HP BASE STAT: </b>${data.stats[0].base_stat}</li>
                    <li class="list-group-item card-text"><b>HP ATTACK STAT: </b>${data.stats[1].base_stat}</li>
                    <li class="list-group-item card-text"><b>HP DEFENSE STAT: </b>${data.stats[2].base_stat}</li>
                    <li class="list-group-item card-text"><b>ABILITIES:
                </ul>
            </div>
        </div>
        `

    let abilitiesList = newHTML.querySelector('.list-group') // get the abilities list in the bulleted list
    for (ability of data.abilities) {
        abilitiesList.innerHTML += `<li class="list-group-item card-text">${ability.ability.name}</li>`
    }

    newHTML.insertAdjacentElement("afterEnd", abilitiesList); // put the abilities in the end of the bulleted list

    container.append(newHTML);
}   


const form = document.getElementById('pokemonForm') // get the right form
form.addEventListener('submit', getFormData)