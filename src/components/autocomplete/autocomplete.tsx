import React, { useState } from 'react';
import { AutoComplete, Input, Select } from 'antd';
import { FilterTwoTone, LoadingOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

import './autocomplete.css';

interface AutoCompleteOption {
	value: number;
	label: string;
	subLabel: string;
}

interface AutoCompleteProps {
	options: AutoCompleteOption[];
	value: number[];
	onChange: (value: number[]) => void;
}

const AutocompleteView = ({ options, value, onChange }: AutoCompleteProps) => {
	const [localValue, setLocalValue] = useState('');

	const renderOptions = (localOptions: AutoCompleteOption[]) =>
		localOptions.map((op) => ({
			value: op.value,
			label: (
				<div key={op.value} className="AutoComplete-Item">
					<div className="AutoComplete-CheckboxContainer">
						<Checkbox checked={value.includes(op.value)} />
					</div>
					<div className="AutoComplete-LabelContainer">
						<div className="AutoComplete-Label">{op.label}</div>
						<div className="AutoComplete-SubLabel">{op.subLabel}</div>
					</div>
				</div>
			),
		}));

	return (
		<AutoComplete
			value={localValue}
			onChange={setLocalValue}
			dropdownMatchSelectWidth={252}
			style={{ minWidth: '20rem' }}
			onSelect={(selectedValue) => {
				const selectedValueNum = Number(selectedValue);

				const newValue = value.includes(Number(selectedValue))
					? value.filter((v) => v !== selectedValueNum)
					: [...value, selectedValueNum];

				setLocalValue('');

				onChange(newValue);
			}}
			options={renderOptions(options)}
		>
			<Input
				prefix={<FilterTwoTone twoToneColor="#52c41a" />}
				suffix={<LoadingOutlined />}
				placeholder="input here"
			/>
		</AutoComplete>
	);
};

export default AutocompleteView;
