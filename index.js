const colors = ['#f0f8ff','#fff', '#000'];
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
    const formData = new FormData(form);

    fetch('https://jsonplaceholder.typicode.com/posts', { // Updated to a valid endpoint
        method: 'POST', 
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Success:', data);
        alert('Your submission was successful!')
        form.reset(); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error); 
    });
    
    modal.style.display = "none"; 
}

document.getElementById('show-time').addEventListener('click', function () {
    document.getElementById('current-time').innerHTML = new Date().toLocaleString();
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const links = sidebar.querySelectorAll('a');

    links[0].focus();

    sidebar.addEventListener('keydown', function(event) {
        let currentIndex = Array.prototype.indexOf.call(links, document.activeElement);

        if (event.key === 'ArrowDown') {
            if (currentIndex < links.length - 1) {
                links[currentIndex + 1].focus();
            }
            event.preventDefault(); 
        } else if (event.key === 'ArrowUp') {
            if (currentIndex > 0) {
                links[currentIndex - 1].focus();
            }
            event.preventDefault(); 
        }
    });
});

document.getElementById('language').addEventListener('change', function () {
    const selectedLanguage = this.value; 

    const translatableElements = document.querySelectorAll('[data-en], [data-ru]');

    translatableElements.forEach(element => {
        element.textContent = element.getAttribute(`data-${selectedLanguage}`);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${selectedLanguage}`);
        }
    });
});

const dropArea = document.getElementById('drop-area');
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const uploadVideoBtn = document.getElementById('uploadVideoBtn');

function createFileInput(acceptType) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptType;
    input.style.display = 'none';
    return input;
}

uploadPhotoBtn.addEventListener('click', () => {
    const fileInput = createFileInput('image/*');
    fileInput.click();
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
});

uploadVideoBtn.addEventListener('click', () => {
    const fileInput = createFileInput('video/*');
    fileInput.click();
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('hover');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        handleFileUpload(file);
    }
});

function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.maxWidth = '100%';
            dropArea.innerHTML = ''; // Clear the drop area
            dropArea.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = event.target.result;
            video.controls = true;
            video.style.maxWidth = '100%';
            dropArea.innerHTML = ''; // Clear the drop area
            dropArea.appendChild(video);
        } else {
            alert('Invalid file type! Please upload a valid image or video.');
        }
    };
    reader.readAsDataURL(file);
}
