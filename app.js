const express = require('express');
const app = express();
const faker = require('faker');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        const lastElement = file.originalname.length;
        const extIndex = file.originalname.indexOf('.', -1);
        const ext = file.originalname.slice(extIndex, lastElement);
        var date = new Date().getTime()/1000;
        date = Math.round(date);
        cb(null, date+file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
    const formats = ['.bmp', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp'];
    const lastElement = file.originalname.length;
    const extIndex = file.originalname.indexOf('.', -1);
    const ext = file.originalname.slice(extIndex, lastElement);
    if (formats.includes(ext)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage,
                       limits: {fileSize: 1024*1024*5},
                       fileFilter: fileFilter 
                      });

mongoose.connect('mongodb://localhost:27017/yard-seller', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//app.use("/images", express.static("images"));

var Post = require('./models/Post.js');
var seedDB = require('./seedDB.js')

seedDB();

app.listen(3000, function() {
   console.log("Server started on 3000"); 
});

// INDEX ROUTE
app.get('/', function(req, res) {
   res.render('home.ejs'); 
});

app.get('/yard-sales', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            console.log(err);
        } else {
            res.render('index.ejs', {yardSales: posts});
        }
    }); 
});

// NEW ROUTE
app.get('/yard-sales/new', function(req, res) {
    res.render("new.ejs");
});

// CREATE ROUTE
app.post('/yard-sales', upload.array('itemImageFile',100), function(req, res) {
    var file = 0;
    var date = new Date().getTime()/1000;
    date = Math.round(date);
    
    var postImage = '';
    if (req.body["ImageUrl"]) {
        postImage = req.body["ImageUrl"];
    } else {
        postImage = '/images/' + date + req.files[file].originalname;
        file++;
    }
    var i = 0;
    var itemList = [];
    while (req.body["itemTitle"+i]) {
        if (req.body["imageUrl"+i]) {
            itemList.push({title: req.body["itemTitle"+i], 
                           image: req.body["imageUrl"+i], 
                           description: req.body["itemDescription"+i],
                           price: req.body["itemPrice"+i]});
        } else {
            itemList.push({title: req.body["itemTitle"+i], 
                           image: '/images/' + date + req.files[file].originalname, 
                           description: req.body["itemDescription"+i],
                           price: req.body["itemPrice"+i]});
            file++;
        }
        i++;
    }
   
    var newPost = new Post({
        title: req.body.title, 
        image: postImage,
        description: req.body.description, 
        poster: {name: faker.name.firstName(), avatar: faker.image.avatar()}, 
        location: req.body.location, 
        items: itemList
    });
    
    newPost.save(function(err, post) {
       if (err) {
           console.log(err);
       } else {
           console.log(post);
           res.redirect('yard-sales');
       }
    });
});


// SHOW ROUTE
app.get('/yard-sales/:id', function(req, res) {
    Post.findOne({_id: req.params.id}, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            res.render("show.ejs", {yardSale: post});
        }
    })
});