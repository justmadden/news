// Core
import { ContextReplacementPlugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

export const optimizeBuild = () => ({
	optimization : {
		nodeEnv : 'production',

		minimize  : false,
		minimizer : [new TerserPlugin()],

		// production: stops the build emit when an error occurs during compilation.
		noEmitOnErrors : true,

		// ✓ Does not add empty chunks to the assembly - this reduces the load on the system, which speeds up the rebuild.
		removeEmptyChunks      : true,
		// ✓ Combines equivalent chunks.
		mergeDuplicateChunks   : true,
		// ✓ Removes a module from the chunk if this module is present in the parent chunk (that is, it is already available).
		removeAvailableModules : true,

		// production: finds the most commonly used modules, and gives them the smallest identifiers.
		// This way the most commonly used modules can be loaded into the assembly faster.
		// This setting also helps the webpack more efficiently compress the final build.
		occurrenceOrder    : true,
		// production: analyzes the module graph and tries to find modules that can be contained in one single module.
		// ? this setting is dependent on providedExports and usedExports.
		concatenateModules : true, // module concatenation, scope hoisting

		// ✓ defines the exported entities for each module.
		// This information helps other advanced webpack optimizations.
		providedExports : true,
		// production: defines the used exported entities for each module.
		// This information helps other advanced webpack optimizations.
		// Example: minifiers and DCE (dead code elimination) can remove unused exports from the final assembly.
		// ? this setting depends on providedExports
		usedExports     : true,
		// production: collects the dependency more efficiently if the flag is in package.json dependency.
		// ? this setting depends on providedExports and usedExports
		sideEffects     : true,

		// development: instead of numeric identifiers, gives the modules more understandable names.

		namedModules : false,

		moduleIds : false,

		// development: instead of numeric identifiers, gives chunks more clear names.

		namedChunks : true,
		// Defines the mechanism for generating the identifier for the chunk.
		// https://webpack.js.org/configuration/optimization/#optimization-chunkids
		chunkIds    : false,

		// This option is always enabled. It is configured in SplitChunksPlugin.
		splitChunks : {
			// Code split mode. The default is async.
			chunks                 : 'all', // initial, all (async + initial)
			// The minimum size of a new chunk to separate.
			minSize                : 30000, // bytes
			// The maximum size of the new chunk for separation.
			maxSize                : 0,
			// The minimum number of chunks that depend on the module
			// before separating this module into a separate chunk.
			minChunks              : 1,
			// The maximum number of simultaneous parallel chunk requests for an asynchronous split point (dynamic import).
			// Larger chunks are always preferred.
			maxAsyncRequests       : 5,
			// Maximum number of simultaneous concurrent chunk requests per entrypoint.
			// Larger chunks are always preferred.
			maxInitialRequests     : 3,
			// Split chunk name separator character (e.g. vendors ~ main.js).
			automaticNameDelimiter : '~',
			// Defines the name of the new chunk
			name                   : true,
			// My default cacheGroups inherits from the rest of the splitChunks ↑ options.
			// Unique to cacheGroups are only test, priority and reuseExistingChunk.
			// The key of each cache group determines its name.
			// By default, the webpack sets two cache groups:
			cacheGroups            : {
				// Default cache group. Takes all dependencies from node_nodules to vendors chunk.
				vendors : {
					// Selects the modules included in this cache group. If not specified, all modules will be selected.
					test     : / [\\ /] node_modules [\\ /] /,
					priority : -10
				},
				default : {
					// Default cache group. Puts any dependency module in a separate default chunk
					// subject to duplication of the dependency module at least in two chunks.
					minChunks          : 2,
					// The priority of the cache group. If the module falls into several cache groups at once, it will be selected
					// cache group with a higher priority, or which makes up a larger chunk.
					// The default cache groups have a negative priority,
					// therefore, custom cache groups are prioritized (their priority is 0 by default).
					priority           : -20,
					// If the chunk contains an already existing separated chunk,
					// then this existing split chunk is used instead of creating a new one
					reuseExistingChunk : true
				}
			}
		},
		runtimeChunk : true
	}
});

export const filterMomentLocales = () => ({
	plugins : [new ContextReplacementPlugin(/moment\/locale$/, /(en)/)]
});
