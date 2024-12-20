const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product', 
    required: true
  }
});
purchaseSchema.index({ userId: 1, productId: 1 }, { unique: true });


module.exports = mongoose.model('purchase', purchaseSchema);
