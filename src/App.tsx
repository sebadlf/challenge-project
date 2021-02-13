import React from 'react';
import { Layout } from 'antd';

import './App.css';
import AutoComplete from './components/autocomplete/autocomplete';

import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
	return (
		<div className="App">
			<Layout className="layout">
				<Header>
					<div className="logo" />
				</Header>
				<Content style={{ padding: '2rem' }}>
					<div className="site-layout-content">
						<AutoComplete options={[]} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Code Challenge - Sebastián de la Fuente</Footer>
			</Layout>
		</div>
	);
}

export default App;
