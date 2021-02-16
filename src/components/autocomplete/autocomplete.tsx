import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { FilterTwoTone, LoadingOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Highlighter from 'react-highlight-words';
import { useDebouncedCallback } from 'use-debounce';

import './autocomplete.css';

export interface AutoCompleteOption {
	value: number;
	label: string;
	subLabel: string;
}

interface AutoCompleteProps {
	options: AutoCompleteOption[];
	value: number[];
	onChange: (value: number[]) => void;
	onSearch: (value: string) => void;
	loading: boolean;
	placeholder: string;
}

const AutocompleteView = ({
	options,
	value,
	loading,
	onChange,
	onSearch,
	placeholder,
}: AutoCompleteProps): React.ReactElement => {
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
						<Highlighter
							highlightClassName="AutoComplete-Highlight"
							searchWords={[localValue]}
							textToHighlight={op.label}
						/>
						<Highlighter
							highlightClassName="AutoComplete-Highlight"
							searchWords={[localValue]}
							textToHighlight={op.subLabel}
						/>
					</div>
				</div>
			),
		}));

	const debounceOnSearch = useDebouncedCallback(onSearch, 300);

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
				onSearch('');
			}}
			options={renderOptions(options)}
			onSearch={(searchValue) => debounceOnSearch.callback(searchValue)}
		>
			<Input
				prefix={<FilterTwoTone twoToneColor="#52c41a" />}
				suffix={loading ? <LoadingOutlined /> : undefined}
				placeholder={placeholder}
			/>
		</AutoComplete>
	);
};

export default AutocompleteView;
