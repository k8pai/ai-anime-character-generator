import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(req: Request) {
	const replicate = new Replicate({
		auth: process.env.REPLICATE_API_TOKEN!,
	});

	const { prompt } = await req.json();

	try {
		const output = await replicate.run(
			'cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65',
			{
				input: {
					prompt: `masterpiece, best quality, illustration, beautiful detailed, finely detailed, dramatic light, intricate details, ${prompt}`,
				},
			},
		);

		return NextResponse.json({ characters: output });
	} catch (error) {
		console.log(`AI Character Generation Failed ${error}`);
		return NextResponse.json({ error: `AI Character Generation Failed.` });
	}
}
