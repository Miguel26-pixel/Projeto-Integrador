import * as React from 'react';
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

    return (<>
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
    </>
    );
}

export default function MainPage() {
    return <MainPageContent />;
}