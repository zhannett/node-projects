var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    
    Leaders.create(
        {
            "name": "Peter Pank",
            "image": "images/alberto.png",
            "designation": "Chief Epicurious Officer",
            "abbr": "CEO",
            "description": "Our CEO, Peter, . . ."
        },
        function (err, leader) {
            if (err) {
                throw err;
            }
            console.log('Leaders created!');
            console.log(leader);
            
            var id = leader._id;
            
            setTimeout(function () {
                Leaders.findByIdAndUpdate(
                    id,
                    {$set: { description: 'Updated Test for Leaders'}},
                    {new: true }
                )
                    .exec(function (err, leader) {
                        if (err) {
                            throw err;
                        }
                        leader.save(function (err, leader) {
                            console.log('Updated Leader!');
                            console.log(leader);
                            db.collection('leadership').drop(function () {
                                db.close();
                            });
                        });
                    });
            }, 3000);
        }
    );
});