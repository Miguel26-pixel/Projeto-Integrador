import * as React from 'react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { fetcher } from './api/fetcher';
import Header from '../components/navbar';
import {FormControl, InputLabel, Input, FormHelperText} from '@mui/material';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function ExperimentListPage() {
    const router = useRouter();
    const [openf, setOpenf] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [experiments, setExperiments] = useState(<></>)
    const [edit, setEdit] = useState(null);

    const handleClickOpen = () => {
        setOpenf(true);
    };

    const handleClose = () => {
        setOpenf(false);
    };

    async function handleClickOpenEdit() {
        setOpenEdit(true);
        console.log("ola");
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    useEffect(() => {
        async function fetchData() {
            let data = await fetcher(window.location.origin + "/api/experiments", null);

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
                            <Button size="small" onClick={handleClickOpenEdit}>Edit Experiment</Button>

                            <Dialog
                                open={openEdit}
                                onClose={handleCloseEdit}
                                fullWidth
                                maxWidth = 'lg'
                                className='popup-form'
                                >
                                <form action={"/api/create/experiment/"} method="POST" className="flex flex-col">
                                    <fieldset>
                                        <legend>Edit Experiment</legend>
                                    
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input id="exp-name" aria-describedby="my-helper-name" defaultValue={val.name} />

                                    <InputLabel htmlFor="info">More info</InputLabel>
                                    <textarea id="my-exp-info" aria-describedby="my-helper-info" defaultValue={val.info}></textarea>
                                    
                                    <InputLabel htmlFor="image">Image</InputLabel>
                                    <Input type="file" id="my-input" aria-describedby="my-helper-text" />
                                    
                                    <div>
                                    <Input
                                        type="submit"
                                        className="px-4 py-4 font-bold text-white hover:bg-green-700"
                                    >
                                        Submit
                                    </Input>
                                    </div>
                                    </fieldset>
                                </form>
                            </Dialog>

                        </CardActions>
                    </Card>
                </Grid>
            ))
        }

        fetchData();
    }, [])

    return (<>
        <Head>
            <title>GREENSTONE</title>
            <link rel="icon" type="image/x-icon" href="/plant.ico"></link>
        </Head>
        <Header></Header>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                    <Button variant="outlined" onClick={handleClickOpen}>New experiment</Button>                
                    <Dialog
                    open={openf}
                    onClose={handleClose}
                    fullWidth
                    maxWidth = 'lg'
                    className='popup-form'
                    >
                    <form action={"/api/create/experiment/"} method="POST" className="flex flex-col">
                        <fieldset>
                            <legend>New Experiment</legend>
                        
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="exp-name" aria-describedby="my-helper-name" />

                        <InputLabel htmlFor="info">More info</InputLabel>
                        <textarea id="my-exp-info" aria-describedby="my-helper-info" ></textarea>
                        
                        <InputLabel htmlFor="image">Image</InputLabel>
                        <Input type="file" id="my-input" aria-describedby="my-helper-text" />
                        
                        <div>
                        <Input
                            type="submit"
                            className="px-4 py-4 font-bold text-white hover:bg-green-700"
                        >
                            Submit
                        </Input>
                        </div>
                        </fieldset>
                    </form>
                </Dialog>
            </Stack>

            <Grid container spacing={2} marginTop>
                {experiments}
            </Grid>
        </Container>
    </>
    );
}

export default function ExperimentPage() {
    return <ExperimentListPage />;
}