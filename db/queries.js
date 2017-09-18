var knex = require('./knex.js');

function Frameworks() {
  return knex('frameworks');
}

// *** queries *** //

function getAllFrameworks() {
  return Frameworks().select();
}

function getSingleFramework(frameworkId) {
    return Frameworks().where('id', parseInt(frameworkId)).first();
}

function postFramework(framework) {
    return Frameworks().insert(framework, 'id');
}

function deleteFramework(frameworkId) {
    return Frameworks().where('id', parseInt(frameworkId)).del();
}


module.exports = {
  getAllFrameworks: getAllFrameworks,
  getSingleFramework: getSingleFramework,
  postFramework: postFramework,
  deleteFramework: deleteFramework
};