import React, { useState, useEffect,Fragment  } from "react";
import axios from 'axios';
import { Button} from '@material-ui/core';

const baseUrl = 'https://localhost:44340/api/';
function Historial(props) {
    const [data, setData] = useState([]);
    
    

    const peticionGet=async()=>{
        await axios.get(baseUrl + `histories`)
        .then(response=>{
          setData(response.data);
        })
      }
    
    useEffect(() => {
        peticionGet();
      }, []);
    

    return (
        <div>
            <Fragment>
                <ul>
                    {data.map(item => (<li key={item.id}> <Button >{item.ciudad}</Button> </li> ))}
                   
                </ul>
            </Fragment>
        </div>
    );

}

export default Historial;