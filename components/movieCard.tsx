import React, { Component } from "react";
import styles from "../styles/Index.module.css";

export default class MovieCard extends Component<
	MovieCardProps,
	MovieCardState
> {
	state = {
		title: "",
	};
	constructor(props: MovieCardProps) {
		super(props);
		this.state = {
			title: props.title,
		};
	}
	render() {
		let { id } = this.props;
		let { title } = this.state;
		return (
			<div id={id} className={styles.movieCard}>
				<a href={`/movie/${id}`}>
					<div>
						<h1>{title}</h1>
						<object data={`/images/${id}.jpeg`} type="image/jpeg">
							<img src="/images/defaultImage.jpeg" />
						</object>
					</div>
				</a>
			</div>
		);
	}
}

export interface MovieCardProps {
	id: string;
	title: string;
}

export interface MovieCardState {
	title: string;
}
