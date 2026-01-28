const path = require('path');
const { withNxMetro } = require('@nx/react-native');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const workspaceRoot = path.resolve(__dirname, '..');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  cacheVersion: 'mobile',

  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },

  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],

    // 🔑 PATH ALIASES (THIS FIXES @core)
    alias: {
      '@core': path.join(workspaceRoot, 'core'),
      '@utils': path.join(workspaceRoot, 'utils'),
      '@types': path.join(workspaceRoot, 'types'),
    },

    // 🔑 NODE RESOLUTION (VERY IMPORTANT IN MONOREPO)
    nodeModulesPaths: [
      path.join(__dirname, 'node_modules'),
      path.join(workspaceRoot, 'node_modules'),
    ],
  },
};

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: false,

  // 🔑 WATCH SHARED FOLDERS
  watchFolders: [
    path.join(workspaceRoot, 'core'),
    path.join(workspaceRoot, 'utils'),
    path.join(workspaceRoot, 'types'),
  ],

  extensions: [],
});
// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();

//   return {
//     transformer: {
//       babelTransformerPath: require.resolve(
//         'react-native-svg-transformer'
//       ),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };
// })();
