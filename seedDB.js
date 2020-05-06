var mongoose = require('mongoose');
var Post = require('./models/Post.js');
var faker = require('faker');

var yardSales = [{title:'Selling used kitchen supplies', 
                  description:"Trying to declutter my kitchen so I'm selling the extra gadgets", 
                  poster:{name: faker.name.firstName(), avatar: faker.image.avatar()}, 
                  location:"Calling Wood", 
                  items: [{title: "Glass", 
                           image: ['/images/kitchen/glass1.jpg'], 
                           description: '6 glasses + pitcher',
                           price: 20},
                         {title: "Kitchenware", 
                           image: ["/images/kitchen/kitchenware1.jpg"], 
                           description: "11 piece large kitchen utensils",
                           price: 25},
                         {title: "Pots and Pans", 
                           image: ["/images/kitchen/pots1.jpg"], 
                           description: "Lightly used 8 piece set: 4 pans, 2 pots, 2 lids.",
                           price: 40},
                         {title: "Milk Frother", 
                           image: ["/images/kitchen/milk-frother1.png", 
                                 "/images/kitchen/milk-frother2.png", 
                                 "/images/kitchen/milk-frother3.png"], 
                           description: "",
                           price: 20},
                         {title: "Pasta Maker", 
                           image: ["/images/kitchen/pasta-maker1.jpg", 
                                 "/images/kitchen/pasta-maker2.jpg"], 
                           description: "",
                           price: 30}],
                  image: ''},
                 
                 {title:'XBox 360 Games', 
                  description:'Selling old PS games and accesories. All fully functional. $20 each.', 
                  poster:{name: faker.name.firstName(), avatar: faker.image.avatar()}, 
                  location:"Kingston", 
                  items:[{title: "Halo", image: [""], description: "", price: 20},
                        {title: "Halo 2", image: [""], description: "", price: 20},
                        {title: "Halo 3", image: [""], description: "", price: 20},
                        {title: "Halo 4", image: [""], description: "", price: 20},
                        {title: "Halo Reach", image: [""], description: "", price: 20}], 
                  image: '/images/video-games/1.jpg'},
                 
                 {title:'Closet Items', 
                  description:'All kinds of clothes and shoes for really cheap. Moving out soon.', 
                  poster:{name: faker.name.firstName(), avatar: faker.image.avatar()}, 
                  location:"Oliver Square", 
                  items:[{title: "", image: ["/images/clothes/1.png"], description: "", price: 3},
                        {title: "", image: ["/images/clothes/2.png"], description: "", price: 2},
                        {title: "", image: ["/images/clothes/3.png"], description: "", price: 2},
                        {title: "", image: ["/images/clothes/4.png"], description: "", price: 5},
                        {title: "", image: ["/images/clothes/5.png"], description: "", price: 5},], 
                  image: ''},
                 
                 {title:'MOVING OUT SALE!', 
                  description:'I need to get rid of my furniture and accesories fast. Everything is for sale and for really cheap or even free!', 
                  poster:{name: faker.name.firstName(), avatar: faker.image.avatar()}, 
                  location:"South Commons", 
                  items: [{title: "Bed Frame", 
                           image: ["/images/furniture/bed1.jpg", 
                                "/images/furniture/bed2.jpg",
                                "/images/furniture/bed3.jpg",
                                "/images/furniture/bed4.jpg"], 
                           description: "", 
                           price: 25},
                         {title: "Dresser", 
                           image: ["/images/furniture/dresser1.jpg", 
                                "/images/furniture/dresser2.jpg",
                                "/images/furniture/dresser3.jpg",
                                "/images/furniture/dresser4.jpg"], 
                           description: "", 
                           price: 30},
                         {title: "Night Stand", 
                           image: ["/images/furniture/night-stand1.jpg", 
                                "/images/furniture/night-stand2.jpg"], 
                           description: "", 
                           price: 20},
                         {title: "Storage Seat", 
                           image: ["/images/furniture/cube1.jpg", 
                                "/images/furniture/cube2.jpg"], 
                           description: "",
                           price: 15}], 
                  image: ''},
                 {title:'Declutter sale', 
                  description:'Mostly garage gizmos', 
                  poster:{name: faker.name.firstName(), avatar: faker.image.avatar()}, 
                  location:"Castle Downs", 
                  items:[{title: "Laminate/ Vinyl Cutter", 
                           image: ["/images/garage/cutter.png"], 
                           description: "",
                           price: 225},
                        {title: "Rigid wet Tile saw 7", 
                           image: ["/images/garage/tile-saw.png"], 
                           description: "in blade cuts up to 24 in tile. Comes with trowels, float, cutting tools and assorted tile spacers.",
                           price: 150},
                        {title: "Titan Paint ControlMax airless, high pressure sprayer", 
                           image: ["/images/garage/sprayer.png"], 
                           description: "",
                           price: 185},
                        {title: "Vacuum", 
                           image: ["/images/garage/vacuum.png"], 
                           description: "",
                           price: 150},
                        {title: "Master Craft Mitre Saw", 
                           image: ["/images/garage/mitre-saw.png"], 
                           description: "",
                           price: 125},
                        {title: "Tool Pail", 
                           image: ["/images/garage/tools.png"], 
                           description: "",
                           price: 100},
                        {title: "Tool Box", 
                           image: ["/images/garage/tools2.png"], 
                           description: "",
                           price: 150}], 
                  image: ''}];

function recursiveCreate(yardSales) {
    if (yardSales.length == 0) {
        return;
    }
    Post.create(yardSales.pop(), function(err, post) {
        if (err) {
            console.log(err);
        } else {
            recursiveCreate(yardSales);
        }
    });
}
function seedDB() {
    Post.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            recursiveCreate(yardSales);
        }
    });
}

module.exports = seedDB;
