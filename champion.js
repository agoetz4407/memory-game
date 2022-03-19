var initials = document.getElementById("initials")
var score = document.getElementById("score")

function loadChamp() {
    var champion = localStorage.getItem("MemoryGameChamp")
    if (!champion) {
        initials.innerText = "None Yet!"
        score.innerHTML = "<i>n/a</i>"
        return
    }
    champion = JSON.parse(champion)
    initials.innerText = champion.initials
    score.innerText = champion.score
}

loadChamp()