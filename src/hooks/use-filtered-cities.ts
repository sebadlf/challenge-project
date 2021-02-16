import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { BASE_URL } from '../constants';
import { ApiResponse } from '../types';


const usePreferredCities = (filter: string) => {

	const [resultCities, refetchCities] = useAxios<ApiResponse, string>(`${BASE_URL}/cities?filter=${filter}&limit=100`);

	const { data: dataCities, loading: citiesLoading, error: citiesError } = resultCities;

    useEffect(() => {
        if (citiesError){
            // eslint-disable-next-line
            refetchCities()
        }
    }, [citiesError, refetchCities])    

    return {
        cities: dataCities?.data ?? [],
        citiesError,
        citiesLoading,
        refetchCities,   
    }
}


export default usePreferredCities