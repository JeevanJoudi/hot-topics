document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamic-content');
    const links = document.querySelectorAll('.nav-links a'); 

    const loadContent = (urlFeed) => {
        fetch(urlFeed)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                container.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error loading content:', error);
                container.innerHTML = "<p>Error loading content. Please try again later.</p>";
            });
    };

   
    const selectContent = (event) => {
        event.preventDefault();
        const urlFeed = event.currentTarget.getAttribute('href'); 
        loadContent(urlFeed); 
    };


    links.forEach(link => {
        link.addEventListener('click', selectContent);
    });


    if (links.length > 0) {
        loadContent(links[0].getAttribute('href'));
    }
});


