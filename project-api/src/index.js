const express = require('express');

const bodyParser = require('body-parser');
const validator = require("validator");
const path = require('path');

const app = express();
app.use(bodyParser.json());

// const { json } = require("express");
require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const Property = require('./models/hotelownerproperties');
const Hotel_owner = require('./models/hotelowner');
const Social = require('./models/hotelsocials');
const Admin = require("./models/adminlogin");
const restro_property = require('./models/restaurantproperties');
const Social_restaurant = require('./models/restrosocials');
const Company = require('./models/company');
const Country = require('./models/country');
const Hotel_Work = require('./models/hotelworks');
const Restroant_Work = require('./models/restroworks');
const All_task = require("./models/tasks");

const template_path = path.join(__dirname, "../templates/views");
app.set("views", template_path);

//admin data apis
app.post('/adminlogin', (req, res) => {
    const al = new Admin(req.body);
    al.save((error) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(al);
        }
    })
});

app.get('/adminlogin', (req, res) => {
    Admin.find({}, (error, al) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(al);
        }
    })
});

//get specific data of admin from userid
app.get('/adminlogin/:User_id', (req, res) => {
    Admin.findOne({ User_id: req.params.User_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

//company data
app.get('/company', (req, res) => {
    Company.find({}, (error, comp) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(comp);
        }
    });
});


app.post('/company', async (req, res) => {
    try {
        const prevDoc = await Company.findOne({}).sort({ _id: -1 });
        
        if (prevDoc.token !== req.body.token) {
            return res.status(400).json({ message: 'invalid data' });            
        }
                const myDoc = new Company({
            token: req.body.token + 1,
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            Phone_no: req.body.Phone_no,
            Profile_photo: req.body.Profile_photo,
            User_id: req.body.User_id
        });
        const newDoc = await myDoc.save();
        res.status(201).json(newDoc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/Country', (req, res) => {
    Country.find({}, (error, blogposts) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(blogposts);
        }
    });
});

//Post country
app.post("/Country", (req, res) => {
    const hm = new Country(req.body);
    hm.save((error) => {
        if (error) {
            res.send(500).send(error)
        }
        else {
            res.send(hm)
        }
    })
});

// get hotel owner's data
app.get('/hotelowner', (req, res) => {
    Hotel_owner.find({}, (error, blogposts) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(blogposts);
        }
    });
});



//post hotel owner data
app.post('/hotelowner', async (req, res) => {
    try {
        const prevDoc = await Hotel_owner.findOne({}).sort({ _id: -1 });

        if (prevDoc.token !== req.body.token) {
            return res.status(400).json({ message: 'invalid data' });
        }
        const myDoc = new Hotel_owner({
            token: req.body.token + 1,
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            Phone: req.body.Phone,
            Profile_photo: req.body.Profile_photo,
            owner_id: req.body.owner_id,
            Country: req.body.Country,
            Service_type: req.body.Service_type
        });
        const newDoc = await myDoc.save();
        res.status(201).json(newDoc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

//get specific data from owner_id of hotel owner
app.get('/hotelowner/:owner_id', (req, res) => {
    Hotel_owner.findOne({ owner_id: req.params.owner_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

//get hotel owner's properties or hotels/restuarants
app.get('/property', (req, res) => {
    Property.find({}, (error, blogposts) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(blogposts);
        }
    });
});

//post hotel owner's properties or hotels/restuarants
app.post('/property', (req, res) => {
    const blogpost = new Property(req.body);
    blogpost.save((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(blogpost);
        }
    });
});

//get specific data from property using owner_id of hotel/restuarant owner
app.get('/property/:owner_id', (req, res) => {
    Property.findOne({ owner_id: req.params.owner_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

app.get('/social', (req, res) => {
    Social.find({}, (error, sm) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(sm);
        }
    });
});

//get specific data from social media using owner_id of hotel/restuarant owner's hotel
app.get('/social/:hotel_id', (req, res) => {
    Social.findOne({ hotel_id: req.params.hotel_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

app.get("/hotelwork", (req, res) => {
    Hotel_Work.find({}, (error, hm) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(hm)
        }

    })

})

app.post("/hotelwork", (req, res) => {
    const hm = new Hotel_Work(req.body);
    hm.save((error) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(hm)
        }
    })
})

app.get('/hotelwork/:hotel_id', (req, res) => {
    Hotel_Work.findOne({ hotel_id: req.params.hotel_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

//Restaurant Post
app.post('/restro_property', (req, res) => {
    const blogpost = new restro_property(req.body);
    blogpost.save((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(blogpost);
        }
    });
});

//Restaurant Get
app.get('/restro_property', (req, res) => {
    restro_property.find({}, (error, blogposts) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(blogposts);
        }
    });
});

//get specific restarant property
app.get('/restro_property/:owner_id', (req, res) => {
    restro_property.findOne({ owner_id: req.params.owner_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

app.get("/restrowork", (req, res) => {
    Restroant_Work.find({}, (error, rw) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(rw)
        }

    })

})

app.post("/restrowork", (req, res) => {
    const rw = new Restroant_Work(req.body);
    rw.save((error) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(rw)
        }
    })
})

app.get('/restrowork/:restro_id', (req, res) => {
    Restroant_Work.findOne({ restro_id: req.params.restro_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});

//Post All_task
app.post('/task',(req,res)=>{
    const comp = new All_task(req.body);
    comp.save((error)=>{
      if (error){
        res.status(500).send(error);
      } else{
        res.send(comp);
      }
    });
  });
  
  //Get All_task
  app.get('/task', (req, res) => {
    All_task.find({}, (error, comp) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(comp);
      }
    });
  });

  // social media api
app.post('/social', (req, res) => {
    const sm = new Social(req.body);
    sm.save((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(sm);
        }
    });
});


app.get('/social', (req, res) => {
    Social.find({}, (error, sm) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(sm);
        }
    });
});

//get specific data from social media using owner_id of hotel/restuarant owner's hotel
app.get('/social/:hotel_id', (req, res) => {
    Social.findOne({ hotel_id: req.params.hotel_id })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
});



















const PORT = 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});