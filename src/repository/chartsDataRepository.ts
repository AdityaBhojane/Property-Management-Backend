import Property from "../models/protpertiesSchema";
import User from "../models/userSchema";


const chartDataRepository = {
    totalCustomers:async()=> await User.countDocuments(),
    totalProperties:async()=> await Property.countDocuments(),
    totalCities:async()=> await Property.distinct('location'),
    totalAgents:async()=> await Property.distinct('creator'),
    totalPropertiesForRent:async()=> await Property.countDocuments({ purpose: 'rent' }),
    totalPropertiesForSale:async()=> await Property.countDocuments({ purpose: 'sale' })
};

export default chartDataRepository;