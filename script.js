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
                <div style="position:relative;">
                    <img src="data:${img.tipo};base64,${img.imagen}" 
                         class="slide ${index === 0 ? 'active' : ''}">
        
                    <button onclick="eliminarImagen(${img.id})"
                        style="
                            position:absolute;
                            top:5px;
                            right:5px;
                            background:red;
                            color:white;
                            border:none;
                            border-radius:50%;
                            width:25px;
                            height:25px;
                            cursor:pointer;
                        ">X</button>
                </div>
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

    if (slides.length === 0) return;

    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 3000);
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", cargarSlider);

// Subir imagen
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

        const result = await res.text();
        alert(result);

        cargarSlider();

    } catch (error) {
        console.error(error);
    }
}
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

        cargarSlider(); // recargar slider

    } catch (error) {
        console.error(error);
    }
}
