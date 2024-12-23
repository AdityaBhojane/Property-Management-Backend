import Property from "../models/protpertiesSchema";
import User from "../models/userSchema";


const chartDataRepository = {
    totalCustomers:async()=> await User.countDocuments(),
    totalProperties:async()=> await Property.countDocuments(),
    totalCities:async()=> await Property.distinct('cityPin'),
    totalAgents:async()=> await Property.distinct('creator'),
};

export default chartDataRepository;   