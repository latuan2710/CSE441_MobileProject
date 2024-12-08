module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@routes': './src/routes',
        },
      },
    ],
  ],
};
