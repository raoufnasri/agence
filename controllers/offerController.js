import Offer from "../models/Offer.js";

// Get all offers
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({success: true ,offers :offers});
  } catch (error) {
    res.status(500).json({success : false,  error: error.message });
  }
};

// Create new offer
export const createOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({ success: true, offer: offer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get One Offer 

export const getOneOffer = async (req,res) =>{
  try {
    const offers = await Offer.findById(req.body.id);
    if(!offers){
        return res.status(400).json({
            success : false,
            error : "No Offer Found"
        });
    }
    res.status(200).json({
        success: true,
        offer :offers
    });

  } catch (error) {

    res.status(400).json({
        success : false,
        error : error.message,
    })
  }

}
// Delete Offer 
export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params; 
   
   
    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return res.status(404).json({success : false, message: "Offer not found" });
    }

    res.status(200).json({success : true, message: "Offer deleted successfully", deletedOffer });
  } catch (error) {

    res.status(500).json({ success :false, message: "Something went wrong", error: error.message });
  }
};

// update offer
export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedOffer) {
      return res.status(404).json({
        success: false,
        error: "vide",
      });
    }
    res.status(200).json({
      success: true,
      offer: updatedOffer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const searchOffers = async (req, res) => {
  const { q, place, minPrice, maxPrice, minDuration, maxDuration } = req.query;

  try {
    const query = {};

 
    if (q && typeof q === 'string') {
      query.title = { $regex: q, $options: 'i' }; 
    }

    if (place && typeof place === 'string') {
      query.place = { $regex: place, $options: 'i' }; 
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice && !isNaN(minPrice)) {
        query.price.$gte = parseFloat(minPrice); 
      }
      if (maxPrice && !isNaN(maxPrice)) {
        query.price.$lte = parseFloat(maxPrice); 
      }
    }


    if (minDuration || maxDuration) {
      query.duration = {};
      if (minDuration && !isNaN(minDuration)) {
        query.duration.$gte = parseInt(minDuration); 
      }
      if (maxDuration && !isNaN(maxDuration)) {
        query.duration.$lte = parseInt(maxDuration); 
      }
    }


    const offers = await Offer.find(query);

  
    if (offers.length === 0) {
      return res.status(404).json({ message: 'No offers found matching the criteria.' });
    }

    res.json(offers);
  } catch (error) {
    console.error('Error searching offers:', error);
    res.status(500).json({ message: 'Error searching offers', error: error.message });
  }
};