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
import Layout from '../components/Layout';
import Header from '../components/navbar';
import TextC from '../components/textC';
import TreeC from '../components/treeC';
import LeavesC from '../components/leavesC';
import Eform from '../components/createExperimentForm';
import {FormControl, InputLabel, Input, FormHelperText} from '@mui/material';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

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
        <div>
            <main>
                <TreeC />
                <TextC />
                <LeavesC />
            </main>

            
        </div></>
    );
}

export default function MainPage() {
    return <MainPageContent />;
}