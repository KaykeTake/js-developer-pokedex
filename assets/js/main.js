const pokemonList = document.getElementById('pokemonList')
const pokemonDetails = document.getElementById('pokemonDetails')
const dialog = document.getElementById('pokemonDialog');
const closeButton = document.getElementById('closeButton');

const maxRecords = 151
const limit = 151
let offset = 0
let allPokemons = ''

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-text-pokemon="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function pokemonDetailsDialog(pokemon) {
    return `
        <li class="pokemonDialogLi">
            <div class="backgroundDialog ${pokemon.type}">
                <div class="headerDialog">
                    <span class="pokemonName">${pokemon.name}</span>
                    <span class="">#${pokemon.number}</span>
                </div>
                <div>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
                <span class="">HP: ${pokemon.stats[0].base_stat}</span>
                <span class="">ATTACK: ${pokemon.stats[1].base_stat}</span>
                <span class="">DEFENSE: ${pokemon.stats[2].base_stat}</span>
                <span class="">SPEED: ${pokemon.stats[5].base_stat}</span>
                <div class="typeList">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </div>
            <p>Moves:<p>
            <ol class="moves">
                ${pokemon.moves.map((move) => `<li class="move">${move}</li>`).join('')}
            </ol>
        </li>
    `
}

function getPokemonClicked() {
    document.querySelectorAll('.pokemon').forEach((pokemonElement) => {
        pokemonElement.addEventListener('click', () => {
            const pokemon = parseInt(pokemonElement.getAttribute('data-Text-pokemon'))
            myFunction(pokemon)
        });
    });
}

function myFunction(data) {
    pokemonDetails.innerHTML = '';
    // Assuming pokeApi and offset, limit are defined somewhere
    allPokemons.then((pokemons = []) => {
        const pokemonFounded = pokemons.find(pokemon => pokemon.number === data);
        const newHtml = pokemonDetailsDialog(pokemonFounded);
        pokemonDetails.innerHTML += newHtml;
    }).then(() => {
        dialog.showModal();
    });
}
closeButton.onclick = function () {
    dialog.close();
};


function loadPokemonItens(offset, limit) {
    allPokemons = pokeApi.getPokemons(offset, limit)
    allPokemons.then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }).then(() => {
        getPokemonClicked()
    })
}

loadPokemonItens(offset, limit)