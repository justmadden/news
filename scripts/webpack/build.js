// Core
import webpack from 'webpack';
import chalk from 'chalk';

// Config
import getProdConfig from './config/webpack.prod';

const compiler = webpack(getProdConfig());

compiler.run((error, stats) => {
	if (error) {
		console.error(error.stack || error);

		if (error.details) {
			console.error(error.details);
		}

		return null;
	}

	const info = stats.toString({
		colors     : true,
		hash       : true,
		version    : true,
		timings    : true,
		env        : true,
		chunks     : false,
		modules    : false,
		children   : false,
		publicPath : true,
		reasons    : true,
		source     : false
	});

	console.log(chalk.greenBright('✓ Build completed'));
	console.log(info);

	if (stats.hasErrors()) {
		// compilation error (broken import, syntax error, etc)
		console.log(chalk.redBright('→ Error!'));
		console.error(info);
	}

	if (stats.hasWarnings()) {
		// warning
		console.log(chalk.yellowBright('→ Warning!'));
		console.warn(info);
	}
	return undefined;
});
