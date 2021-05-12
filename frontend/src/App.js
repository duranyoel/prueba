import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import { Button, Paper, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Moment from 'react-moment';

function App() {

  const [value, setValue] = useState("");
  const [temp, settemp] = useState("");
  const [typecity, settypecity] = useState("");
  const [city, setcity] = useState("Caracas");
  const [img, setimg] = useState("");
  const [disc, setdisc] = useState("");
  const [currentDate, setCurrentDate] = useState('');

  const baseUrl = 'https://localhost:44340/api/';

  const [history, setHistory] = useState({
    ciudad: '',
    info: '',
    fecha: '2021-01-01'
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setHistory(prevState => ({
      ...prevState,
      [name]: value
    }))
    settypecity(e.target.value) 
    console.log(history);
  }
  const peticionPost = async () => {
    await axios.post(baseUrl + `histories`, history)
      .then(response => {
        setValue(response.data)

      })
  }
  const citySelect = (e) => {
    e.preventDefault();
    setcity(typecity);
    setCurrentDate(currentDate);
  };

  useEffect(() => {
    axios(
      baseUrl + `wheather/${city}`
    ).then((res) => {
      console.log(res);

      setValue(res.data);
      settemp(res.data.main);

      setdisc(res.data.weather[0].description);


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

      setValue(result.data);
    });
  }, [city]);


  return (
    <div>
      <Paper className='paper'>
        <form onSubmit={citySelect}>
          <TextField placeholder="Ciudad?"
            value={typecity} name="ciudad"
            onChange={handleChange} />
          <TextField
            value={currentDate} name="fecha"
          />
          <Button type="submit" onClick={() => peticionPost()}>
            <SendIcon />
          </Button>

        </form>

        <h4>Resultado</h4>
        <p>Ciudad: {value.name},  Pais :{value.sys.country}</p>
        <p>Temperatura Min: {`${Math.floor(temp.temp_min - 273.15)}° C`}</p>
        <p>Temperatura Max: {`${Math.floor(temp.temp_max - 273.15)}° C`}</p>
      </Paper>
    </div>
  );
}

export default App;
