import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { fetcher } from '../../api/fetcher';
import Header from '../../../components/navbar';
import gif from '../../../public/plant.gif';
import {FormControl, InputLabel, Input, FormHelperText, CardActions} from '@mui/material';

export default function ExperimentList() {
    const router = useRouter();
    const [openf, setOpenf] = useState(false);
    const [plants, setPlants] = useState(<></>);
    const [experiment, setExperiment] = useState(<></>);
    const [openEdit, setOpenEdit] = useState(false);
    const [saveData, setSaveData] = useState(null);
    const { id } = router.query;

    const handleClickOpen = () => {
        setOpenf(true);
    };

    const handleClose = () => {
        setOpenf(false);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    useEffect(() => {
        async function fetchData() {
            if (id === undefined) return;
            let data = await fetcher(window.location.origin + "/api/experiment/" + id, null)
            setSaveData(data);

            let plantData = await fetcher(window.location.origin + "/api/experiment/" + id + "/plants", null)

            setPlants(plantData.map((value) =>
                <Button key={value.id} sx={{
                    width: "90%", mx: "3%", borderRadius: 3, bkcolor: "gray", my: "2%", boxShadow: 3, bgcolor: "none", fontWeight: 'light', p: 0, color: "black",
                    '&:hover': {
                        color: 'green',
                        backgroundColor: 'white',
                    },
                }} onClick={() => router.push('/plant/' + value.id)}>
                    <CardContent backgroundColor="green">
                        <Image src={gif} alt="gif" height={100} width={100}/>
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
        <>
        <Header></Header><Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Button margin-right="0" variant="outlined" onClick={handleClickOpen}>New plant</Button>
                <Dialog open={openf}
                onClose={handleClose}
                fullWidth
                maxWidth = 'lg'
                className='popup-form'>
                    <form action={"/api/create/plant/"} method="POST" className="flex flex-col">
                        <fieldset>
                            <legend>New Plant</legend>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="exp-name" aria-describedby="my-helper-name" />

                        <InputLabel htmlFor="RaspberrypiPort">RaspberryPi Port</InputLabel>
                        <Input id="my-exp-raspport" aria-describedby="my-helper-info" />

                        <InputLabel htmlFor="RaspberrypiName">RaspberryPi Name</InputLabel>
                        <Input id="my-exp-raspName" aria-describedby="my-helper-info" />

                        <InputLabel htmlFor="ExperimentID">Experiment ID</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

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
            <Grid container spacing={3}>
                <Grid item xs={4}>
                <Card sx={{ maxWidth: "100%", my: "10%" }}>
                    <CardMedia
                        component="img"
                        alt="plant-image"
                        height="140"
                        image="/placeholder.png" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {saveData == null ? null : saveData.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {saveData == null ? null : saveData.info}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleClickOpenEdit}>Edit Experiment</Button>
                        {console.log(openEdit)}
                            <Dialog
                                open={openEdit}
                                onClose={handleCloseEdit}
                                fullWidth
                                maxWidth = 'lg'
                                className='popup-form'
                                >
                                <form action={"/api/create/experiment/"} method="PUT" className="flex flex-col">
                                    <fieldset>
                                        <legend>Edit Experiment</legend>
                                    
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input id="exp-name" aria-describedby="my-helper-name" defaultValue={(saveData == null) ? null : saveData.name} />

                                    <InputLabel htmlFor="info">More info</InputLabel>
                                    <textarea id="my-exp-info" aria-describedby="my-helper-info" defaultValue={saveData == null ? null : saveData.info}></textarea>
                                    
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
                {/* Recent Orders */}
                <Grid item sx={{}} xs={8}>
                    {plants}
                </Grid>
            </Grid>
        </Container></>
    )
}


