function buildConfig(env) {
  const ENV = typeof env === 'undefined' ? 'development' : env;
  return require('./webpack.' + ENV + '.js')(ENV);
}

module.exports = buildConfig;
