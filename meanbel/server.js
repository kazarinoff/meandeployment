const express    = require('express'),
      app        = express(),
      path       = require('path'),
      bodyParser = require('body-parser'),
      mongoose   = require('./mongoose'),
      port       = 9700;
      axios      = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static( __dirname + '/public/dist/public' ));

const Product = require('./products');

var routemyapp = function(){
    app.post('/api/products/new',function(req,res){
        Product.create({name:req.body.name,price:req.body.price,specialid:req.body.specialid,quantity:req.body.quantity},function(err,item){
            {res.json({errors:err,output:item})};
        });
    });
    app.get('/api/products/index',function(req,res){
        Product.find({},function(err,items){
            {res.json({errors:err,output:items})};
        });
    });
    app.get('/api/products/last',function(req,res){
        Product.find({}, {}, { sort: { 'created_at' : 1 } }, function(err, item) {
            console.log( item,err,"findlast function" );
            res.json({errors:err,output:item});
          });
    })
    app.get('/api/products/:id',function(req,res){
        Product.findOne({specialid:req.params.id},function(err,item){
            {res.json({errors:err,output:item})};
        });
    });
    app.put('/api/products/:id',function(req,res){
        Product.findOne({specialid:req.params.id},function(err,item){
            if (err){
                console.log("update error");
                res.json({err})}
            else {
                console.log('update starting',req.body);
                item.name=req.body.name;
                item.quantity=req.body.quantity;
                item.price=req.body.price;
                item.save((err)=>{
                    if (err){
                        console.log("item saving issues");
                        res.json({err});
                    }
                    else {
                        console.log("save successful?");
                        res.json({output:item})}
                });
            };
        });
    });
    app.delete('/api/products/:id',function(req,res){
        console.log('delete function starting');
        Product.findOne({specialid:req.params.id},function(err,item){
            if (err){
                console.log("finding delete error");
                res.json({err})}
            else {
                if (item.quantity>0){
                    console.log("HEEEERE");
                    res.json({errors:{message:"Quantity must be 0 to delete this product"}})
                }
                else {
                    item.delete((err)=>{
                        console.log("THEEEERE");
                        if (err){
                            console.log("deleting haveing isues");
                            res.json({err});
                        }
                        else {
                            console.log("delete successful");
                            res.json({output:{}});
                        };
                    });
                };
            };
        });
    });

    app.all("*",function(req,res){
        console.log("initial page load");

        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });


}
routemyapp();
app.listen(port, function() {
    console.log(`this server's rocking on H0T ${port} FM`);
})
