import Promise from 'bluebird';
import mongoose from 'mongoose';

/**
 * Token Schema
 */
const TokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expire: { type: Date, required: true },
  date: { type: Date, default: Date.now }
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
TokenSchema.method({ });

/**
 * Statics
 */
TokenSchema.statics = { 
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
 * @typedef Token
 */
export default mongoose.model('Token', TokenSchema);
