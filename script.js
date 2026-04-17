// =======================
// VARIABLES GLOBALES
// =======================
let index = 0;
let intervalo = null;

// =======================
// CARGAR SLIDER
// =======================
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

        data.forEach((img, i) => {
            html += `
                <div>
                    <img src="data:${img.tipo};base64,${img.imagen}"
                         class="slide ${i === 0 ? 'active' : ''}">

                    <button class="btn-delete" onclick="eliminarImagen(${img.id})">
                        ✕
                    </button>
                </div>
            `;
        });

        // =======================
        // FLECHAS
        // =======================
        html += `
            <div class="slider-controls">
                <button class="arrow" onclick="prevSlide()">❮</button>
                <button class="arrow" onclick="nextSlide()">❯</button>
            </div>
        `;

        contenedor.innerHTML = html;

        index = 0;

        iniciarSlider();

    } catch (error) {
        console.error("Error:", error);
    }
}

// =======================
// SLIDER AUTOMÁTICO (FIX)
// =======================
function iniciarSlider() {

    const slides = document.querySelectorAll('.slide');

    if (slides.length === 0) return;

    // 🔥 evita múltiples intervalos
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        slides[index].classList.remove('active');

        index = (index + 1) % slides.length;

        slides[index].classList.add('active');

    }, 3000);
}

// =======================
// FLECHAS
// =======================
function nextSlide() {
    const slides = document.querySelectorAll('.slide');

    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');

    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

// =======================
// SUBIR IMAGEN
// =======================
async function subirImagen() {

    const input = document.getElementById('file');

    if (input.files.length === 0) {
        alert("Selecciona una imagen");
        return;
    }

    const formData = new FormData();
    formData.append('imagen', input.files[0]);

    try {
        const res = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });

        const resultado = await res.text();
        alert(resultado);

        cargarSlider();

    } catch (error) {
        console.error(error);
    }
}

// =======================
// ELIMINAR IMAGEN
// =======================
async function eliminarImagen(id) {

    if (!confirm("¿Eliminar imagen?")) return;

    const formData = new FormData();
    formData.append('id', id);

    try {
        const res = await fetch('delete.php', {
            method: 'POST',
            body: formData
        });

        const resultado = await res.text();
        alert(resultado);

        cargarSlider();

    } catch (error) {
        console.error(error);
    }
}

// =======================
// INICIAR
// =======================
document.addEventListener("DOMContentLoaded", cargarSlider);
