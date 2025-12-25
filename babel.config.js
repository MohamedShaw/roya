module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@screens': './src/screens',
          '@typings': './src/types',
          '@utils': './src/utils',
          '@data': './src/data',
          "@hoc":"./src/hoc"
          
        },
      },
    ],
    'react-native-worklets/plugin'
  ],
};
