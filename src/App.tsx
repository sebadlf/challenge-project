import React, { useState } from 'react';
import { Layout } from 'antd';

import './App.css';
import AutoComplete from './components/autocomplete/autocomplete';
import CityInfo from './components/city-info/city-info';

import 'antd/dist/antd.css';
import useFilteredCities from './hooks/use-filtered-cities';
import usePreferredCities from './hooks/use-preferred-cities';

import { getCitiesOptions } from './utils/utils';
import ErrorMessage from './components/error-message/error-message';

const { Header, Content, Footer } = Layout;

function App(): React.ReactElement {
	const [filter, setFilter] = useState<string>('');

	const { cities, citiesError, citiesLoading } = useFilteredCities(filter);

	const {
		preferredCities,
		preferredCitiesError,
		updatePreferredCities,
		updatePreferredCitiesError,
	} = usePreferredCities();

	const onChangeHandler = async (newValue: number[]) => {
		await updatePreferredCities(preferredCities, newValue);
	};

	return (
		<div className="App">
			<Layout className="layout">
				<Header>
					<div className="logo" />
				</Header>
				<Content style={{ padding: '2rem' }}>
					<div className="site-layout-content">
						<div className="App-PreferredCities">
							{preferredCitiesError && <ErrorMessage message="Unable to load city list" />}

							{updatePreferredCitiesError && <ErrorMessage message="Unable to update city list" />}

							{preferredCities && preferredCities.length ? (
								preferredCities
									.map<React.ReactNode>((v) => <CityInfo key={v} cityId={v} />)
									.reduce((prev, curr) => (prev ? [prev, <div>&nbsp;-&nbsp;</div>, curr] : [curr]))
							) : (
								<div>Select your favority cities</div>
							)}
						</div>

						{citiesError && <ErrorMessage message="Unable to load city list" />}

						<AutoComplete
							options={getCitiesOptions(cities)}
							value={preferredCities}
							loading={citiesLoading}
							onChange={onChangeHandler}
							onSearch={setFilter}
							placeholder="Type to filter by city or country"
						/>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Code Challenge - Sebastián de la Fuente</Footer>
			</Layout>
		</div>
	);
}

export default App;
