import React from 'react';
import styles from './styles.module.css';

export default function Hint() {
	return (
		<div className={styles.Root}>
			<p> {'<-'} Select source</p>
		</div>
	);
}
