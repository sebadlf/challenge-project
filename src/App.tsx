import React, { useState } from 'react';
import { Layout } from 'antd';

import './App.css';
import AutoComplete from './components/autocomplete/autocomplete';
import CityInfo from './components/city-info/city-info';

import 'antd/dist/antd.css';
import useFilteredCities from './hooks/use-filtered-cities';
import usePreferredCities from './hooks/use-preferred-cities';

import { getCitiesOptions } from './utils/utils';

const { Header, Content, Footer } = Layout;

function App() {
	const [filter, setFilter] = useState<string>('');

	const { cities, loading } = useFilteredCities(filter);

	const { preferredCities, updatePreferredCities } = usePreferredCities();

	console.log(preferredCities);

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
						{preferredCities.map((v) => (
							<CityInfo key={v} cityId={v} />
						))}
						<AutoComplete
							options={getCitiesOptions(cities)}
							value={preferredCities}
							loading={loading}
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
