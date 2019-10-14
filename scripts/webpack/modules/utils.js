// Core
import { HotModuleReplacementPlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from 'dotenv-webpack';
import { resolve } from 'path';

// Constants
import { PROJECT_ROOT } from '../constants';

export const connectBuildProgressIndicator = () => ({
	plugins: [new WebpackBar()]
});

export const connectFriendlyErrors = () => ({
	plugins: [new FriendlyErrorsWebpackPlugin()]
});

export const connectHMR = () => ({
	plugins: [new HotModuleReplacementPlugin()]
});

export const cleanDirectories = () => ({
	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			root: PROJECT_ROOT
		})
	]
});

export const connectBundleAnalyzer = () => ({
	plugins: [new BundleAnalyzerPlugin({})]
});

export const defineEnvVariables = () => {
	return {
		plugins: [new Dotenv({ path: resolve(PROJECT_ROOT, '.env') })]
	};
};
