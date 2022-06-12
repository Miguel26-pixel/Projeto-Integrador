import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../listItems';
import { purple } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Pusher from 'pusher-js';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { fetcher } from '../../api/fetcher';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


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


export default function PlantCard() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [temperature, setTemperature] = React.useState([
    ])
    const [humidity, setHumidity] = React.useState([
    ])
    const [distance, setDistance] = React.useState([
    ])
    const { id } = router.query
    let setupData = false;
    let setupPusher = false;

    useEffect(() => {
        async function fetchData() {
            if(id === undefined || setupData) return;
            setupData = true;

            let plantData = await fetcher(window.location.origin + "/api/plant/" + id + "/data");
            let temperatureCopy = []
            let humidityCopy = []
            let distanceCopy = []
    
            plantData.forEach((record) => {
                let time = Date.parse(record.time)
                if(record.hasOwnProperty("temperature")) {
                    temperatureCopy.push({x: time, y: record.temperature})
                }
                
                if(record.hasOwnProperty("humidity")) {
                    humidityCopy.push({x: time, y: record.humidity})
                }
                
                if(record.hasOwnProperty("distance")) {
                    distanceCopy.push({x: time, y: record.distance})
                }
            })

            setTemperature(temp => [...temp, ...temperatureCopy])
            setHumidity(hum => [...hum, ...humidityCopy])
            setDistance(dist => [...dist, ...distanceCopy])
        }
        
        fetchData();
    }, [id])

    useEffect(() => {
        if(id === undefined || setupPusher) return;
        setupPusher = true;

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
            useTLS: false
        });

        const channel = pusher.subscribe('plant-channel-' + id);

        channel.bind("new-data", function (data) {
            let temperatureCopy = []
            let humidityCopy = []
            let distanceCopy = []

            for(let i = 0; i < data.length; i++) {
                let record = data[i]
                
                if(record.hasOwnProperty("temperature")) {
                    temperatureCopy.push({x: record.time*1000, y: record.temperature})
                }
                
                if(record.hasOwnProperty("humidity")) {
                    humidityCopy.push({x: record.time*1000, y: record.humidity})
                }
                
                if(record.hasOwnProperty("distance")) {
                    distanceCopy.push({x: record.time*1000, y: record.distance})
                }
            }

            setTemperature(temp => [...temp, ...temperatureCopy])
            setHumidity(hum => [...hum, ...humidityCopy])
            setDistance(dist => [...dist, ...distanceCopy])
        });

        return () => {
            channel.unbind('new-data');
            pusher.unsubscribe('plant-channel')
        }
    }, [id]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

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
                            </Stack>
                            <Grid container spacing={3}
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                {/* Recent Orders */}
                                {/* <Grid item >
            <Spritesheet
                className={`my-element__class--style`}
                image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
                widthFrame={70}
                heightFrame={500}
                width={70}
                steps={14}
                fps={10}
                autoplay={true}
                loop={true}
              />
                </Grid> */}
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Line data={{
                                                datasets: [
                                                    {
                                                        label: "Temperature",
                                                        backgroundColor: 'rgb(255, 99, 132)',
                                                        borderColor: 'rgb(255, 99, 132)',
                                                        lineTension: 0.2,
                                                        data: temperature.slice(-15),
                                                        fill: false,
                                                    },
                                                    {
                                                        label: "Humidity",
                                                        backgroundColor: 'rgb(132, 99, 255)',
                                                        borderColor: 'rgb(132, 99, 255)',
                                                        lineTension: 0.2,
                                                        data: humidity.slice(-15),
                                                        fill: false,
                                                    },
                                                    {
                                                        label: "Distance",
                                                        backgroundColor: 'rgb(132, 99, 132)',
                                                        borderColor: 'rgb(132, 99, 132)',
                                                        lineTension: 0.2,
                                                        data: distance.slice(-15),
                                                        fill: false,
                                                    },
                                                ]
                                            }} options={{scales: {
                                                y: {
                                                    type: 'linear'
                                                },
                                                x: {
                                                    type: 'linear',
                                                    beginAtZero: false,
                                                    ticks: {
                                                        autoSkip: true,
                                                        maxTicksLimit: 10,
                                                        callback: function(value, index, ticks) {
                                                            return new Intl.DateTimeFormat("en-GB", {timeStyle: 'medium'}).format(new Date(value));
                                                        }
                                                    }
                                                }
                                            }}} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider></>
    )
}


