import useAxiosRetry from 'axios-hooks';
import { useEffect } from 'react';
import { BASE_URL } from '../constants';
import {  CityInfoResponse } from '../types';


const useCityInfo = (cityId: number) => {

	const [result, refetch] = useAxiosRetry<CityInfoResponse, string>(`${BASE_URL}/cities/${cityId}`);

	const { data, loading, error } = result;

    useEffect(() => {
        if (error){
            // eslint-disable-next-line
            refetch()
        }
    }, [error, refetch])

    return {
        city: data,
        loading,
        error,
        refetch
    }
}


export default useCityInfo