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