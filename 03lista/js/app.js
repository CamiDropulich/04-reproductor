const Playlist = [
	{
		título: 'Hold on',
		artista: 'Justin Bieber',
		src: 'songs/01-Hold on-Justin Bieber.mp3',
		img: 'img/01.jpg',
		bg: 'bg1',
	},
	{
		título: 'Alpha',
		artista: 'Layto',
		src: 'songs/02-Alpha-Layto.mp3',
		img: 'img/02.jpg',
		bg: 'bg2',
	},
	{
		título: 'Savage',
		artista: 'Megan Thee Stallion',
		src: 'songs/03-Savage-Megan Thee Stallion.mp3',
		img: 'img/03.jpg',
		bg: 'bg3',
	},
	{
		título: 'Dance Monkey',
		artista: 'Tones and I',
		src: 'songs/04-Dance monkey-Tones and I.mp3',
		img: 'img/04.jpg',
		bg: 'bg4',
	},
	{
		título: "Reach out",
		artista: 'Hilary Duff',
		src: "songs/05-Reach out-Hilary Duff.mp3",
		img: 'img/05.jpg',
		bg: 'bg5',
	},
	{
		título: 'Stay',
		artista: 'The Kid Laroi, Justin Bieber',
		src: 'songs/06-Stay-The Kid LAROI, Justin Bieber.mp3',
		img: 'img/06.jpg',
		bg: 'bg6',
	},
	{
		título: 'Ignite',
		artista: 'Neoni X Unsecret',
		src: 'songs/07-Ignite-NEONI x UNSECRET.mp3',
		img: 'img/07.jpg',
		bg: 'bg7',
	},
	{
		título: 'Part Time Psycho',
		artista: 'SHAED, Two Feet',
		src: 'songs/08-Part time psycho-SHAED, Two Feet.mp3',
		img: 'img/08.jpg',
		bg: 'bg8',
	},
	{
		título: 'Dancin (KRONO Remix)',
		artista: 'Aaron Smith',
		src: 'songs/09-Dancin (KRONO Remix)-Aaron Smith.mp3',
		img: 'img/09.jpg',
		bg: 'bg9',
	},
	{
		título: 'South of the Border (Remix)',
		artista: 'Ed Sheeran, Ft. Camila Cabello & Cardi B.',
		src: 'songs/10-South Of The Border-Cheat Codes Remix--Ed Sheeran, Feat. Camila Cabello & Cardi B.mp3',
		img: 'img/10.jpg',
		bg: 'bg10',
	},
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
	canción.volume = barraVolumen.value / 100
	valorVolumen.innerHTML = barraVolumen.value
})


//cambiar color

function agregarColor(){
	anterior.classList.add(Playlist[índiceInicial].bg)
	play.classList.add(Playlist[índiceInicial].bg)
	siguiente.classList.add(Playlist[índiceInicial].bg)
	containerBg.classList.add(Playlist[índiceInicial].bg)
	cardBg.classList.add(Playlist[índiceInicial].bg)
}

function quitarColor(){
	anterior.classList.remove(Playlist[índiceInicial].bg)
	play.classList.remove(Playlist[índiceInicial].bg)
	siguiente.classList.remove(Playlist[índiceInicial].bg)
	containerBg.classList.remove(Playlist[índiceInicial].bg)
	cardBg.classList.remove(Playlist[índiceInicial].bg)
}


//play y pausa

let enPlay = false

function playCanción(){
	if(enPlay==false){
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
	imagen.src = Playlist[índiceInicial].img
	título.innerHTML = Playlist[índiceInicial].título
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

anterior.addEventListener('click', function(){
	if(índiceInicial>0){
		quitarColor()
		índiceInicial--
		cargaPlaylist(índiceInicial)
		playCanción()
		if(índiceInicial==0){
			agregarColor()
			canción.play()
			enPlay=true
			play.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>'
		}
	}else{
		quitarColor()
		índiceInicial = Playlist.length -1
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
		quitarColor()
		índiceInicial = 0
		cargaPlaylist(índiceInicial)
		playCanción()
	}
})


//barra de duración

function playTerminó(){
	if(canción.ended && índiceInicial<Playlist.length-1){
		quitarColor()
		índiceInicial++
		cargaPlaylist(índiceInicial)
		playCanción()
	}
}

function terminóPlaylist(){
	if(índiceInicial==Playlist.length-1 && canción.ended){
		quitarColor()
		enPlay = false
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
		índiceInicial=0
		cargaPlaylist(índiceInicial)
	}
}

function manejarDuración(){
	posición = canción.duration * (barraDuración.value / 100)
	canción.currentTime = posición
}

function avanceDuración(){
	let posición = 0

	if(!isNaN(canción.duration)){
		posición = canción.currentTime * (100 / canción.duration)
		barraDuración.value = posición
	}
	playTerminó()
	terminóPlaylist()
}

