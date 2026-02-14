document.addEventListener('DOMContentLoaded', function() {
    crarGalería()
})

function crarGalería () {

    const ultimaImagen = 16
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= ultimaImagen ; i++) { //Nos permite crear la variable 'i' que coincide con el nombre de las img
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg` //Agrega el atributo de la ubicación de la imagen.
        imagen.alt = 'Imagen Galería' //Generamos el texto alternativo.
        
        galeria.appendChild(imagen)
    }
}