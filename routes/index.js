var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

// get all frameworks
router.get('/frameworks', function(req, res, next) {
  queries.getAllFrameworks()
  .then(function(frameworks) {
    res.status(200).json(frameworks);
  })
  .catch(function(error) {
    next(error);
  });
});

//get single framwork
router.get('/frameworks/:id', function(req, res, next) {
  queries.getSingleFramework(req.params.id)
  .then(function(framework) {
    res.status(200).json(framework);
  })
  .catch(function(error) {
    next(error);
  });
});

//create single framework entry
router.post('/frameworks', function(req, res, next) {
  queries.postFramework(req.body)
  .then(function(frameworkId) {
    return queries.getSingleFramework(frameworkId);
  })
  .then(function(framework) {
    res.status(200).json(framework);
  })
  .catch(function(error) {
    next(error);
  })
})

//delete framework 
router.delete('/frameworks/:id', function(req, res, next) {
  queries.getSingleFramework(req.params.id)
  .then(function(framework) {
    queries.deleteFramework(req.params.id)
    .then(function() {
      res.status(200).json(framework);
    })
    .catch(function(error) {
      next(error);
    });
  }).catch(function(error) {
    next(error);
  });
});


module.exports = router;
