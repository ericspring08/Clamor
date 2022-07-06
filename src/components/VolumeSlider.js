import React from 'react';
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';

function VolumeSlider(props) {
    return (
        <div>
            <Box sx={{ height: "40vh", marginTop: "2vh"}}>
      
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
            <Typography variant='h4'>{props.volume}</Typography>
        </div>
    )
}

export default VolumeSlider