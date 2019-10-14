import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { map } from 'lodash-es';
import { fetchSources } from '../../ducks/news';
import { connect } from 'react-redux';
import Card from '../SourceCard';

const Sidebar = ({ sources, fetchSources }) => {
	useEffect(() => {
		fetchSources();
	}, []);

	return (
		<div className={styles.Root}>
			{map(sources, source => (
				<Card key={source.name} data={source} />
			))}
		</div>
	);
};
const mapStateToProps = state => ({
	sources : state.news.sources
});
const mapDispatchToProps = {
	fetchSources
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar);
