import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Box display='flex' justifyContent='center' sx={{ p: 4 }}>
                <Typography variant='h2'>
                    Welcome to SkiStore!
                </Typography>
            </Box>

            <Slider {...settings}>
                <div>
                    <img src="/skiimages/ski1.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 700 }}/>
                </div>
                <div>
                    <img src="/skiimages/ski2.png" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 700 }} />
                </div>
                <div>
                    <img src="/skiimages/ski3.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 700 }} />
                </div>
            </Slider>

            

        </>
    )
}