document.addEventListener('DOMContentLoaded', function() {
    crarGalería()
    navegacionFija()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija () {
    const header = document.querySelector('.header')
    header.classList.add('fixed')
}

function crarGalería () {

    const ultimaImagen = 16
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= ultimaImagen ; i++) { //Nos permite crear la variable 'i' que coincide con el nombre de las img
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg` //Agrega el atributo de la ubicación de la imagen.
        imagen.alt = 'Imagen Galería' //Generamos el texto alternativo.

        // Event Handler
        imagen.onclick = function () {
            mostrarImagen(i)
        } 
        galeria.appendChild(imagen)
    }
}

function mostrarImagen (i) {
    const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galería'

    // Generar Modal
    const modal = document.createElement('DIV') // lo usamos para oscurecer el fondo.
    modal.classList.add('modal') //Generamos la clase para darle estilos con SASS
    modal.onclick = cerrarModal //Cierra el modal al hacer Click.

    // Botón cerrar modal
    const cerrarModalBtn = document.createElement('BOTTON') //Creamos el elemento botton en el HTML
    cerrarModalBtn.textContent = 'X' // Le asignamos la lera mayúscula X
    cerrarModalBtn.classList.add('btn-cerrar') // Le creamos y agregamos una clase
    cerrarModalBtn.onclick = cerrarModal // Reutilizamos la función 'cerrarModal'

    modal.appendChild(imagen) // Agrega imagen al HTML
    modal.appendChild(cerrarModalBtn) // Agrega el botton al HTML

    // Agregar al HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')//Crea la clase para no hacer scroll
    body.appendChild(modal)
}

function cerrarModal () {
    const modal = document.querySelector('.modal') //Seleccionamos la clase con el '.'
    modal.classList.add('fade-out')

    //Retrasamos el cierre para que funcione la transición.
    setTimeout(() => {
        modal?.remove() // la lógica es: Si existe modal? Entonces elimínalo

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden') // Elimina la clase que evita el scroll
    }, 240); //cada 1000 es un segundo.
}

function resaltarEnlace () {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section') 
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a') //Usamos SelectorAll porque queremos seleccionar todos los enlaces

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})  
        })
    })
}
