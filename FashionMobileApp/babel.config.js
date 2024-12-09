module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@navigators': './src/navigators',
          '@services': './src/services',
          '@screens': './src/screens',
          '@context': './src/context',
          '@routes': './src/routes',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
