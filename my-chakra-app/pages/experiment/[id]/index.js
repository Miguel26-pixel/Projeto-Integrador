import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { fetcher } from '../../api/fetcher';

export default function ExperimentList() {
    const router = useRouter();
    const [openf, setOpenf] = useState(false);
    const [plants, setPlants] = useState(<></>);
    const [experiment, setExperiment] = useState(<></>);
    const { id } = router.query;

    const handleClickOpen = () => {
        setOpenf(true);
    };

    const handleClose = () => {
        setOpenf(false);
    };

    useEffect(() => {
        async function fetchData() {
            if (id === undefined) return;
            let data = await fetcher(window.location.origin + "/api/experiment/" + id, null)

            // TODO: IMAGE
            setExperiment(
                <Card sx={{ maxWidth: "100%", my: "10%" }}>
                    <CardMedia
                        component="img"
                        alt="plant-image"
                        height="140"
                        image="/placeholder.png" />
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
    )
}


