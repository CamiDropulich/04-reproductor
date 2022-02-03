let Playlist = [
	{
		título: 'Howl',
		artista: 'Jake Houlsby',
		src: 'songs/01-Howl-Jake Houlsby.mp3',
		img: 'img/01.jpg',
		bg: 'bg1'
	},
	{
		título: 'like u',
		artista: 'Rosenfeld',
		src: 'songs/06-like u-Rosenfeld.mp3',
		img: 'img/06.jpg',
		bg: 'bg2'
	},
	{
		título: "I Don't need your name",
		artista: 'Rosenfeld',
		src: 'songs/03-I dont need your name-Rosenfeld.mp3',
		img: 'img/03.jpg',
		bg: 'bg3'
	},
	{
		título: 'The Only Thing We Know',
		artista: 'Bob Moses',
		src: 'songs/04-The only thing we know-Bob Moses.mp3',
		img: 'img/04.jpg',
		bg: 'bg4'
	},
	{
		título: 'Beauty',
		artista: 'Layto',
		src: 'songs/05-Beauty-Layto.mp3',
		img: 'img/05.jpg',
		bg: 'bg5'
	},
	{
		título: 'I found',
		artista: 'Amber Run',
		src: 'songs/02-I found-Amber Run.mp3',
		img: 'img/02.jpg',
		bg: 'bg6'
	},
	{
		título: 'Inner Light',
		artista: 'Elderbook, Bob Moses',
		src: 'songs/07-Inner light-Elderbook, Bob Moses.mp3',
		img: 'img/07.jpg',
		bg: 'bg7'
	},
	{
		título: 'Devil',
		artista: 'Two Feet',
		src: 'songs/08-Devil-Two Feet.mp3',
		img: 'img/08.jpg',
		bg: 'bg8'
	},
	{
		título: 'BBY',
		artista: 'Two Feet',
		src: 'songs/09-Bby-Two Feet.mp3',
		img: 'img/09.jpg',
		bg: 'bg9'
	},
	{
		título: 'Tearing me up',
		artista: 'Bob Moses',
		src: 'songs/10-Tearing me up-Bob Moses.mp3',
		img: 'img/10.jpg',
		bg: 'bg10'
	}
]

let anterior = document.getElementById('anterior')
let play = document.getElementById('play')
let siguiente = document.getElementById('siguiente')

let título = document.getElementById('títuloCanción')
let artista = document.getElementById('artista')
let imagen = document.getElementById('imagen')
let nroCanción = document.getElementById('canciónActual')

let valorVolumen = document.getElementById('valorVolumen')
let barraVolumen = document.getElementById('barraVolumen')
let barraDuración = document.getElementById('barraDuración')


let índiceInicial = 0
let canción = document.createElement('audio')

let containerBg = document.getElementById('containerBg')
let cardBg = document.getElementById('cardBg')


//mutear y volumen

let íconoVolumen = document.getElementById('íconoVolumen')

íconoVolumen.addEventListener('click', function(){
	canción.volume = 0
	barraVolumen.value = 0
	valorVolumen.innerHTML = 0
})


barraVolumen.addEventListener('click', function(){
	valorVolumen.innerHTML = barraVolumen.value 
	canción.volume = barraVolumen.value / 100
})

//cambiar color

function quitarColor(){
	anterior.classList.remove(Playlist[índiceInicial].bg)
	play.classList.remove(Playlist[índiceInicial].bg)
	siguiente.classList.remove(Playlist[índiceInicial].bg)
	containerBg.classList.remove(Playlist[índiceInicial].bg)
	cardBg.classList.remove(Playlist[índiceInicial].bg)
}

function quitarColor2(){
	anterior.classList.remove(Playlist[9].bg)
	play.classList.remove(Playlist[9].bg)
	siguiente.classList.remove(Playlist[9].bg)
	containerBg.classList.remove(Playlist[9].bg)
	cardBg.classList.remove(Playlist[9].bg)
}

function agregarColor(){
	anterior.classList.add(Playlist[índiceInicial].bg)
	play.classList.add(Playlist[índiceInicial].bg)
	siguiente.classList.add(Playlist[índiceInicial].bg)
	containerBg.classList.add(Playlist[índiceInicial].bg)
	cardBg.classList.add(Playlist[índiceInicial].bg)
}


//play y pausa

let enPlay = false

function playCanción(){
	if(enPlay == false){
		canción.play()
		enPlay = true
		play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
		agregarColor()
	}else{
		canción.pause()
		enPlay = false
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
	}
}




//cargar temas

let temporizador

function cargaPlaylist(){
	clearInterval(temporizador)
	barraDuración.value = 0



	canción.src = Playlist[índiceInicial].src 
	título.innerHTML = Playlist[índiceInicial].título
	imagen.src = Playlist[índiceInicial].img
	artista.innerHTML = Playlist[índiceInicial].artista

	canción.load()

	temporizador = setInterval(avanceDuración, 1000)
	playTerminó()
	nroCanción.innerHTML = índiceInicial + 1
	if(índiceInicial!=0){
		playCanción()
	}
}

cargaPlaylist(índiceInicial)

//anterior y siguiente

anterior.addEventListener('click', function() {
	if(índiceInicial>0){
		quitarColor()
		índiceInicial--
		cargaPlaylist(índiceInicial)
		playCanción()
		if(índiceInicial==0){
			enPlay = true
			play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
			canción.play()
			agregarColor()
		}
	}else{
		índiceInicial = 9
		cargaPlaylist(índiceInicial)
		playCanción()
	}
})

siguiente.addEventListener('click', function(){
	if(índiceInicial< Playlist.length - 1){
		quitarColor()
		índiceInicial++
		cargaPlaylist(índiceInicial)
		playCanción()
	}else{
		quitarColor2()
		índiceInicial = 0
		cargaPlaylist(índiceInicial)
		playCanción()
	}
})


//barra de duración

function manejarDuración(){
	posición = canción.duration * (barraDuración.value / 100)
	canción.currentTime = posición
}

function playTerminó(){
	if(canción.ended && índiceInicial<9){
		quitarColor()
		índiceInicial++
		cargaPlaylist(índiceInicial)
		playCanción()
	}
}

function terminóPlaylist(){
	if(índiceInicial==9 && canción.ended){
		enPlay = false
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
		índiceInicial = 0
		quitarColor2()
		cargaPlaylist(índiceInicial)
	}
}

function avanceDuración(){
	let posición=0

	if(!isNaN(canción.duration)){
		posición = canción.currentTime * (100 / canción.duration)
		barraDuración.value = posición
	}
	playTerminó()
	terminóPlaylist()
		
}