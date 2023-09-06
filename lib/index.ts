export const brushURL = (character: string) => {
	let href = character.split('pbxt/').pop();
	return `https://pbxt.replicate.delivery/${href}`;
};
