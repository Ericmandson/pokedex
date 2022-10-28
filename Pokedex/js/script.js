const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokeImagem = document.querySelector('.pokemon_image');
const formulario = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev =document.querySelector('.btn-prev');
const button_next =document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
      return data;
    }   
}

const renderPokemon = async (pokemon) =>{
   
   pokemonName.innerHTML = 'Loading ...';
   pokemonNumber.innerHTML = '';

   const data =await fetchPokemon(pokemon);
   if (data){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokeImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value ='';
    searchPokemon = data.id;
    } else{
        pokeImagem.style.display = 'none';
        pokemonName.innerHTML = 'Pokemon não existe';
        pokemonNumber.innerHTML = '';
    }
}

formulario.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    });

    buttonPrev.addEventListener('click', () =>{
       if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }});
    button_next.addEventListener('click', () =>{
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    });
   
   
    renderPokemon(searchPokemon);

