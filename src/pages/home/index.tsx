import { FC } from 'react';

const Home: FC = () => {
	return (
		<div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'pink' }}>
			<div style={{ height: '200px', backgroundColor: 'blue' }}></div>
			<div
				style={{
					position: 'absolute',
					bottom: 100,
					width: '100%',
					height: '100px',
					backgroundColor: 'green',
				}}
			></div>
		</div>
	);
};

export default Home;
