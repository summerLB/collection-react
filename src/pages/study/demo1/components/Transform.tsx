import { Input } from 'antd';
import { Dispatch } from 'react';

type TField = {
	label: string;
	value: string;
	onChange: Dispatch<string>;
};

const Field = ({ label, value, onChange }: TField) => {
	return (
		<div>
			<Input
				style={{ width: '200px' }}
				placeholder='input text'
				addonBefore={label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default Field;
