
const $ = document.querySelector.bind(document)

const platform = $('.plaform')

var audio = new Audio('http://localhost:5500/Roi_Toi_Luon_Nal.mp3')
audio.crossOrigin = "anonymous"
audio.load()

var state = false


$('.button').onclick = function () {
    if (state = !state) {
        audio.play()
        $('.button img').classList.add('play')
        $('.button img:nth-child(2)').src = './pause.png'
        $('.button img:nth-child(2)').classList.add('change')
        $('.wave').classList.add('clap')
        analysis()
    }
    else {
        $('.button img').classList.remove('play')
        $('.button img:nth-child(2)').src = './play.png'
        $('.button img:nth-child(2)').classList.remove('change')
        $('.wave').classList.remove('clap')
        play = false
        audio.pause()
    }
}
var context, src, analyser
function analysis() {
    context = context != undefined ? context : new AudioContext();
    src = src != undefined ? src : context.createMediaElementSource(audio);
    analyser = analyser != undefined ? analyser : context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    let i = 0;
    function render() {
        i++
        if (!state) return
        requestAnimationFrame(render);
        analyser.getByteFrequencyData(dataArray);
        platform.style.height = `${dataArray[64]*2}px`;
        platform.style.width = `${dataArray[64]*2}px`;
        if(i%100==0)
            platform.style.background = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.7)`
    }
    render()
}