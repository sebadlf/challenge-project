import React, { useState } from 'react';
import { Layout } from 'antd';

import useAxios from 'axios-hooks';

import './App.css';
import AutoComplete from './components/autocomplete/autocomplete';

import 'antd/dist/antd.css';
import { ApiResponse } from './types';

const { Header, Content, Footer } = Layout;

function App() {
	const [result, refetch] = useAxios<ApiResponse, string>('http://localhost:3030/cities');

	const { data, loading, error } = result;

	const cities = data?.data ?? [];

	const options = cities.slice(0, 5).map((c) => ({
		value: c.geonameid,
		label: c.name,
		subLabel: c.subcountry ? `${c.subcountry} - ${c.country}` : c.country,
	}));

	console.log(options);

	const [value, setValue] = useState<number[]>([]);

	return (
		<div className="App">
			<Layout className="layout">
				<Header>
					<div className="logo" />
				</Header>
				<Content style={{ padding: '2rem' }}>
					<div className="site-layout-content">
						<AutoComplete options={options} value={value} onChange={setValue} />
						<div>{value}</div>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Code Challenge - Sebastián de la Fuente</Footer>
			</Layout>
		</div>
	);
}

export default App;
