const fileNames = ["current_words.js", "grid.js", "keyboard.js", "words_db.js"];

fileNames.forEach(function(element){
    let script = document.createElement("script");
    script.setAttribute("type", "module");
    script.setAttribute("src", "./modules/"+element);
    document.body.append(script);
})