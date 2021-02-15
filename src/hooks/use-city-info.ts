import useAxios from 'axios-hooks';
import { BASE_URL } from '../constants';
import {  CityInfoResponse } from '../types';


const useCityInfo = (cityId: number) => {

	const [result, refetch] = useAxios<CityInfoResponse, string>(`${BASE_URL}/cities/${cityId}`);

	const { data, loading, error } = result;

    return {
        city: data,
        loading,
        error,
        refetch
    }
}


export default useCityInfo