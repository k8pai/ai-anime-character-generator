import React from 'react';
import { TiTick } from 'react-icons/ti';

const Notifier = ({
	state,
	heading = 'Copied to clipboard',
}: {
	state: boolean;
	heading?: string;
}) => {
	return (
		<div
			className={`w-fit absolute left-1/2 bottom-10 -translate-x-1/2 transition-all overflow-hidden shadow-md ${
				state
					? 'scale-100 opacity-100 visible'
					: 'scale-95 opacity-0 invisible'
			} py-2 px-3 bg-zinc-800/60 max-w-sm rounded-md`}
		>
			<div className="flex items-center whitespace-nowrap space-x-2">
				<TiTick className={`h-5 w-5 text-green-500`} />
				<h1 className={`text-sm text-slate-100`}>{heading}</h1>
			</div>
		</div>
	);
};

export default Notifier;
