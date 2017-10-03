var SERVER_NAME = 'productsapi'
var PORT = 8000;
var HOST = '127.0.0.1';


var restify = require('restify')

  // Get a persistence engine for the products
  , productSave = require('save') ('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /getAllProduct')
  console.log(' /getProduct/:id')
  console.log(' /createProduct')
  console.log(' /updateProduct/:id')
  console.log(' /delete/:id')

})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

  // Get all products in the system
server.get('/getAllProduct', function (req, res, next) {
    
      // Find every entity within the given collection
      productSave.find({}, function (error, product) {
    
        // Return all of the products in the system
        res.send(product)
      })
    })

// Get a single product by their product id
server.get('/getProduct/:id', function (req, res, next) {
    
      // Find a single product by their id within save
      productSave.findOne({ _id: req.params.id }, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if (product) {
          // Send the product if no issues
          res.send(product)
        } else {
          // Send 404 header if the product doesn't exist
          res.send(404)
        }
      })
    })

    // Create a new product
    server.post('/createProduct', function (req, res, next) {
    
      // Make sure name is defined
      if (req.params.name === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('name must be supplied'))
      }
      if (req.params.price === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('price must be supplied'))
      }
      var newProduct = {
            name: req.params.name, 
            price: req.params.price
        }
    
      // Create the product using the persistence engine
      productSave.create(newProduct, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send the product if no issues
        res.send(201, product)
      })
    })

// Update a product by their id
server.put('/updateProduct/:id', function (req, res, next) {
    
      // Make sure name is defined
      if (req.params.name === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('name must be supplied'))
      }
      if (req.params.price === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('price must be supplied'))
      }
      
      var newProduct = {
            _id: req.params.id,
            name: req.params.name, 
            price: req.params.price
        }
      
      // Update the product with the persistence engine
      productsSave.update(newProduct, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send(200)
      })
    })

// Delete product with the given id
server.del('/delete/:id', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productSave.delete(req.params.id, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send()
      })
    })
    