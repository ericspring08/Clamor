import React from 'react'
import {AreaChart, YAxis, ResponsiveContainer, Area} from 'recharts'

function VolumeChart(props) {
    
    return (
        <div style={{width: "100%"}}>
            <ResponsiveContainer width={"100%"} height = {"100%"}>
                <AreaChart data={props.volume}>
                    <YAxis domain={[0, 100]}></YAxis>
                    <Area type="monotone" dataKey="volume" stroke="#8884d8" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
        
        
    )
}
    
export default VolumeChart