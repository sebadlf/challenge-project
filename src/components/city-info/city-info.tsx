import React from 'react';
import useCityInfo from '../../hooks/use-city-info';

interface CityInfoProps {
	cityId: number;
}

const CityInfo = ({ cityId }: CityInfoProps) => {
	const { city, loading, error } = useCityInfo(cityId);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Unable to load city info</div>;
	}

	return (
		<div>
			{city?.name} ({city?.subcountry || city?.country})
		</div>
	);
};

export default CityInfo;
