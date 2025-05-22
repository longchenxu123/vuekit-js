import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'MyUtils', // 全局变量名
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    }
  ],
  plugins: [
    terser(), // 压缩
  ]
};
