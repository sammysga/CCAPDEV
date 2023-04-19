import { Schema, model, SchemaTypes} from "mongoose";

const reviewSchema = new Schema({
  review_id: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    unique: true,
  },
  
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  price: {
    type: Number,
    required: true
  },
  review_date: {
    type: Date,
    required: true,
  },
  content: {
    type: String
  },
});

const commentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  comment_date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
});

const likeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
});


const Review = model('Review', reviewSchema);

export default Review;