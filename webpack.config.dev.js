
//Importando 'path' para un proyecto type: "module"
import path from 'path';
import { fileURLToPath } from 'url';

//Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import { BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//--------------------------------------------------

export default { //En clase, esta linea es 'module.export =', pero como estoy trabajando con modulos, es necesario cambiarla.
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: ['.js'],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    } 
  },
  module: {
    rules: [
        {//Manejador de lógica .js
          test: /\.m?js$/, //Tipo de extensiones con el que se trabajará para importar javascript. 
          exclude: /node_modules/, //Esto evita que se utilicen los archivos que estén dentro de la carpeta node_modules, como los .js, que podrían romper la lógica de la aplicación.
          use: "babel-loader"
        },
        {//Manejador de estilos
          test: /\.css|styl$/i,//Expresión regular que indica la extensión de los archivos con los que se trabajarán los estilos.
          use: [MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
          ]
        }, 
        {// Manejador de imágenes
          test: /\.png/,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[hash][ext][query]"
          }
        },
        {//Manejador de fuentes
          test: /\.(woff|woff2)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[hash][ext][query]"
          }
        }
      ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html', //Buscael html principal del proyecto.
      filename: './index.html' //Este es el nombre y la ubicación del html optimizado por webpack.
      }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin()
    ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
      },
    compress: true,
    historyApiFallback: true,
    port: 3006
}
}