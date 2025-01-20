import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName:{ type: String, required: true },
  userEmail:{ type: String, required: true },
  offerTitle: { type: String, },
  offerDescription: { type: String, }, 
  offerImage: { type: String, },
  personsSelected: { type: Number,  },
  daysSelected: { type: Number,  },
  totalPrice: { type: Number,  },
  payment : {type :Boolean, default: false }
});
const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
