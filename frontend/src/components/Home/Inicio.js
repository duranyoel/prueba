import React, { useState, useEffect } from "react";
import './../../App.css';
import axios from 'axios';
import { Button, Paper, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Historial from './../Historial/Historial';

const baseUrl = 'https://localhost:44340/api/';
function Inicio() {
    const [valor, setValor] = useState({
        name: ''
    });
    const [noti, setNoticias] = useState([]);
    const [temp, settemp] = useState("");
    const [typecity, settypecity] = useState("");
    const [city, setcity] = useState("Caracas");
    const [desc, setDesc] = useState("");
    const [currentDate, setCurrentDate] = useState('');
    const [historial, setHistorial] = useState('');



    const [history, setHistory] = useState({
        ciudad: '',
        info: '',
        fecha: Date.now()
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setHistory(prevState => ({
            ...prevState,
            [name]: value
        }))
        settypecity(e.target.value)
        //console.log(history);
    }


    const peticionPost = async () => {
        await axios.post(baseUrl + `histories`, history)
            .then(response => {
                

            })
    }
    const citySelect = (e) => {
        e.preventDefault();
        setcity(typecity);
        
    };

    useEffect(() => {
        axios(
            baseUrl + `wheather/${city}`
        ).then((res) => {
            //console.log(res);
            setValor(res.data[0]);
            settemp(res.data[0].main);
            setDesc(res.data[0].weather[0].description);
            setNoticias(res.data[1].articles);


            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            setCurrentDate(
                date + '/' + month + '/' + year
                + ' ' + hours + ':' + min + ':' + sec
            );

        }).catch(result => {

        });
    }, [city]);

    return (
        <Paper className='paper'>
            <form onSubmit={citySelect} className='formulario'>
                <h4>Buscar:</h4>
                <TextField placeholder="Ciudad?"
                    value={typecity} name="ciudad"
                    onChange={handleChange} />
                <TextField
                    value={currentDate} type="hidden" name="fecha" onChange={handleChange}
                />
                <Button type="submit" onClick={() => peticionPost()}>
                    <SendIcon />
                </Button>

            </form>
            <div className='recientes'>
                <h4>Recientes</h4>
                <Historial />
            </div>
            
            <h3>Resultado</h3>
            <h4>Clima</h4>
            <p>Ciudad: {valor.name}</p>
            <p>Descripcion: {desc}</p>
            <p>Temperatura Min: {`${Math.floor(temp.temp_min - 273.15)}° C`}</p>
            <p>Temperatura Max: {`${Math.floor(temp.temp_max - 273.15)}° C`}</p>

            <h4>Noticias</h4>

            {

                //console.log(noti)
                noti.map(item => (
                    <Card className={'card'}>
                        <CardHeader

                            title={item.title}

                        />
                        <CardMedia
                            className={'media'}
                            image={item.urlToImage}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>


                    </Card>

                ))
            }
        </Paper>
    );

}

export default Inicio;