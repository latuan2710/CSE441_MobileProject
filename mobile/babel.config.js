module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@services': './src/services',
          '@screens': './src/screens',
          '@context': './src/context',
          '@assets': './src/assets',
          '@redux': './src/redux',
        },
      },
    ],
  ],
};
