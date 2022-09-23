var router = require("express").Router();
var mongoose = require("mongoose");
var Product = mongoose.model("Product");
var User = mongoose.model("User");

// Preload User objects on routes with ':user'
router.param("product", function (req, res, next, id) {
  Product.findById(id)
    .populate("user")
    .then(function (product) {
      //return 404 not found if there's no user in db
      if (!product) {
        return res.sendStatus(404);
      }

      req.product = product;

      return next();
    })
    .catch(next);
});

/**
 * Get all Users. /api/users
 */
router.get("/", function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset;
  }

  return Promise.all([
    Product.find(query)
    .populate("user")
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({ createdAt: "desc" })
      .exec(),
    Product.count(query).exec(),
  ]).then(function (results) {
    var products = results[0];
    var productsCount = results[1];

    return res.json({
      products: products.map(function (product) {
        return product.toJSON();
      }),
      productsCount: productsCount,
    });
  });
});

/**
 * Get an User by ID. /api/users/:userId
 */
router.get("/:product", function (req, res, next) {
  return res.json({ product: req.product.toJSON() });
});

/**
 * Add a new User.
 */
router.post("/", async function (req, res, next) {
  var product = new Product(req.body);

  if (req.body.userId) {
    let user = await User.findById(req.body.userId);
    product.user = user.id;
  }
  return product.save().then(function () {
    return res.json({ product: product.toJSON() });
  });
});

/**
 * Update an User. /api/users/:userId
 */
router.put("/:product", function (req, res, next) {
  if (typeof req.body.name !== "undefined") {
    req.product.name = req.body.name;
  }

  if (typeof req.body.description !== "undefined") {
    req.product.description = req.body.description;
  }

  if (typeof req.body.price !== "undefined") {
    req.product.price = req.body.price;
  }
  
  if (typeof req.body.imageUrl !== "undefined") {
    req.product.imageUrl = req.body.imageUrl;
  }

  if (typeof req.body.category !== "undefined") {
    req.product.category = req.body.category;
  }

  req.product
    .save()
    .then(function (product) {
      return res.json({ product: product.toJSON() });
    })
    .catch(next);
});

/**
 * Delete an User. /api/users/:userId
 */
router.delete("/:product", function (req, res, next) {
  return req.product.remove().then(function () {
    return res.sendStatus(204);
  });
});

module.exports = router;
