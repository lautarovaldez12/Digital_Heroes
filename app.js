// Require de Express
const express = require('express');

// Require de FS
const fs = require('fs');

// Ejecución de Express
const app = express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', function(req,res){
	res.send('Ni Superman, IronMan o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti')

});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/detalle/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = req.params.id;
	let filtro  = heroes.filter(hero => hero.id == heroe);


	if(filtro.length ==! 0){
        filtro.forEach(function(a){
			res.write("Hola, mi nombre es " + a.nombre + " y soy " + a.profesion)
			res.end()
        });
    }else{                    
		res.write("error")
		res.end()
    };
	/*
	for (let i = 0; i < heroes.length; i++) {
		res.send(heroes[i])
		console.log(i)
		res.end()
		
	}
	*/
	


	/*
	for (let index = 0; index < heroes.length; index++) {
		if(heroes[index].id == heroe){
			let cosin = heroes.filter(hero => hero.id == heroe)
			
			cosin.forEach(element => {
				res.write(element.nombre + '\n' + element.profesion)
				
			});
			
			res.send("hola")
			res.end()
			break;
		}else if (index > heroes.length){
			res.send("Error no se encontro nada")
			res.end()
			break;
		}
	}

	/*
	while (numero <= heroes.length) {
			numero = 1 + numero;
			if( heroe == heroes[numero].id){
			
			cosin.forEach(element => {
				res.write(element.nombre + '\n' + element.profesion)
			res.end()
				
			});
		}else{
			res.send("No se encontro ese heroe")
			res.end()
		}
	}
	*/


	/*
	
	heroes.forEach(function(elemento){
		if( heroe == elemento.id ){
			let cosin = heroes.filter(hero => hero.id == heroe)
			cosin.forEach(element => {
				res.write(element.nombre + '\n' + element.profesion)
				
			});
		}else if(heroe ==! 0){
			res.send("No se encontro ese heroe")
		}
	})

	*/


	// Si se encuentra al héroe se envía el nombre y su profesión
	// Si NO se encuentra se envía el mensaje de no encontrado
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/n/bio/:id/:ok?', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = req.params.id;
	let ok = req.params.ok;
	let nombre = heroes.filter(hero => hero.id == heroe)
	if (ok == "ok"){
		if(nombre.length ==! 0){
			nombre.forEach(function(a){
				res.write(a.resenia);
				res.write(ok);
			})
			res.end()
		}else {
			res.send("Error! Heroe no encontrado")
			res.send()
		}	
	}else {
		if(nombre.length ==! 0){
			nombre.forEach(function(a){
				res.write(a.nombre + " Lamento que no quieras saber nada de mi");
				
			})
			res.end()
		}else {
			res.send("Error! Heroe no encontrado")
			res.send()
		}
	}
	// Si NO se encuentra al héroe se envía un mensaje
	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		// Si nó vino el parámetro se envía el mensaje de error
	}
);

// Ruta Créditos
app.get('/creditos', (req, res) => {
	res.send('Pagina hecha por Lautaro Valdez');
});


// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});
