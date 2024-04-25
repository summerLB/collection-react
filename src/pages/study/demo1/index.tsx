import { FC, useState } from 'react';
import Field from './components/Field';
import Language from './components/Language';
import Transform from './components/Transform';

const Demo1: FC = () => {
	const [value, setValue] = useState('');
	const [language, setLanguage] = useState('jack');
	return (
		<div>
			<Field label={'输入'} value={value} onChange={setValue} />
			<Language onChange={setLanguage} />
			<Transform label={'输入'} value={value} onChange={setValue} />
		</div>
	);
};

export default Demo1;
