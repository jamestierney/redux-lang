import { join } from 'path'

const include = join(__dirname, 'src')

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'redux-lang'
  },
  externals: {
    react: 'React',
    redux: 'Redux',
    'react-redux': 'React-Redux'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include},
      {test: /\.json$/, 'loader': 'json', include}
    ],
    noParse: ['react', 'redux', 'react-redux']
  }
}
