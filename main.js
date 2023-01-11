"use strict"

function renderCoffee(coffee) {
    var html = '<div class="drop-outer-coffee">';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
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
        else if(selectedRoast === 'all')
        {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//------------- First Input Field---------------->

const search = document.querySelector('#coffee-name');
const output = document.querySelector('#coffees');

// window.addEventListener('DOMContentLoaded', loadTable);

search.addEventListener('input', filter)


const loadTable = () => {
    let html = `<div class="outer-coffee">`;
    coffees.forEach(coffee => {
        html+= `
        <div class="inner-coffee">
            <h1>${coffee.name}</h1>
            <p>${coffee.roast}</p>
        </div>
            `
    })

    html += `</div>`
    

    output.innerHTML = html;
}


function filter(e){
    let results;
    let html = "";

    results = coffees.filter(coffee => coffee.name.toLowerCase().includes(e.target.value.toLowerCase()))

    console.log(results);

    if (results.length > 0){
        html = `<div class="outer-coffee">`;
        // html += `<tr>`
        results.forEach(coffee => {
            html+= `
            <div class="inner-coffee">
                <h1>${coffee.name}</h1>
                <p>${coffee.roast}</p>
            </div>
            `
        })

        html += `</div>`
    } else {
        html = `<div class="no-itme">Item Not Found </div>`
    }

    output.innerHTML = html 
}




// ADD Coffee to Object 2nd Input Field ------------->

const newCoffee = document.querySelector("#new-coffee")

const addCoffeeButton = document.querySelector("#submit-coffee")

const roastType = document.querySelector('#roast-category');



console.log(newCoffee.value);



const pushCoffee = e => {
    e.preventDefault()
    let obj = {
    name: `${newCoffee.value}`, roast: `${roastType.value}`
    }

    coffees.push(obj)

    let html = `<div class="outer-coffee">`;
        coffees.forEach(coffee => {
            html+= `
            <div class="inner-coffee">
                <h1>${coffee.name}</h1>
                <p>${coffee.roast}</p>
            </div>
            `    
             })
        html += `</div>`
    output.innerHTML = html 
}

addCoffeeButton.addEventListener('click', pushCoffee)



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

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
