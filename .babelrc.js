module.exports = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-pipeline-operator',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        shippedProposals: true,
        targets: {node: 'current'},
      },
    ],
    '@babel/preset-flow',
  ],
}
