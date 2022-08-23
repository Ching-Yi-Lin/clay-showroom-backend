var router = require('express').Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

// Preload Article objects on routes with ':article'
router.param('article', function (req, res, next, id) {
  Article.findById(id)
    .then(function (article) {
      if (!article) { return res.sendStatus(404); }

      req.article = article;

      return next();
    }).catch(next);
});

/**
* Get all Articles. /api/articles
*/
router.get('/', function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  return Promise.all([
    Article.find(query)
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({ createdAt: 'desc' })
      .exec(),
    Article.count(query).exec()
  ]).then(function (results) {
    var articles = results[0];
    var articlesCount = results[1];

    return res.json({
      articles: articles.map(function (article) {
        return article.toJSON();
      }),
      articlesCount: articlesCount
    });
  });

});

/**
* Get an Article by ID. /api/articles/:articleId
*/
router.get('/:article', function (req, res, next) {
  return res.json({ article: req.article.toJSON() });
});

/**
* Add a new Article. 
*/
router.post('/', function (req, res, next) {
  var article = new Article(req.body);
  return article.save().then(function () {
    return res.json({ article: article.toJSON() });
  });
});

/**
* Update an Article. /api/articles/:articleId
*/
router.put('/:article', function (req, res, next) {
  if (typeof req.body.title !== 'undefined') {
    req.article.title = req.body.title;
  }

  if (typeof req.body.description !== 'undefined') {
    req.article.description = req.body.description;
  }

  if (typeof req.body.body !== 'undefined') {
    req.article.body = req.body.body;
  }

  req.article.save().then(function (article) {
    return res.json({ article: article.toJSON() });
  }).catch(next);
});

/**
* Delete an Article. /api/articles/:articleId
*/
router.delete('/:article', function (req, res, next) {
  return req.article.remove().then(function () {
    return res.sendStatus(204);
  });
});

module.exports = router;
