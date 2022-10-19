import React, {useState} from 'react';
import {getCountriesSummary} from './../../redux/actions/index';
import { useDispatch } from 'react-redux';
import Style from './Search.module.css'

export default function Search({setcurrentPage}) {

    const [input, setinput] = useState('');
    
    const dispatch = useDispatch();

    const searchInputHandler = (event) => {
        setinput(event.target.value)
    };

    const clickHandler = (event) => {
        event.preventDefault();
        dispatch(getCountriesSummary(input))
        setcurrentPage(1);
        setinput('');
    };

    return( 
        <div className={Style.inputsearch} >
            <button type="submit" onClick={clickHandler}>Search</button>
            <input type='text' placeholder={'Find your country...'} 
                    onChange={searchInputHandler} value={input}/>
        </div>
    )
}; 