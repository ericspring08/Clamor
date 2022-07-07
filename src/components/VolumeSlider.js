import React from 'react';
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'

function VolumeSlider(props) {
    return (
        <div>
            <Box sx={{ height: "90vh"}}>
      
                <Slider 
                    sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                    }} 
                    disabled 
                    orientation="vertical" 
                    value = {props.volume} 
                    aria-label="volume" /> 
            </Box>
        </div>
    )
}

export default VolumeSlider