import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { map } from 'lodash-es';
import { fetchArticles, fetchMoreArticles } from '../../ducks/news';
import { connect } from 'react-redux';
import Card from '../ArticlesCard';
import { useParams } from 'react-router-dom';

const Articles = ({
	articles,
	fetchArticles,
	fetchMoreArticles,
	count,
	page
}) => {
	const { sources } = useParams();

	const cards = useRef(null);

	useEffect(() => {
		fetchArticles({ sources });
		if (cards) {
			cards.current.scrollTo(0, 0);
		}
	}, [sources]);

	return (
		<div className={styles.Root}>
			<p className={styles.Count}>
				Count: <span>{count}</span>
			</p>
			<div ref={cards} className={styles.Cards}>
				{map(articles, source => (
					<Card key={source.url} data={source} />
				))}
				<div className={styles.Line} />
			</div>
			<div className={styles.LoadMoreBlock}>
				{!!count && (
					<button
						type="button"
						onClick={() => {
							fetchMoreArticles({ sources, page });
						}}>
						Load more
					</button>
				)}
			</div>
		</div>
	);
};
const mapStateToProps = state => ({
	articles : state.news.articles,
	count    : state.news.articlesCount,
	page     : state.news.articlesPage
});
const mapDispatchToProps = {
	fetchArticles,
	fetchMoreArticles
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Articles);
