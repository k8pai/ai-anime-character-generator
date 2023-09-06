'use client';

import Notifier from '@/components/Notifier';
import { brushURL } from '@/lib';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import {
	MdOutlineFileDownload,
	MdOutlineBookmarkAdd,
	MdCopyAll,
} from 'react-icons/md';

export default function Home() {
	const [prompt, setPrompt] = useState('');
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [notifier, setNotifier] = useState(false);

	const handleDownloadClick = async (character: string) => {
		const response = await fetch(brushURL(character));
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'anime-character.png'; // Customize the filename here
		link.target = '_blank';
		link.click();

		// Clean up the blob URL
		window.URL.revokeObjectURL(url);
	};

	const handleCopyClick = async (character: string) => {
		setNotifier(true);
		navigator.clipboard.writeText(character);
		setTimeout(() => {
			setNotifier(false);
		}, 1500);
	};

	const generateCharacters = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			});

			const { characters } = await response.json();
			console.log('characters ', characters);
			setCharacters(characters);
		} catch (error) {
			console.error('Failed to generate anime characters:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen">
			<h1 className="text-3xl font-bold mb-4">
				AI Anime Character Generator
			</h1>
			<form
				className="flex items-center gap-3"
				action={generateCharacters}
			>
				<input
					type="text"
					placeholder="Enter your character prompt..."
					className="text-black border p-2 rounded w-full"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<button
					type="submit"
					onClick={generateCharacters}
					className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
					disabled={loading}
				>
					{loading ? (
						<div className="flex items-center gap-3">
							<span>Generating </span>
							<AiOutlineLoading className={`animate-spin`} />
						</div>
					) : (
						'Generate Characters'
					)}
				</button>
			</form>
			<div className="mt-6 flex flex-wrap gap-3">
				{characters?.map((character, index) => (
					<div
						key={index}
						className="mt-6 p-3 pb-0 bg-neutral-800 w-fit rounded-md"
					>
						<Image
							src={character ?? 'https://example.com'}
							width={225}
							height={225}
							alt={`Anime Character ${index + 1}`}
							className="rounded-md"
						/>
						<div className="w-full flex justify-end py-2">
							<button
								onClick={() =>
									handleCopyClick(brushURL(character))
								}
								className="m-1 p-1 rounded-lg shadow-md bg-zinc-700/40"
							>
								<MdCopyAll className={'h-6 w-6'} />
							</button>
							<button
								onClick={() => handleDownloadClick(character)}
								className="m-1 p-1 rounded-lg shadow-md bg-zinc-700/40"
							>
								<MdOutlineFileDownload className={'h-6 w-6'} />
							</button>
							{/* <button
									onClick={() =>
										console.log('added to notifier...')
									}
									className="m-1 p-1 rounded-lg shadow-md bg-zinc-700/40"
								>
									<MdOutlineBookmarkAdd
										className={'h-6 w-6'}
									/>
								</button> */}
						</div>
					</div>
				))}
			</div>
			<Notifier state={notifier} />
		</div>
	);
}

// ('https://replicate.delivery/pbxt/eY72hYfDn1ospElHH2fZXaMBafEV9eWmSLEIHiQmjvWCV2KMC/out-0.png');
