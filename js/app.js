// browser onscroll
const navBar = document.querySelector(".navbar");
window.onscroll = () => {
    if (window.scrollY > 0) {
        navBar.classList.add("shadow-sm")
    } else {
        navBar.classList.remove("shadow-sm")
    }
};


const loadData = () => {
    const inputField = document.getElementById("inputField");
    const inputEmptyError = document.getElementById("input-empty");
    const inputText = inputField.value;
    inputField.value = "";
    if (inputText === "") {
        inputEmptyError.classList.remove("d-none");
    } else {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));
            inputEmptyError.classList.add("d-none");
    }
    
};


const displayData = dataList => {
    const drinks = dataList.drinks;
    const itemContainer = document.getElementById("item-container");
    itemContainer.textContent = "";
    // console.log(dataList);
    if (dataList.drinks === null) {
        itemContainer.classList.add("justify-content-end")
        const div = document.createElement("div");
        div.className = "col-md-6 justify-content-around d-flex ";
        div.innerHTML = `
        <h2 class ="text-warning text-center" >Drink not found!!</div>
        `;
        itemContainer.appendChild(div);
        document.getElementById("item-details-container").textContent = "";
    } else {
        drinks.forEach(drink => {
            const div = document.createElement("div");
            div.className = "col-md-6 col-lg-4";
            div.innerHTML = `
                        <div onclick="drinksFullinfo(${drink.idDrink})" class="single-item">
                            <div class="item-photo">
                                <img src="${drink.strDrinkThumb}" alt="" class="w-100">
                            </div>
                            <h4>${drink.strDrink}</h4>
                            <p>${drink.strInstructions.slice(0, 50)}</p>
                    </div>
            `;
            itemContainer.appendChild(div);
            // console.log(drink);
        });
    }
    
};


const drinksFullinfo = drinkId => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => drinkFullifoDisplay(data.drinks[0]));

};

const drinkFullifoDisplay = drinkInfo => {
    const fullDetails = document.getElementById("item-details-container");
    fullDetails.textContent = "";
    fullDetails.innerHTML = `
                <div class="item-details">
                    <div class="full-photo">
                        <img src="${drinkInfo.strDrinkThumb}" alt="" class="w-100">
                    </div>
                    <h3 class="mb-2">${drinkInfo.strDrink}</h3>
                    <small class="mb-2">Type <span class="hightlight">${drinkInfo.strAlcoholic}</span></small>
                    <h6>Cetogory: ${drinkInfo.strCategory}</h6>
                    <p class="text-muted">${drinkInfo.strInstructions}</p>
                    <p>Ingredients:
                        <span class="hightlight-2">${drinkInfo.strIngredient1}</span>
                        <span class="hightlight-2">${drinkInfo.strIngredient2}</span>
                        <span class="hightlight-2">${drinkInfo.strIngredient3}</span>
                        <span class="hightlight-2">${drinkInfo.strIngredient4}</span>
                        <span class="hightlight-2">${drinkInfo.strIngredient5}</span>
                        <span class="hightlight-2">${drinkInfo.strIngredient6}</span>
                    </p>
                </div>
    `;
    console.log(drinkInfo);
}