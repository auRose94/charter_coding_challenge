import axios from "axios";
import Template from "../../components/template";
import styles from "../../styles/Index.module.css";
import { useRouter } from "next/router";
const APIKEY = process.env.APIKEY || "Api-Key q3MNxtfep8Gt";

export default function Movie({ movie }) {
	const router = useRouter();
	console.log(movie);

	if (!movie) return null;

	// Render movie...
	return (
		<Template
			title={movie.title}
			onSearchChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				location.replace(`/?s=${event.currentTarget.value}`);
			}}
			onGenreChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
				location.replace(`/?g=${event.currentTarget.value}`);
			}}
		>
			<div className={styles.movieContainer}>
				<h1>
					{movie.title} ({movie.releaseYear})
				</h1>
				<p>Genres: {(movie.genres as string[]).join(", ")}</p>
				<p>{movie.description}</p>
				<p>
					Cast:{" "}
					{movie.topCast
						.map((item) => {
							return `${item.name} as ${item.characterName}`;
						})
						.join(", ")}
				</p>

				<object data={`/images/${movie.id}.jpeg`} type="image/jpeg">
					<img src="/images/defaultImage.jpeg" />
				</object>
			</div>
		</Template>
	);
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	// params contains the movie `id`.
	// If the route is like /movies/1, then params.id is 1
	const response = await axios.get(
		`https://code-challenge.spectrumtoolbox.com/api/movies/${params.id}`,
		{
			headers: {
				Authorization: APIKEY,
			},
		}
	);

	// Pass movie data to the page via props
	return { props: { movie: response.data.data } };
}
