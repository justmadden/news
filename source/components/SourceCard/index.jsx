import React from 'react';
import styles from './styles.module.css';
import ClampLines from 'react-clamp-lines';
import { Link } from 'react-router-dom';

export default function Card({ data: { name, description, id } }) {
	return (
		<div key={id} className={styles.Card}>
			<Link to={`/articles/${id}`}>
				<p className={styles.Title}>{name}</p>
				<ClampLines
					buttons={false}
					className={styles.Desc}
					ellipsis="..."
					lines={3}
					text={description}
				/>
			</Link>
		</div>
	);
}
