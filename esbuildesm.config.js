const esbuildConig = () => require('esbuild').buildSync({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: './dist/index.esm.js',
  format: 'esm'
})

esbuildConig();