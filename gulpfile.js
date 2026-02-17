import path from 'path' // Path es la ruta y ya es de Node
import fs from 'fs' // File Sistem, tambien es de Node
import { glob } from 'glob'
import { src, dest, watch, series } from 'gulp' //series podría ser parallels
import * as dartSass from 'sass' //dartSass es el lenguaje en el que está escrito.
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

import terser from 'gulp-terser' //Importamos gulp-terser.
import sharp from 'sharp' //Importamos sharp

export function js (done) {//Estamos llevando js hacia la carpeta build
    src('src/js/app.js')
        .pipe(terser())
        .pipe( dest('build/js'))
    done()
}

export function css(done) {
    src('src/scss/**/*.scss', {sourcemaps: true}) // ruta completa del arvhivo
        .pipe( sass({
            style: 'compressed' // Comprime el código css compilado.
        }) .on('error', sass.logError) ) 
        .pipe( dest('build/css', {sourcemaps: true}) )
        
    done()
}

export async function crop(done) {
    const inputFolder = 'src/img/gallery/full' //Buscar la galería
    const outputFolder = 'src/img/gallery/thumb'; // Generar una carpeta con las imagenes pequeñas
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) { //Revisa que exista esta carpeta sino la generará
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => { //Revisa que sean imagenes para comenzar a procesarlas
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => { // Aquí procesa cada una de las imagenes
            const inputFile = path.join(inputFolder, file) //ruta de entrada
            const outputFile = path.join(outputFolder, file) //ruta de salida
            sharp(inputFile) //utiliza dependencia de sharp en el archivo de entrada
                .resize(width, height, { //resicea la altura y el ancho de arriba.
                    position: 'centre'
                })
                .toFile(outputFile)// Lo almacena en la nueva carpeta thumb
        });

        done() //llamada a done para finalizar.
    } catch (error) {
        console.log(error)
    }
}

export async function imagenes(done) { //Esta se encargará de buscar las imagenes
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) { // Esta se encargará de procesarlas y devolverlas con extensión .webp
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`) //Extensión .avif

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif) //Modificación para AVIF
}

export function dev() { // no le pasamos done como parametro
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js) //busqueda por patrón, primero cualquier directorio dentro de src/scss/ luego cualquier archivo con extención .scss
    watch('src/img/**/*.{png,jpg}', imagenes)
}

export default series (crop, js, css, imagenes, dev)
//que sea default nos permite dispensar del nombre, por lo que eliminando el nombre del archivo package.json estaremso llamando a series.
