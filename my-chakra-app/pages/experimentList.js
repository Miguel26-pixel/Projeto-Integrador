import * as React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
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
import { mainListItems, secondaryListItems } from './listItems';
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

export default function ExperimentList() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openf, setOpenf] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClickOpen = () => {
    setOpenf(true);
  };

  const handleClose = () => {
    setOpenf(false);
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
              GREENSTONE
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
                  <DialogTitle>Create new plant</DialogTitle>
                  <DialogContent>
                    <DialogContentText sx={{color: "green"}}>
                      Name
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                    <DialogContentText sx={{color: "green"}}>
                      Image
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="image"
                      fullWidth
                      variant="standard"
                    />
                    <DialogContentText sx={{color: "green"}}>
                      More info
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="moreinfo"
                      label="Addictional information"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                  </DialogActions>
                </Dialog>
            </Stack>
            <Grid container spacing={3}>
            <Card sx={{ maxWidth: "40%", my : "10%" }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              {/* Recent Orders */}
            <Grid item sx={{}}>
            {/* <Spritesheet
                className={`my-element__class--style`}
                image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
                widthFrame={70}
                heightFrame={500}
                width={70}
                steps={14}
                fps={10}
                autoplay={true}
                loop={true}
              /> */}
              <Button sx={{ width: "70%",  mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white",fontWeight: 'light', p:0, color: "black",
              '&:hover': {
                  color: 'green',
                  backgroundColor: 'white',
                }, }} onClick={() => router.push('/plantCard')}>
                  <CardContent>
                    <Typography >
                      Plant 1
                    </Typography>
                  </CardContent>
                </Button>
                <Button sx={{ width: "70%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white",fontWeight: 'light', p:0, color: "black",
              '&:hover': {
                  color: 'green',
                  backgroundColor: 'white',
                }, }}>
                  <CardContent>
                    <Typography >
                      Plant 1
                    </Typography>
                  </CardContent>
                </Button>
                <Button sx={{ width: "70%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white",fontWeight: 'light', p:0, color: "black",
              '&:hover': {
                  color: 'green',
                  backgroundColor: 'white',
                }, }}>
                  <CardContent>
                    <Typography>
                      Plant 1
                    </Typography>
                  </CardContent>
                </Button>
                <Button sx={{ width: "70%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white",fontWeight: 'light', p:0, color: "black",
              '&:hover': {
                  color: 'green',
                  backgroundColor: 'white',
                }, }}>
                  <CardContent>
                    <Typography>
                      Plant 1
                    </Typography>
                  </CardContent>
                </Button>
                <Button sx={{ width: "70%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white",fontWeight: 'light', p:0, color: "black",
              '&:hover': {
                  color: 'green',
                  backgroundColor: 'white',
                }, }}>
                  <CardContent>
                    <Typography>
                      Plant 1
                    </Typography>
                  </CardContent>
                </Button>
                <Button sx={{ width: "70%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 2, bgcolor: "white",fontWeight: 'light', p:0, color: "black",
              '&:hover': {
                  color: 'green',
                  backgroundColor: 'white',
                }, }}>
                  <CardContent>
                    <Typography>
                      Plant 1
                    </Typography>
                  </CardContent>
                </Button>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider></>
    )
  }


