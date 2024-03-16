let URL = "https://pokeapi.co/api/v2/pokemon/";
const listaPokemon = document.getElementById("listaPokemon"); 
const botonesFiltro = document.querySelectorAll(".btn-filter");

// BOTONES MOSTRAR MAS
const mostrarMasMenos = document.getElementById("mas");

let minimo = 1;
let maximo = 27;

const getPokemon = async(min, max) => {
    if(maximo >= 162){
        mostrarMasMenos.innerHTML = `
        <div class="mas" id="menos">
            <div class="flecha-menos"></div>
            <p>mostrar menos</p>
        </div>
        `;
    }   else mostrarMasMenos.innerHTML = `
        <div class="mas" id="mas">
            <p>mostrar mas</p>
            <div class="flecha"></div>
        </div>
        `;

    try{
        for(let i = min; i <= max; i++){
            const resp = await fetch(URL + i);

            const data = await resp.json();
            await mostrarPokemon(data);
        }
    }catch (error) {
        alert( error );
    }
    
}

const mostrarPokemon = (data) => {
    let tipo = data.types.map(type => 
        `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`
        );
    let tipos = tipo.join('');
    

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="numero">
            <p class="id ">#${ mostrarID( data.id) }</p>
        </div>
        <div class="imagen">
            <img src="${data.sprites.other.home.front_default}" alt="${data.name}">
        </div>

        <div class="poke-info">
            <div class="poke-name">
                <p class="nombre">${data.name.toUpperCase()}</p>
            </div>
            <div class="type">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.base_experience}xp</p>
                <p class="stat">${data.height / 10}m</p>
                <p class="stat">${data.weight / 10}kg</p>
            </div>
        </div>
        `;
    listaPokemon.append(div);
}

const mostrarID = (id) => {
    if(id < 10){
        return ("00" + id);
    }else if(id >= 10 && id < 100){
        return ("0" + id);
    }else return id;
}

getPokemon(minimo, maximo);


mostrarMasMenos.addEventListener("click", () => {
    if(maximo >= 162){
        listaPokemon.innerHTML = '';
        minimo = 1;
        maximo = 27;
    }else {
        minimo += 27;
        maximo += 27;
    }
    console.log(maximo);
     getPokemon(minimo, maximo);
});




botonesFiltro.forEach(boton => boton.addEventListener("click", async(event) =>{
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = '';
    mostrarMasMenos.innerHTML = '';

    if(botonId === "todos"){
        minimo = 1;
        maximo = 27;
        getPokemon(minimo, maximo);
    }else{
        
        try{
            for(let i = 1; i <= 162; i++){
                const resp = await fetch(URL + i);
        
                const data = await resp.json();
                
                const tipoos = data.types.map(type => type.type.name);

                if (tipoos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);
                }
                
            }
        }catch (error) {
            alert( error );
        }
    }
}));

