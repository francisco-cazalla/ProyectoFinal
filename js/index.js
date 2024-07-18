
document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            const submenu = this.querySelector(".submenu");
            if (submenu) {
                submenu.style.display = "block";
                submenu.style.opacity = "0";
                setTimeout(() => {
                    submenu.style.opacity = "1";
                    submenu.style.transition = "opacity 0.3s";
                }, 0);
            }
        });

        item.addEventListener("mouseleave", function() {
            const submenu = this.querySelector(".submenu");
            if (submenu) {
                submenu.style.opacity = "0";
                submenu.addEventListener("transitionend", function() {
                    submenu.style.display = "none";
                }, { once: true });
            }
        });
    });
});


const API_KEY = '50d4b7559c7a0439e044562caf375ff1';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';


async function fetchTopTracks() {
    try {
        const response = await fetch(`${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json`);
        if (!response.ok) {
            throw new Error('Error al obtener las canciones populares');
        }
        const data = await response.json();
        return data.tracks.track.slice(0, 10); 
    } catch (error) {
        console.error('Error fetching top tracks:', error.message);
        alert('Hubo un problema al cargar las canciones. Por favor, intenta más tarde.');
        return []; 
    }
}


async function displayTopTracks() {
    const tracks = await fetchTopTracks();
    const contenedor = document.querySelector('.contenedor-portadas');
    tracks.forEach(async (track) => {
        try {
            const imageUrl = await fetchTrackImage(track.artist.name, track.name);

            const div = document.createElement('div');
            div.classList.add('portada');
            div.innerHTML = `
                <img src="${imageUrl}" alt="${track.name}">
                <span>${track.name}</span>
                <span>${track.artist.name}</span>
            `;
            contenedor.appendChild(div);
        } catch (error) {
            console.error('Error fetching track image:', error.message);
        }
    });
}


async function fetchTrackImage(artist, trackName) {
    try {
        const response = await fetch(`${BASE_URL}?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${trackName}&format=json`);
        if (!response.ok) {
            throw new Error('Error al obtener la imagen de la canción');
        }
        const data = await response.json();
        const imageUrl = data.track.album.image.find(img => img.size === 'large')['#text'] || 'placeholder.jpg';
        return imageUrl;
    } catch (error) {
        console.error('Error fetching track img:', error.message);
        return './img/icono.webp'; 
    }
}


displayTopTracks();
















