let nick = "full-name"

if (localStorage.getItem("favoritos")) {
    let local = JSON.parse(localStorage.getItem("favoritos"))
    local.forEach(element => {
        document.querySelector("main .container").innerHTML += `<div class="subContainer"><div class= "Image"><img src= ${element.image.url}></div>
      <div class= "name">Name:  ${element.biography[nick]}</div>
      <div class= "nick-name">Nickname:  ${element.name}</div></div>
      `
    })

}

document.querySelector("main h2").innerHTML += `<button>delete all</button>`
document.querySelector("button").addEventListener("click", function () {
    localStorage.clear("favoritos");
    window.location.href = "favorites.html"
})