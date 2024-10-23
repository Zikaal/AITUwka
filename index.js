
let clickSound = new Audio('audio/click.mp3');
document.getElementById('secretBtn').addEventListener('click', function() {
    clickSound.play();  
});

document.getElementById('secretBtn').addEventListener('click', function() {
    const santa = document.getElementById('santa');
    santa.style.display = 'block'; 
    santa.style.left = '-300px'; 

    setTimeout(() => {
        santa.style.left = '120vw'; 
        setTimeout(() => {
            santa.style.display = 'none'; 
    }, 8000); 
    }, 100);
});


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


function handleFormSubmit(event, callback) {
    event.preventDefault(); 

    const formData = new FormData(form); 

    fetch('https://jsonplaceholder.typicode.com/posts', { 
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
        alert('Your submission was successful!');
        form.reset(); 
        if (callback) callback(null, data); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error); 
        if (callback) callback(error); 
    });

    modal.style.display = "none"; 
}

form.onsubmit = function(event) {
    handleFormSubmit(event, function(error, data) {
        if (error) {
            console.error('Callback Error:', error);
        } else {
            console.log('Callback Data:', data);
        }
    });
};

document.getElementById('show-time').addEventListener('click', function () {
    document.getElementById('current-time').innerHTML = new Date().toLocaleString();
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
