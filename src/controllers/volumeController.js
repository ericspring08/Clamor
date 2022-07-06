function getMicVolume() {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        })
        .then(function(stream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
        
            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;
        
            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);
            scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            return(Math.round(average))

        }
        })
        .catch(function(err) {
            console.error(err);
        })
}

export default getMicVolume