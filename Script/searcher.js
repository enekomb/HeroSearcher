
document.querySelector(".container2 button").addEventListener("click", getData)
document.querySelector(".container4").innerHTML = ""

let nick = "full-name"
id = getId(1, 731)

link2 = `https://superheroapi.com/api.php/109917728141556/`

function getId(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

fetch(link2 + id)
    .then(function (response) {
        return response.json();

    })
    .then(function (random) {
        console.log(random)
        document.querySelector("body .container1").innerHTML =
            `<div class="aleatorio"><div id= "Image"><img src= ${random.image.url}></div>
             <div id= "Name"> ${random.name}</div></div>
             `
             

    });


function getData() {
    var val = document.getElementById('hero-name').value;
    let link1 = `https://superheroapi.com/api.php/109917728141556/search/`
    document.querySelector(".container3").innerHTML = ""

    fetch(link1 + val)
        .then(function (response) {
            return response.json()

                .then(function (search) {
                    console.log(search)
                    document.querySelector("body .container4 ").innerHTML = "";
                    document.querySelector("body .container3").innerHTML =
                        `<div class="search"><div id= "Image"><img src= ${search.results[0].image.url}></div>
             <div id= "name">Name:  ${search.results[0].biography[nick]}</div>
             <div id= "nick-name">Nickname:  ${search.results[0].name}</div>
             <div class= "moreInfo"><button>More info</button></div>`
                    document.querySelector(".moreInfo button").addEventListener("click", function () {



                        document.querySelector("body .container4 ").innerHTML =
                            `<div class= "stats">
                     Combat: ${search.results[0].powerstats.combat}<br>
                     Power:${search.results[0].powerstats.power}<br>
                     Durability:  ${search.results[0].powerstats.durability}<br>
                     Speed: ${search.results[0].powerstats.speed}<br>
                     Strength:  ${search.results[0].powerstats.strength}<br>
                     Occupation: ${search.results[0].work.occupation}<br>
                     </div>`
                        let button = document.createElement("button")
                        button.innerText = "favoritos";
                        if (isInLocalStorage(search.results[0])) {
                            button.style.color = "blue"
                        } else {

                            button.style.color = "red"
                        }
                        button.addEventListener("click", function () {
                            addToFav(search.results[0], button);
                        })
                        document.querySelector("body .container4").appendChild(button);

                    })
                })


        })
};





function addToFav(info, button) {
    if (localStorage.getItem("favoritos")) {
        let localArray = localStorage.getItem("favoritos");
        localArray = JSON.parse(localArray)

        let existInArray = checkIfExistInArray(localArray, info);
        if (existInArray == true) {
            //quitar boton apariencia fav
            button.style.color = "red"
            localArray.forEach((position, index) => {
                if (position.name == info.name) {
                    localArray.splice(index, 1);
                }
            })
        } else {
            button.style.color = "blue"
            //poner boton apariencia fav
            localArray.push(info);
        }

        localArray = JSON.stringify(localArray);
        localStorage.setItem("favoritos", localArray);

    } else {
        button.style.color = "blue"
        //poner boton apariencia fav
        let arrayInfo = [info];
        arrayInfo = JSON.stringify(arrayInfo)
        localStorage.setItem("favoritos", arrayInfo)
    }
}

function checkIfExistInArray(array, obj) {
    let exist = false;
    array.forEach(position => { // array.forEach(function (position) {
        if (position.name == obj.name) {
            exist = true;
        }
    })

    if (exist == true) {
        return true;
    } else {
        return false;
    }
}

function isInLocalStorage(obj) {
    if (localStorage.getItem("favoritos")) {
        let localArray = localStorage.getItem("favoritos");
        localArray = JSON.parse(localArray)

        if (checkIfExistInArray(localArray, obj)) {
            return true
        } else {
            return false
        }

    } else {
        return false
    }

}