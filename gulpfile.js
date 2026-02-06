import { src, dest, watch } from 'gulp'
import * as dartSass from 'sass' //dartSass es el lenguaje en el que está escrito.
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function css(done) {
    src('src/scss/app.scss') // ruta completa del arvhivo
        .pipe( sass() .on('error', sass.logError) ) 
        .pipe( dest('build/css') )
        
    done()
}

export function dev() { // no le pasamos done como parametro
    watch('src/scss/**/*.scss', css) //busqueda por patrón, primero cualquier directorio dentro de src/scss/ luego cualquier archivo con extención .scss
}