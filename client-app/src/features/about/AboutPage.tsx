import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';


const cards = [1];

const theme = createTheme();

export default function AboutPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        width: 700
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Ski Store
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Ski-Store Web Application developed &amp; deployed online to Heroku by Ardit Hyseni, following the course of Neil Cummings.
                            Written in .Net Core 5 &amp; React, using a PostGreSQL Database.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 4 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                        alt="github"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Ski Store GitHub Repository
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button href="https://www.github.com/ardithyseni/SkiStore" size="small">Link</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    <Link
                        href="https://www.linkedin.com/in/ardit-hyseni/"
                        underline="hover"
                    >Ardit Hyseni's LinkedIn
                    </Link>
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}