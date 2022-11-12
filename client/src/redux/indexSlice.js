import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allcountries:[],
    countries: [],
    countryDetail: {},
    activities: [],
    loading: true,
    actualPage: 1,
};  

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        getAllCountries:(state,action)=>{
                state.loading = false;
                state.countries = action.payload;
                state.allcountries = action.payload;
        },
        getAllActivities:(state,action)=>{
                state.activities = action.payload
        },
        getCountryDetail:(state,action)=>{
                state.loading = false;
                state.countryDetail = action.payload
        },
        getCountriesSummary:(state,action)=>{
                state.countries = action.payload
        },
        createActivity:(state,action)=>{
                state.activities = [...state.activities, action.payload]
        },
        deleteActivity:(state,action)=>{
               state.activities = state.activities.filter(activity=>activity.name !== action.payload) 
        },
        filterCountriesByContinent:(state,action)=>{
            const allcountries = state.allcountries;
            const filterstatus = action.payload === "All"? allcountries :
            allcountries.filter(country => country.continent === action.payload)
            state.countries = filterstatus;
        },
        filterCountriesByActivities:(state,action)=>{
            const all_countries2 = state.allcountries;
            const filtercountries = action.payload === "All"? 
            all_countries2.filter(country => country.tours.length > 0): 
            all_countries2.filter(country => country.tours.find(tour => 
                tour.name === action.payload));
            state.countries = filtercountries;
        },
        OrderbyABCs:(state,action)=>{
            let sortedArraux1 = [];
            let sortedArraux2 = [];  
            if(action.payload === "up"){
                sortedArraux1 = state.countries.sort((country1,country2)=>{
                    if(country1.name > country2.name) return 1;
                    if(country2.name > country1.name) return -1;
                    return 0});
                sortedArraux2 = state.allcountries.sort((country1,country2)=>{
                    if(country1.name > country2.name) return 1;
                    if(country2.name > country1.name) return -1;
                    return 0});
            }else{
                sortedArraux1 = state.countries.sort((country1,country2)=>{
                    if(country1.name > country2.name) return -1;
                    if(country2.name > country1.name) return 1;
                    return 0});
                sortedArraux2 = state.allcountries.sort((country1,country2)=>{
                    if(country1.name > country2.name) return -1;
                    if(country2.name > country1.name) return 1;
                    return 0});
            }
                state.countries = sortedArraux1;
                state.allcountries = sortedArraux2;
        },
        OrderbyPopulation:(state,action)=>{
            let sortedBArraux1 = [];
            let sortedBArraux2 = [];
            if(action.payload === "less"){
                sortedBArraux1 = state.countries.sort((country1,country2)=>{
                    if(country1.population > country2.population) return 1;
                    if(country2.population > country1.population) return -1;
                    return 0});
                sortedBArraux2 = state.allcountries.sort((country1,country2)=>{
                    if(country1.population > country2.population) return 1;
                    if(country2.population > country1.population) return -1;
                    return 0});
            }else{
                sortedBArraux1 = state.countries.sort((country1,country2)=>{
                    if(country1.population > country2.population) return -1;
                    if(country2.population > country1.population) return 1;
                    return 0});
                sortedBArraux2 = state.allcountries.sort((country1,country2)=>{
                    if(country1.population > country2.population) return -1;
                    if(country2.population > country1.population) return 1;
                    return 0});
            }
                state.countries = sortedBArraux1;
                state.allcountries = sortedBArraux2;
        },
        SetPaginadoGlobal:(state,action)=>{
                state.actualPage = action.payload;
        },
        loading:(state)=>{
                state.loading = true;
        }
    }
});

export function fetchCountries () {
    return async function(dispatch){
       dispatch(loading());
        let response = await axios.get("/countries");
        dispatch(getAllCountries(response.data));
    };
}; 

export function fetchActivities () {
    return async function(dispatch){
        let response = await axios.get("/activities");
        dispatch(getAllActivities(response.data));
    };
};

export const fetchCountryDetail = (id) => {
    return async function(dispatch){
        try{
            dispatch(loading());
            let response = await axios.get(`/countries/${id}`);
            return dispatch(getCountryDetail(response.data));
        }catch(error){
            return dispatch(getCountryDetail({}));
        }
    };
};

export const fetchCountriesbyQuery = (name) =>{
    return async function(dispatch){
        try{
            let response = await axios.get(`/countries?name=${name}`);
            return dispatch(getCountriesSummary(response.data));
        }catch(error){
            return dispatch(getCountriesSummary(error.message));
        }
    };
};

export const postActivity = (values) => {
    return async function(dispatch){
        await axios.post("/activities", values); 
        return dispatch(createActivity(values));
    }
};

export const thunkdeleteActivity = (name) => {
    return async function(dispatch){
        await axios.delete("/activities", {data:{name}}); 
        return dispatch(deleteActivity(name));
    }
};

export const {  getAllCountries,
                getAllActivities,
                getCountryDetail,
                getCountriesSummary,
                createActivity,
                deleteActivity,
                filterCountriesByContinent,
                filterCountriesByActivities,
                OrderbyABCs,
                OrderbyPopulation,
                SetPaginadoGlobal,
                loading,
                } = countriesSlice.actions;

export default countriesSlice.reducer;