import useAxios from 'axios-hooks';
import { BASE_URL } from '../constants';
import { PreferredCitiesResponse } from '../types';

const usePreferredCities = () => {
    const [preferredCitiesResponse, preferredCitiesRefetch] = useAxios<PreferredCitiesResponse, string>(
		`${BASE_URL}/preferences/cities`
	);

    const {data: preferredCities, error: preferredCitiesError, loading: preferredCitiesLoading} = preferredCitiesResponse;

    // eslint-disable-next-line
	const [{ data: patchData, loading: patchLoading, error: patchError }, executePatch] = useAxios(
		{
			url: `${BASE_URL}/preferences/cities`,
			method: 'PATCH',
		},
		{ manual: true }
	);

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
        patchData, // eslint-disable-line
        patchLoading,
        patchError,
        updatePreferredCities
    }
}

export default usePreferredCities