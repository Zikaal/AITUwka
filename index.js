const colors = ['#f0f8ff','#fff'];
let colorIndex = 0;

const button = document.getElementById('colorBtn');

function changeBackgroundColor() {
    document.body.style.backgroundColor = colors[colorIndex];
    
    colorIndex++;

    if (colorIndex >= colors.length) {
        colorIndex = 0;
    }
}

button.addEventListener('click', changeBackgroundColor);


const modal = document.getElementById('myModal'); 
const openFormBtn = document.getElementById('openFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const form = document.getElementById('contactForm');

        
openFormBtn.onclick = function() {
    modal.style.display = "block";
}

closeFormBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

form.onsubmit = function(event) {
    event.preventDefault();
    alert("Message sent!");
    modal.style.display = "none";  
}


