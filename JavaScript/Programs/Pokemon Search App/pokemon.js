const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const pokemonDisplay = document.querySelector('.pokemon-display');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const typesDisplay = document.getElementById('types');

async function fetchPokemonData(query) {
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        resetApp(); 
        alert(error.message);
        return null;
    }
}

function updatePokemonDisplay(pokemon) {
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonId.textContent = `#${pokemon.id}`;
    
    weight.textContent = `Weight: ${pokemon.weight}`;
    height.textContent = `Height: ${pokemon.height}`;
    
    const stats = pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});
    
    hp.textContent = stats.hp || 'N/A';
    attack.textContent = stats.attack || 'N/A';
    defense.textContent = stats.defense || 'N/A';
    specialAttack.textContent = stats['special-attack'] || 'N/A';
    specialDefense.textContent = stats['special-defense'] || 'N/A';
    speed.textContent = stats.speed || 'N/A';
    
    let spriteImg = document.getElementById('sprite');
    if (spriteImg) {
        spriteImg.remove();
    }
    
    spriteImg = document.createElement('img');
    spriteImg.id = 'sprite';
    spriteImg.style.maxWidth = '100%'; 
    spriteImg.style.height = 'auto';
    spriteImg.src = pokemon.sprites.front_default || '';
    
    pokemonDisplay.appendChild(spriteImg);
    

    typesDisplay.innerHTML = '';
    
    pokemon.types.forEach(typeInfo => {
        const type = typeInfo.type.name;
        const typeBadge = document.createElement('div');
        typeBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        typeBadge.classList.add('type-badge', type);
        typesDisplay.appendChild(typeBadge);
    });
    pokemonDisplay.appendChild(typesDisplay);
    
    pokemonDisplay.classList.add('visible'); 
}

function resetApp() {
    pokemonDisplay.classList.remove('visible');
    pokemonDisplay.classList.add('hidden');
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    
    const spriteImg = document.getElementById('sprite');
    if (spriteImg) {
        spriteImg.remove();
    }

    typesDisplay.innerHTML = '';
    searchInput.value = ''; 
}

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        fetchPokemonData(query).then(pokemon => {
            if (pokemon) {
                updatePokemonDisplay(pokemon);
            } else {
                resetApp(); 
            }
        });
    }
}

searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
});
