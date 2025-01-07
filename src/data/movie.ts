export interface Movie {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	rating: number;
}

export const movies: Movie[] = [
	{
		id: 1,
		title: 'Inception',
		description: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
		imageUrl: 'https://picsum.photos/seed/inception/300/450',
		rating: 8.8,
	},
	{
		id: 2,
		title: 'The Shawshank Redemption',
		description:
			'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
		imageUrl: 'https://picsum.photos/seed/shawshank/300/450',
		rating: 9.3,
	},
	{
		id: 3,
		title: 'The Dark Knight',
		description:
			'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
		imageUrl: 'https://picsum.photos/seed/darkknight/300/450',
		rating: 9.0,
	},
	{
		id: 4,
		title: 'Pulp Fiction',
		description:
			'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
		imageUrl: 'https://picsum.photos/seed/pulpfiction/300/450',
		rating: 8.9,
	},
	{
		id: 5,
		title: 'Forrest Gump',
		description:
			'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
		imageUrl: 'https://picsum.photos/seed/forrestgump/300/450',
		rating: 8.8,
	},
];
