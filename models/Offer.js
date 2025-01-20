import mongoose from "mongoose";
const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default:
        "https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png",
    },
    imageOne: {
      type: String,
      required: true,
      default:
        "https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png",
    },
    imageTwo: {
      type: String,
      required: true,
      default:
        "https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png",
    },
    imageThree: {
      type: String,
      required: true,
      default:
        "https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png",
    },
    imageFour: {
      type: String,
      required: true,
      default:
        "https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png",
    },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    maxPersons: { type: Number },
    place : {type : String },
    rating : {type : String , default : "8.5"},
    category : {type : String , }
  },

);
const Offer = mongoose.model("Offer", offerSchema);
export default Offer;

