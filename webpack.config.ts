/* eslint-disable import/order */
import path from 'path';

import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';


// plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';


module.exports = (env: { mode: 'development' | 'production' }) => {
  const developmentMode = env.mode === 'development';

  const config: Configuration = {
    entry: './src/index.ts',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   hmr: developmentMode,
              // },
            },
            'css-loader',
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'assets/**',

            // if there are nested subdirectories , keep the hierarchy
            transformPath (targetPath, absolutePath) {
              const assetsPath = path.resolve(__dirname, 'assets');
              const endpPath = absolutePath.slice(assetsPath.length);

              return Promise.resolve(`assets/${endpPath}`);
            },
          },
        ],
      }),
    ],
  };
  const envConfig = require(path.resolve(
    __dirname,
    `./webpack.${env.mode}.ts`,
  ))(env);

  const mergedConfig = merge(config, envConfig);

  return mergedConfig;
};
