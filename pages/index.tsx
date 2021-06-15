import axios from "axios";
import Template from "../components/template";
import styles from "../styles/Index.module.css";
import MovieCard from "../components/movieCard";
import { Component } from "react";

const APIKEY = process.env.APIKEY || "Api-Key q3MNxtfep8Gt"; // Temp Fix... env not working

export default class MainAppIndex extends Component<
	MainAppIndexProps,
	MainAppIndexState
> {
	onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			searchText: event.currentTarget.value,
		});
	}

	onGenreChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this.setState({
			genreSelected: event.currentTarget.value,
		});
	}

	async apiCall(url: string, args: any = null) {
		try {
			const response = await axios.get(url, {
				data: args,
				headers: {
					Authorization: APIKEY,
				},
			});
			return response.data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	constructor(props: MainAppIndexProps) {
		super(props);
		let searchText = "";
		let genreSelected = "";
		this.state = {
			movies: [],
			searchText,
			genreSelected,
		};
	}

	async componentDidMount() {
		let query = new URLSearchParams(location.search);
		let searchText = "";
		let genreSelected = "";
		if (query.has("s")) searchText = query.get("s");
		if (query.has("g")) genreSelected = query.get("g");

		let response = await this.apiCall(
			"https://code-challenge.spectrumtoolbox.com/api/movies"
		);
		this.setState({
			movies: response.data,
			searchText,
			genreSelected,
		});
	}

	render() {
		let { movies, searchText, genreSelected } = this.state;
		let movieElements = movies.map((movie) => {
			let render = false;
			if (genreSelected == "" && searchText == "") render = true;
			if (
				genreSelected != "" &&
				movie.genres.find((value) => genreSelected == value) != null
			)
				render = true;
			if (searchText != "" && movie.title.indexOf(searchText) != -1)
				render = true;
			if (render)
				return <MovieCard key={movie.id} id={movie.id} title={movie.title} />;
			return null;
		});
		return (
			<Template
				title="Charter Home"
				onSearchChange={this.onSearchChange.bind(this)}
				onGenreChange={this.onGenreChange.bind(this)}
			>
				<div className={styles.movieContainer}>{movieElements}</div>
			</Template>
		);
	}
}

export interface Movie {
	title: string;
	id: string;
	genres: string[];
}

export interface MainAppIndexProps {}

export interface MainAppIndexState {
	movies: Movie[];
	searchText: string;
	genreSelected: string;
}
