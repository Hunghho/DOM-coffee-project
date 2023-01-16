(() => {
"use strict"
function renderCoffee(coffee) {
    var html = '<div class="drop-outer-coffee">';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

const renderCoffees = coffees => {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}


function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
        else if(selectedRoast === 'all') //add option all
        {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

//-------------Search function---------------->

const searchCoffee = document.querySelector('#search');

searchCoffee.addEventListener('input', function (e){
    let searchValue = e.target.value.toLowerCase();
    let inputValue = [];

    coffees.forEach(coffee => {
        if(coffee.name.toLowerCase().includes(searchValue)){
            inputValue.push(coffee);
        }
    })
    tbody.innerHTML = renderCoffees(inputValue);
})

// ADD Coffee to Object 2nd Input Field ------------->

const addCoffee = document.querySelector("#add")

const addCoffeeButton = document.querySelector("#submit-coffee")

const roastType = document.querySelector('#roast-category');

addCoffeeButton.addEventListener("click", function (e){
    e.preventDefault();
    coffees.unshift({id: coffees.length + 1, name: addCoffee.value , roast: roastType.value});

    tbody.innerHTML = renderCoffees(coffees);
    storeLocal();
})

// Input Field End -------------------->

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');


submitButton.addEventListener('click', updateCoffees);

// local storage
    // function to save new coffee input
    function storeLocal(){
        localStorage.setItem('coffees', JSON.stringify(coffees));
    }
        // display saved coffee input back to object
        const newCoffees = JSON.parse(localStorage.getItem('coffees'));
        console.log(newCoffees);

        //once new user add coffee to localStorage, this happen... re declaring new value for coffees object to localStorage object
        if(newCoffees){
            coffees = newCoffees;
        }

tbody.innerHTML = renderCoffees(coffees);

})();