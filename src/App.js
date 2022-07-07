import './App.css';
import LogoLight from './assets/images/LogoLight.png'
import LogoDark from './assets/images/LogoDark.png'
import React, { useEffect, useState } from 'react';
import VolumeSlider from './components/VolumeSlider';
import Swal from 'sweetalert2';
import { Switch } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CssBaseline, useMediaQuery} from '@mui/material';
import VolumeChart from './components/VolumeChart';

function App() {
  // themeing
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const lightTheme = createTheme({
    palette: 'light',
  })

  // hooks
  const [volume, setVolume] = useState(0)
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme: lightTheme)
  const [logo, setLogo] = useState(prefersDarkMode ? LogoLight: LogoDark)
  const [volumeArr, setVolumeArr] = useState(new Array(200).fill({
    volume: 0
  }))
  const [red, setRed] = useState(0)
  const [green, setGreen] = useState(255)
  
  // on load
  useEffect(() => {
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
              const vol = Math.round(average)
              setVolume(vol)
              setVolumeArr(data => [...data.slice(1), {
                volume: vol
              }])
              setRed(Math.round((vol/100) * 255))
              setGreen(Math.round(255 - (vol/100) * 255))
          }
          })
          .catch(function(err) {
            Swal.fire({
              "title": "Please allow access to the microphone",
              "icon": "error",
              "confirmButtonText": "Reload Page"
            }).then(() => {
              window.location.reload()
            })
          })
  }, [])

  const handleThemeChange = (event) => {
    if(event.target.checked) {
      setTheme(darkTheme)
      setLogo(LogoLight)
    } else {
      setTheme(lightTheme)
      setLogo(LogoDark)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <main className="App">
        <div className = {"vertical-container"}>
          <div className={'horizontal-container'}>
            <img alt = "logo" src={logo} id={"logo"} width={50} height={50}/>
            <Switch color='default' defaultChecked={prefersDarkMode} onChange={handleThemeChange}></Switch>
          </div>
          <div id="charts">
            <VolumeChart volume={volumeArr} red = {red} green = {green}></VolumeChart>
            <VolumeSlider volume={volume} id={"volume-slider"}/>
          </div>
        </div>  
      </main>
    </ThemeProvider>
  )
}

export default App
