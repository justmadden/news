import React from 'react';
import styles from './styles.module.css';
import dayjs from 'dayjs';

export default function Card({
	data: { title, author, publishedAt, url, urlToImage }
}) {
	return (
		<div className={styles.Root}>
			<img className={styles.Image} src={urlToImage} />
			<div className={styles.Block}>
				<p className={styles.Date}>
					{dayjs(publishedAt).format('DD/MM/YYYY  mm:HH')}
				</p>
				<p className={styles.Author}>{author}</p>
			</div>

			<a className={styles.Title} href={url} target="_blank">
				{title}
			</a>
		</div>
	);
}
