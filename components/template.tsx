import React, { Component } from "react";
import styles from "../styles/Index.module.css";
import Head from "next/head";

export default class Template extends Component<TemplateProps, TemplateState> {
	constructor(props: TemplateProps) {
		super(props);
	}
	render() {
		let { title, onSearchChange, onGenreChange } = this.props;
		return (
			<div>
				<Head>
					<title>{title}</title>
					<meta
						name="description"
						content="Charter Coding Challenge by Rose Golden"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className={styles.navBar}>
					<input
						onChange={onSearchChange}
						name="text"
						type="text"
						className={styles.searchInput}
					/>
					<select
						onChange={onGenreChange}
						name="genre"
						id="genres"
						className={styles.genreSelect}
					>
						<option value="">All</option>
						<option value="Action">Action</option>
						<option value="Adventure">Adventure</option>
						<option value="Comedy">Comedy</option>
						<option value="Dark comedy">Dark comedy</option>
						<option value="Children">Children</option>
						<option value="Crime drama">Crime Drama</option>
						<option value="Horror">Horror</option>
						<option value="Thriller">Thriller</option>
						<option value="Mystery">Mystery</option>
						<option value="Drama">Drama</option>
						<option value="Drama">Historical drama</option>
						<option value="Biography">Biography</option>
						<option value="Western">Western</option>
						<option value="Fantasy">Fantasy</option>
						<option value="Animated">Animated</option>
						<option value="Science fiction">Science fiction</option>
					</select>
				</div>
				{React.Children.toArray(this.props.children)}
			</div>
		);
	}
}

export interface TemplateProps {
	title: string;
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface TemplateState {}
