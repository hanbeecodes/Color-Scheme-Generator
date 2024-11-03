
const colorPalette = document.getElementById("color-palette")
const footer = document.getElementById("hex-display")
let numb = document.getElementById("number-of-colors")

function dataClean() {
    //need a function here to check if any hex values fed back in the data are the same
    
    //perhaps use a filter function to filter out the duplicates?
}

function renderPalette(data) {

    let colorNumbers = Number(numb.value)
    let color = {}
    
    colorPalette.innerHTML = ""
    footer.innerHTML = ""
    
    for(let i = 0; i < colorNumbers; i++) {
        
        color[i] = data.colors[i].name
        
        //Organise the page according to number of colors chosen by user
        colorPalette.style.gridTemplateColumns = `repeat(${i+1}, 1fr)`
        footer.style.gridTemplateColumns = `repeat(${i+1}, 1fr)`
        
        //Render the different stripes of the color scheme to the page through innerHTML
        colorPalette.innerHTML += 
            `<div id="color${i}" style="background-color:${data.colors[i].name.closest_named_hex}"></div>`
            
        //Render the hex values to the corresponding area beneath the color panels
        footer.innerHTML +=
            `<div id="color${i}-hex" aria-label="Hex Value">${data.colors[i].name.closest_named_hex}</div`
        
    }
}

//Event listener on the "get color scheme" submit button
document.getElementById("get-scheme-btn").addEventListener("click", function (e) {
    
    //Below it takes information from the user input, assigned to variables
    
    let baseColor = document.getElementById("color-input").value
    baseColor = baseColor.slice(1)
    
    let scheme = document.getElementById("scheme-type-selector").value.toLowerCase()
    
    //Fetch request uses the user input variables in string literal to create request
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${scheme}&count=${numb.value}`)
        .then(response => response.json())
        .then(data => renderPalette(data))
})