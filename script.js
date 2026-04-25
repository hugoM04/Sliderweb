let listaIds = []; 
let currentIndex = 0;

// 1. Carga la lista de IDs (Esto ya confirmaste que funciona)
async function cargarSlider() {
    try {
        const res = await fetch('slider.php');
        listaIds = await res.json();

        if (!listaIds || listaIds.length === 0) {
            document.getElementById('slider').innerHTML = "<p>No hay imágenes</p>";
            return;
        }

        const contenedor = document.getElementById('slider');
        // Preparamos el HTML básico del slider
        contenedor.innerHTML = `
            <div id="slide-container" style="width:100%; height:100%;"></div>
            <div class="slider-controls">
                <button class="arrow" onclick="prevSlide()">❮</button>
                <button class="arrow" onclick="nextSlide()">❯</button>
            </div>
        `;

        // Mostramos la primera imagen de la lista
        mostrarImagen(listaIds[currentIndex].id);

    } catch (error) {
        console.error("Error al cargar IDs:", error);
    }
}

// 2. Función clave: Usa la URL directa que te funcionó en el navegador
function mostrarImagen(id) {
    const contenedor = document.getElementById('slide-container');
    if (!contenedor) return;

    // IMPORTANTE: Aquí NO usamos fetch. 
    // Ponemos la URL directamente en el 'src' de la imagen.
    const urlDirecta = `get_image.php?id=${id}`;

    console.log("Cargando imagen ID:", id);

    contenedor.innerHTML = `
        <img src="${urlDirecta}" 
             style="width:100%; height:100%; object-fit:cover; display:block;"
             onload="console.log('Imagen ${id} cargada OK')"
             onerror="this.src='https://via.placeholder.com/800x400?text=Error+ID+${id}'">
        
        <button class="btn-delete" onclick="eliminarImagen(${id})" 
                style="position:absolute; bottom:20px; right:20px; z-index:100;">
            ✕
        </button>
    `;
}

// 3. Funciones de las flechas
function nextSlide() {
    if (listaIds.length === 0) return;
    currentIndex = (currentIndex + 1) % listaIds.length;
    mostrarImagen(listaIds[currentIndex].id);
}

function prevSlide() {
    if (listaIds.length === 0) return;
    currentIndex = (currentIndex - 1 + listaIds.length) % listaIds.length;
    mostrarImagen(listaIds[currentIndex].id);
}

// 4. Iniciar cuando cargue el DOM
document.addEventListener("DOMContentLoaded", cargarSlider);

// 5. fiuncion eliminar
async function eliminarImagen(id) {
    // 1. Preguntar al usuario para evitar borrar por error
    if (!confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
        return;
    }

    try {
        // 2. Enviar el ID mediante una petición POST (AJAX)
        const formData = new FormData();
        formData.append('id', id);

        const res = await fetch('delete.php', {
            method: 'POST',
            body: formData
        });

        const resultado = await res.text();

        // 3. Si se eliminó correctamente en la DB, actualizamos la vista
        if (resultado.includes("correctamente")) {
            alert(resultado);
            
            // Volvemos a llamar a cargarSlider para que la lista de IDs se actualice
            // y la imagen borrada ya no aparezca
            cargarSlider(); 
        } else {
            alert("Hubo un problema: " + resultado);
        }

    } catch (error) {
        console.error("Error en la petición de borrado:", error);
        alert("No se pudo conectar con el servidor para eliminar.");
    }
}
