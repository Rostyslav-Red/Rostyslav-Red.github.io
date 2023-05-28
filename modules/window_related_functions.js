function windowInit (windowText){
    let window = document.createElement("div")
    window.setAttribute("id", "window")
    window.innerText = windowText
    document.body.appendChild(window)
    setTimeout(windowClose, 1000)
}

function windowClose (){
    let window = document.querySelector("#window")
    console.log(window)
    window.remove()
}


export {windowInit}
