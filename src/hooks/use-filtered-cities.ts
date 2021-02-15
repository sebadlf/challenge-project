import useAxios from 'axios-hooks';
import { BASE_URL } from '../constants';
import { ApiResponse } from '../types';


const usePreferredCities = (filter: string) => {

	const [resultCities, refetchCities] = useAxios<ApiResponse, string>(`${BASE_URL}/cities?filter=${filter}&limit=100`);

	const { data: dataCities, loading: loadingCities, error: errorCities } = resultCities;

    return {
        cities: dataCities?.data ?? [],
        errorCities,
        refetchCities,
        loading: loadingCities
    }
}


export default usePreferredCities