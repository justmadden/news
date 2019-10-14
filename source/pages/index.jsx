import React from 'react';

import Sidebar from '../components/Sidebar';
import Articles from '../components/Articles';
import Hint from '../components/Hint';
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from './styles.module.css';

const Main = () => {
	return (
		<div className={styles.Root}>
			<div className={styles.Sidebar}>
				<Sidebar />
			</div>

			<div className={styles.Articles}>
				<Switch>
					<Route component={Articles} path="/articles/:sources" />
					<Route component={Hint} path="/" />
				</Switch>
			</div>
		</div>
	);
};

export default withRouter(Main);
