import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import PHeader from '../../../components/plantsNavBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import {FormControl, InputLabel, Input, FormHelperText} from '@mui/material';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function PlantCard() {
    const router = useRouter();
    const [temperature, setTemperature] = useState([
    ])
    const [humidity, setHumidity] = useState([
    ])
    const [distance, setDistance] = useState([
    ])
    const [openEdit, setOpenEdit] = useState(false)

    const [plant, setPlant] = useState(null)

    const handleClickOpen = () => {
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenEdit(false);
    };

    const { id } = router.query
    let setupData = false;
    let setupPusher = false;

    useEffect(() => {
        async function fetchData() {
            if (id === undefined || setupData) return;
            setupData = true;

            let plantData = await fetcher(window.location.origin + "/api/plant/" + id + "/data");
            let plt = await fetcher(window.location.origin + "/api/plant/" + id + "");
            setPlant(plt);
            let temperatureCopy = []
            let humidityCopy = []
            let distanceCopy = []


            plantData.forEach((record) => {
                let time = Date.parse(record.time)
                if (record.hasOwnProperty("temperature")) {
                    temperatureCopy.push({ x: time, y: record.temperature })
                }

                if (record.hasOwnProperty("humidity")) {
                    humidityCopy.push({ x: time, y: record.humidity })
                }

                if (record.hasOwnProperty("distance")) {
                    distanceCopy.push({ x: time, y: record.distance })
                }
            })

            setTemperature(temp => [...temp, ...temperatureCopy].slice(-20))
            setHumidity(hum => [...hum, ...humidityCopy].slice(-20))
            setDistance(dist => [...dist, ...distanceCopy].slice(-20))
        }

        fetchData();
    }, [id])

    useEffect(() => {
        if (id === undefined || setupPusher) return;
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

            for (let i = 0; i < data.length; i++) {
                let record = data[i]

                if (record.hasOwnProperty("temperature")) {
                    temperatureCopy.push({ x: record.time * 1000, y: record.temperature })
                }

                if (record.hasOwnProperty("humidity")) {
                    humidityCopy.push({ x: record.time * 1000, y: record.humidity })
                }

                if (record.hasOwnProperty("distance")) {
                    distanceCopy.push({ x: record.time * 1000, y: record.distance })
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

    let maxVal = (Math.max(...temperature.map((val) => val.x)))
    let minVal = (Math.min(...temperature.map((val) => val.x)))

    if(isFinite(maxVal)) {
        if(maxVal - minVal > 30000) {
            minVal = maxVal - 30000;
        }
    } else {
        minVal = 0
    }

    return (
        <>
        <PHeader></PHeader>
        <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
            <Button variant="outlined" onClick={handleClickOpen} style={{marginRight: "80px", marginTop: "10px"}}>Take Notes</Button>
            <Dialog
                open={openEdit}
                onClose={handleClose}
                fullWidth
                maxWidth = 'lg'
                className='popup-form'
                >
                <form action={"/api/create/experiment/"} method="POST" className="flex flex-col">
                    <fieldset>
                        <legend>Take Notes</legend>
                    
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="exp-name" aria-describedby="my-helper-name" /*defaultValue={plant.name}*//>
            
                    <InputLabel htmlFor="info">More info</InputLabel>
                    <textarea id="my-exp-info" aria-describedby="my-helper-info" /*defaultValue={plant.info}*/></textarea>
                
                    
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
                                        data: temperature,
                                        fill: false,
                                    },
                                    {
                                        label: "Humidity",
                                        backgroundColor: 'rgb(132, 99, 255)',
                                        borderColor: 'rgb(132, 99, 255)',
                                        lineTension: 0.2,
                                        data: humidity,
                                        fill: false,
                                    },
                                    {
                                        label: "Distance",
                                        backgroundColor: 'rgb(132, 99, 132)',
                                        borderColor: 'rgb(132, 99, 132)',
                                        lineTension: 0.2,
                                        data: distance,
                                        fill: false,
                                    },
                                ]
                            }} options={{
                                scales: {
                                    y: {
                                        type: 'linear'
                                    },
                                    x: {
                                        type: 'linear',
                                        beginAtZero: false,
                                        min: minVal,
                                        ticks: {
                                            stepSize: 2000,
                                            callback: function (value, index, ticks) {
                                                return new Intl.DateTimeFormat("en-GB", { timeStyle: 'medium' }).format(new Date(value));
                                            }
                                        }
                                    }
                                }
                            }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container></>
    )
}


