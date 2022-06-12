import * as React from 'react';
import Head from 'next/head';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { green, purple } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { fetcher } from './api/fetcher';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const mdTheme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#2e7d32',
            darker: '#1b5e20',
        },
        neutral: {
            main: purple[500],
        },
    },
});

function MainPageContent() {
    const router = useRouter();
    const [openf, setOpenf] = useState(false);
    const [experiments, setExperiments] = useState(<></>)

    const handleClickOpen = () => {
        setOpenf(true);
    };

    const handleClose = () => {
        setOpenf(false);
    };

    useEffect(() => {
        async function fetchData() {
            let data = await fetcher(window.location.origin + "/api/experiments", null)

            setExperiments(data.map((val) =>
                <Grid item xs={12} md={4} lg={4} key={val.id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={val.image} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {val.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {val.info}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => router.push('/experiment/' + val.id)}>View Plants</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))
        }

        fetchData();
    }, [])



    return (
        <><Head>
            <title>GREENSTONE</title>
            <link rel="icon" type="image/x-icon" href="/plant.ico"></link>
        </Head>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute">
                        <Toolbar color="green">
                            
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    <Link href="/" color="inherit" style={{textDecoration:'none'}}>
                                        GREENSTONE
                                    </Link>
                                </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <Button margin-right="0" variant="outlined" onClick={handleClickOpen}>New experiment</Button>
                                <Dialog open={openf} onClose={handleClose}>
                                    <form action={"/api/create/experiment/"} method="POST" className="flex flex-col">
                                        <div>
                                        <label htmlFor="name" className="mb-2 italic">Name</label>
                                        <input
                                        className="mb-4 border-b-2"
                                        name="experimentName"
                                        type="text"
                                        required
                                        />
                                        </div>
                                        <div>
                                        <label htmlFor="info" className="mb-2 italic">More info</label>
                                        <input
                                            className="mb-4 border-b-2"
                                            name="experimentInfo"
                                            type="text"
                                            required
                                        />
                                        </div>
                                        <div>
                                        <label htmlFor="image" className="mb-2 italic">Image</label>
                                        <input
                                        className="mb-4 border-b-2"
                                        name="experimentImage"
                                        type="text"
                                        required
                                        />
                                        </div>
                                        <button
                                        type="submit"
                                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                                        >
                                        Submit
                                        </button>
                                    </form>
                                    </Dialog>
                            </Stack>

                            <Grid container spacing={2}>
                                {experiments}
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider></>
    );
}

export default function MainPage() {
    return <MainPageContent />;
}