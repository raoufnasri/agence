import Reservation from "../models/Reservation.js";

// Get all reservations
export const getReservations = async (req, res) => {
  const { userId } = req.query; 
  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }
  try {
    const reservations = await Reservation.find({ userId });
    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// get users reservations 
export const getAllReservations = async (req,res)=>{
  try {
    const offers = await Reservation.find();
    res.status(200).json({success: true ,reservations :offers});
  } catch (error) {
    res.status(500).json({success : false,  error: error.message });
  }

};


// Create a new reservation
export const createReservation = async (req, res) => {
    const {userId,offerTitle,offerDescription,offerImage,personsSelected,daysSelected,totalPrice, userName, userEmail}= req.body
  try {
    const reservation = new Reservation({
    userId,
    userName,
    userEmail,
     offerTitle,
     offerDescription,
     offerImage,
     personsSelected,
     daysSelected,
     totalPrice,
    });
    await reservation.save();
    res.status(201).json({success : true ,reservation :reservation});
  } catch (error) {
    res.status(400).json({success : false, error: error.message });
  }
};

// Update a reservation
export const updateReservation = async (req, res) => {
 
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id,req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({success : false, message: "Reservation not found" });
    }
    res.status(200).json({success : true, reservations :updatedReservation});
  } catch (error) {
    res.status(400).json({ success : false, error: error.message });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    
   
    if (!deletedReservation) {
      return res.status(404).json({ 
        success: false,
        message: "Reservation not found" 
      });
    }

 
    res.status(200).json({ 
      success: true, 
      message: "Reservation deleted successfully" 
    });
  } catch (error) {
   
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

export const payment= async (req, res) => {
  try {
    const id = req.params.id;

 
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { payment: true },
      { new: true } 
    );

    if (!updatedReservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
     
    res.status(200).json({ success: true, data: updatedReservation });
  } catch (error) {

    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};