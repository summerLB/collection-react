import { Select } from 'antd';
import { Dispatch } from 'react';

type TLanguage = {
	onChange: Dispatch<string>;
};

const Language = ({ onChange }: TLanguage) => {
	const options = [
		{ value: 'jack', label: 'Jack' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
		{ value: 'disabled', label: 'Disabled', disabled: true },
	];
	return (
		<div>
			<Select id='select' defaultValue='jack' style={{ width: 200 }} onChange={onChange} options={options} />
		</div>
	);
};

export default Language;
