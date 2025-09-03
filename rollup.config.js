import { readFileSync } from 'node:fs'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extract: true,
        minimize: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types',
        outDir: 'dist',
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]
