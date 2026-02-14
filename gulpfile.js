import { src, dest, watch, series } from 'gulp' //series podría ser parallels
import * as dartSass from 'sass' //dartSass es el lenguaje en el que está escrito.
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function js (done) {//Estamos llevando js hacia la carpeta build
    src('src/js/app.js')
        .pipe( dest('build/js'))
    done()
}

export function css(done) {
    src('src/scss/**/*.scss', {sourcemaps: true}) // ruta completa del arvhivo
        .pipe( sass() .on('error', sass.logError) ) 
        .pipe( dest('build/css', {sourcemaps: true}) )
        
    done()
}

export function dev() { // no le pasamos done como parametro
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js) //busqueda por patrón, primero cualquier directorio dentro de src/scss/ luego cualquier archivo con extención .scss
}

export default series (js, css, dev)
//que sea default nos permite dispensar del nombre, por lo que eliminando el nombre del archivo package.json estaremso llamando a series.
