import React from 'react';
import { AutoComplete } from 'antd';

interface AutoCompleteOption {
	value: number;
	label: string;
	subLabel: string;
}

interface AutoCompleteProps {
	options: AutoCompleteOption[];
}

const renderOptions = (options: AutoCompleteOption[]) => options.map((op) => <div>{op.label}</div>);

const AutocompleteView = ({ options }: AutoCompleteProps) => <AutoComplete options={options} />;

export default AutocompleteView;
