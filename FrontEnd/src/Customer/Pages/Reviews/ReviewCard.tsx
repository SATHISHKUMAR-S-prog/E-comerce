import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, Grid2, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
        <Grid2 container spacing={9}>
            <Grid2 size={{xs :1}}>
                <Box>
                    <Avatar sx={{width:56, height:56, backgroundColor:"#9155FD"}}>
                        S
                    </Avatar>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 9}}>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Sathish</p>
                        <p className='opacity-70'>2024/11/28, 11:34 PM</p>
                    </div>
                </div>

                <Rating 
                readOnly
                value={4.5}
                precision={.5} />
                <p>Value for mony product, good product</p>
                <div>
                    <img className='w-24 h-24 object-cover' src="https://images.unsplash.com/photo-1641467705591-8ccbdd3265f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhcmVlJTIwcGhvdG9zaG9vdHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </div>
            </Grid2>
        </Grid2>

        <div>
            <IconButton >
                <Delete sx={{color:red[700]}}/>
            </IconButton>
        </div>
    </div>
  )
}

export default ReviewCard