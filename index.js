var SERVER_NAME = 'productsapi'
var PORT = 8000;
var HOST = '127.0.0.1';

//request counters
var getproductcounter = 0;
var getallproductcounter = 0;
var createproductcounter = 0;
var deleteproductcounter = 0;
var updateproductcounter = 0;

var restify = require('restify')

  // Get a persistence engine for the products
  , productSave = require('save') ('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('below are the services Started:')
  console.log(' /getAllProduct')
  console.log(' /getProduct/:id')
  console.log(' /createProduct')
  console.log(' /updateProduct/:id')
  console.log(' /delete/:id')
  console.log('Processed request count --> Get Product: ' +getproductcounter + ', Get All Product: ' + getallproductcounter + ', Create Product: ' + createproductcounter+ ', Delete Product: ' + deleteproductcounter + ', Update Product: ' + updateproductcounter)
  


})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

  // Get all products in the system
server.get('/getAllProduct', function (req, res, next) {
    console.log('>>>' + server.url + '/getAllProduct: recieved GET request')
      // Find every entity within the given collection
      productSave.find({}, function (error, product) {
    
        // Return all of the products in the system
	console.log('<<<' + server.url + '/getAllProduct: sending response')
        res.send(product)
	getallproductcounter++;
  console.log('Processed request count --> Get Product: ' +getproductcounter + ', Get All Product: ' + getallproductcounter + ', Create Product: ' + createproductcounter+ ', Delete Product: ' + deleteproductcounter + ', Update Product: ' + updateproductcounter)
  
      })
    })

// Get a single product by their product id
server.get('/getProduct/:id', function (req, res, next) {
     console.log('>>>' + server.url + '/getProduct:id: recieved GET request')
      // Find a single product by their id within save
      productSave.findOne({ _id: req.params.id }, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if (product) {
          // Send the product if no issues
 	console.log('<<<' + server.url + '/getProduct:id: sending response')
          res.send(product)
	  getproductcounter++;
    console.log('Processed request count --> Get Product: ' +getproductcounter + ', Get All Product: ' + getallproductcounter + ', Create Product: ' + createproductcounter+ ', Delete Product: ' + deleteproductcounter + ', Update Product: ' + updateproductcounter)
    
        
        } else {
          // Send 404 header if the product doesn't exist
          res.send(404)
        }
      })
    })

    // Create a new product
    server.post('/createProduct', function (req, res, next) {
    console.log('>>>' + server.url + '/createProduct: recieved POST request')
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
	console.log('<<<' + server.url + '/createProduct: sending response')
        res.send(201, product)
        createproductcounter++;
        console.log('Processed request count --> Get Product: ' +getproductcounter + ', Get All Product: ' + getallproductcounter + ', Create Product: ' + createproductcounter+ ', Delete Product: ' + deleteproductcounter + ', Update Product: ' + updateproductcounter)
        
      
      })
    })

// Update a product by their id
server.put('/updateProduct/:id', function (req, res, next) {
  console.log('>>>' + server.url + '/updateProduct: recieved POST request')
    
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
        console.log('<<<' + server.url + '/updateProduct: sending response')
        updateproductcounter++;
        console.log('Processed request count --> Get Product: ' +getproductcounter + ', Get All Product: ' + getallproductcounter + ', Create Product: ' + createproductcounter+ ', Delete Product: ' + deleteproductcounter + ', Update Product: ' + updateproductcounter)
        
      })
    })

// Delete product with the given id
server.del('/delete/:id', function (req, res, next) {
  console.log('>>>' + server.url + '/delete: recieved POST request')
      // Delete the product with the persistence engine
      productSave.delete(req.params.id, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 204 OK response
        res.send(204)
        console.log('<<<' + server.url + '/delete: sending response')
        deleteproductcounter++;
        console.log('Processed request count --> Get Product: ' +getproductcounter + ', Get All Product: ' + getallproductcounter + ', Create Product: ' + createproductcounter+ ', Delete Product: ' + deleteproductcounter + ', Update Product: ' + updateproductcounter)
        
      })
    })
    
