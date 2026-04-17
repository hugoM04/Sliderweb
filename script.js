// Cargar imágenes desde PHP
async function cargarSlider() {
    try {
        const res = await fetch('slider.php');
        const data = await res.json();

        const contenedor = document.getElementById('slider');

        if (data.length === 0) {
            contenedor.innerHTML = "<p>No hay imágenes</p>";
            return;
        }

        let html = '';

        data.forEach((img, index) => {
            html += `
                <img src="data:${img.tipo};base64,${img.imagen}" 
                     class="slide ${index === 0 ? 'active' : ''}">
            `;
        });

        contenedor.innerHTML = html;

        iniciarSlider();

    } catch (error) {
        console.error("Error:", error);
    }
}

// Slider automático
let index = 0;

function iniciarSlider() {
    const slides = document.querySelectorAll('.slide');

    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 3000);
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", cargarSlider);
