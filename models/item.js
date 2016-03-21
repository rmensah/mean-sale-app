var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    _user: {
       type: Schema.Types.ObjectId,
        ref: 'User'
      },

    name: {
      type:String,
      required:true
    },

     price : {
      type:Number,
      required:true
    },
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;