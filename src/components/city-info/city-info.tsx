import React from 'react';
import useCityInfo from '../../hooks/use-city-info';
import ErrorMessage from '../error-message/error-message';

interface CityInfoProps {
	cityId: number;
}

const CityInfo = ({ cityId }: CityInfoProps): React.ReactElement => {
	const { city, loading, error } = useCityInfo(cityId);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <ErrorMessage message="Unable to load city info" />;
	}

	return (
		<div>
			{city?.name} ({city?.subcountry || city?.country})
		</div>
	);
};

export default CityInfo;
