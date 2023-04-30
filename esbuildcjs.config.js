const esbuildConig = () => require('esbuild').buildSync({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: './dist/index.cjs.js',
  format: 'cjs'
})

esbuildConig();