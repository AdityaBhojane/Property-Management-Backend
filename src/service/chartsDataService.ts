import { StatusCodes } from "http-status-codes"
import chartDataRepository from "../repository/chartsDataRepository"
import ErrorHelper from "../utils/ErrorHelper"
import Property from "../models/protpertiesSchema"


export const chartDataService = async ()=>{
   try {
    const totalCustomers = await chartDataRepository.totalCustomers()
    const totalProperties = await chartDataRepository.totalProperties()
    const totalAgents = await chartDataRepository.totalAgents()
    const totalCities = await chartDataRepository.totalCities()
    const totalPropertiesForRent = await chartDataRepository.totalPropertiesForRent()
    const totalPropertiesForSale= await chartDataRepository.totalPropertiesForSale();

    const propertyTypeCounts = await Property.aggregate([
        {$group: {
                _id: "$PropertyType", 
                count: { $sum: 1 } 
            }
        }
    ]);

    return {
        totalCustomers,
        totalProperties,
        totalAgents:totalAgents.length,
        totalCities:totalCities.length,
        totalPropertiesForRent,
        totalPropertiesForSale,
        propertyTypeCounts
    }
   } catch (error) {
        console.log("error in chart data service - ", error);
        throw new ErrorHelper('error in chart data service',StatusCodes.BAD_REQUEST, error);
   }
}

