import Image from 'next/image';
import { CSSProperties } from 'react';

type Props = {
	style?: CSSProperties;
	title?: string;
	heightSection?: number | string;
};
export const LoadingScreen = ({ style, title, heightSection }: Props) => {
	return (
		<>
			<div className='loading-screen h-screen flex justify-center items-center w-full' style={style}>
				<div className='overlay-loading-screen'></div>
				<div className='container'>
					<div className='loading-wr' style={{ height: heightSection }}>
						<div className='loading-main'>
							<div className='loader'></div>
							<div className='img-logo'>
								<Image src={'/loading.gif'} width={60} height={60} alt='Edit' />
							</div>
						</div>
						{!!title && <h1 className='mt-2 whitespace-nowrap'>{title}</h1>}
					</div>
				</div>
			</div>
		</>
	);
};
