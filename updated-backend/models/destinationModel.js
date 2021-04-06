const mongoose = require('mongoose');

const Destination = mongoose.model("Destination",{

    dtitle:{

        type :String
    },
    dimage : {
        type : String,
        default:'noimage.jpg'
    },

    ddescription :{

        type: String
    },

    dcost : {
        type:String
    }

}) 

module.exports = Destination