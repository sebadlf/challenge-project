import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { BASE_URL } from '../constants';
import { PreferredCitiesResponse } from '../types';

const usePreferredCities = () => {
    const [preferredCitiesResponse, preferredCitiesRefetch] = useAxios<PreferredCitiesResponse, string>(
		`${BASE_URL}/preferences/cities`
	);

    const {data: preferredCities, error: preferredCitiesError, loading: preferredCitiesLoading} = preferredCitiesResponse;

	const [{ loading: updatePreferredCitiesLoading, error: updatePreferredCitiesError }, executePatch] = useAxios(
		{
			url: `${BASE_URL}/preferences/cities`,
			method: 'PATCH',
		},
		{ manual: true }
	);

    useEffect(() => {
        if (preferredCitiesError){
            // eslint-disable-next-line
            preferredCitiesRefetch()
        }
    }, [preferredCitiesError, preferredCitiesRefetch])       

    const updatePreferredCities = async (oldSelection: number[], newSelection: number[]) => {
		
        const transformedValue: {
            [key: number]: boolean
        } = newSelection.reduce(
			(acc, act) => ({
				...acc,
				[act]: true,
			}),
			{}
		);

        oldSelection.filter(s=> !newSelection.includes(s)).forEach(s=>{
            transformedValue[s] = false;
        })

        await executePatch({data:transformedValue})

        await preferredCitiesRefetch()
    }


    return {
        preferredCities: preferredCities?.data ?? [],
        preferredCitiesError,
        preferredCitiesLoading,
        updatePreferredCitiesLoading,
        updatePreferredCitiesError,
        updatePreferredCities
    }
}

export default usePreferredCities