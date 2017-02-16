import Promise from 'bluebird';
import mongoose from 'mongoose';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  email:  { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  created: { type: Date, default: Date.now }
},
{ toObject: {
    transform: function (doc, ret, game) { delete ret.__v; delete ret.password; }
  }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({ });

/**
 * Statics
 */
UserSchema.statics = { 
  get(params) {
    if(typeof(params) === 'object')
      return this.find(params)
        .exec();
        
    return this.findById(params)
      .exec();
  },

  create(vm) {
    let model = new this(vm);

    return model.save();
  }
  
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
