import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../listItems';
import { green, purple } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Spritesheet from 'react-responsive-spritesheet';
import SaveIcon from '@mui/icons-material';
import { fetcher } from '../../api/fetcher';
import { useParams } from 'react-router';



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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

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

export default function ExperimentList() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openf, setOpenf] = useState(false);
    const [plants, setPlants] = useState(<></>);
    const [experiment, setExperiment] = useState(<></>);
    const { id } = router.query;

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClickOpen = () => {
        setOpenf(true);
    };

    const handleClose = () => {
        setOpenf(false);
    };


    useEffect(() => {
        async function fetchData() {
            if(id === undefined) return;
            let data = await fetcher(window.location.origin + "/api/experiment/" + id, null)

            // TODO: IMAGE
            setExperiment(
                <Card sx={{ maxWidth: "100%", my: "10%" }}>
                    <CardMedia
                        component="img"
                        alt="plant-image"
                        height="140"
                        image="/placeholder.png"/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.info}
                        </Typography>
                    </CardContent>
                </Card>
            )

            let plantData = await fetcher(window.location.origin + "/api/experiment/" + id + "/plants", null)

            setPlants(plantData.map((value) =>
                <Button key={value.id} sx={{
                    width: "90%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white", fontWeight: 'light', p: 0, color: "black",
                    '&:hover': {
                        color: 'green',
                        backgroundColor: 'white',
                    },
                }} onClick={() => router.push('/plant/' + value.id)}>
                        <CardContent>
                            <Typography >
                                {value.plantName}
                            </Typography>
                        </CardContent>
                </Button>
            ))
        }

        fetchData();
    }, [id])

    return (

        <><Head>
            <title>GREENSTONE</title>
            <link rel="icon" type="image/x-icon" href="/plant.ico"></link>
        </Head>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
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
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {mainListItems}
                            <Divider sx={{ my: 1 }} />
                            {secondaryListItems}
                        </List>
                    </Drawer>
                    <Box
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
                            <Button margin-right="0" variant="outlined" onClick={handleClickOpen}>New plant</Button>
                            <Dialog open={openf} onClose={handleClose}>
                                <form action={"/api/create/plant/"} method="POST" className="flex flex-col">
                                    <div>
                                    <label htmlFor="name" className="mb-2 italic">Name</label>
                                    <input
                                    className="mb-4 border-b-2"
                                    name="plantName"
                                    type="text"
                                    required
                                    />
                                    </div>
                                    <div>
                                    <label htmlFor="RaspberrypiID" className="mb-2 italic">Raspberrypi ID</label>
                                    <input
                                        className="mb-4 border-b-2"
                                        name="piID"
                                        type="text"
                                        required
                                    />
                                    </div>
                                    <div>
                                    <label htmlFor="ExperimentID" className="mb-2 italic">Experiment ID</label>
                                    <input
                                    className="mb-4 border-b-2"
                                    name="experimentID"
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
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    {experiment}
                                </Grid>
                                {/* Recent Orders */}
                                <Grid item sx={{}} xs={8}>
                                    {plants}
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider></>
    )
}


