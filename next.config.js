const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: '<dev_mongodb_username>',
        mongodb_password: '<dev_mongodb_password>',
        mongodb_clustername: '<dev_mongodb_cluster>',
        mongodb_database: '<dev_mongodb_database>',
      }
    }
  }

  return {
    env: {
      mongodb_username: '<prod_mongodb_username>',
      mongodb_password: '<prod_mongodb_password>',
      mongodb_clustername: '<prod_mongodb_cluster>',
      mongodb_database: '<prod_mongodb_database>',
    }
  }
}