import { StatusCodes } from "http-status-codes"
import chartDataRepository from "../repository/chartsDataRepository"
import ErrorHelper from "../utils/ErrorHelper"
import Property from "../models/protpertiesSchema"


export const chartDataService = async () => {
  try {
    const totalCustomers = await chartDataRepository.totalCustomers()
    const totalProperties = await chartDataRepository.totalProperties()
    const totalAgents = await chartDataRepository.totalAgents()
    const totalCities = await chartDataRepository.totalCities()


    const propertyTypeCounts = await Property.aggregate([
      {
        $group: {
          _id: "$PropertyType",
          count: { $sum: 1 }
        }
      }
    ]);
 
    const priceRanges = await Property.aggregate([
      {
        $group: {
          _id: "$PropertyType", // Group by property type
          rent: {
            $sum: { $cond: [{ $eq: ["$purpose", "rent"] }, 1, 0] } // Count "rent" properties
          },
          sale: {
            $sum: { $cond: [{ $eq: ["$purpose", "sale"] }, 1, 0] } // Count "sale" properties
          },
        },
      },
      {
        $project: {
          type: "$_id", // Rename _id to type
          rent: 1,
          sale: 1,
          _id: 0, // Exclude _id from the final result
        },
      },
      {
        $sort: {
          type: 1, // Optional: sort the results by property type if needed
        },
      },
    ]);


    return {
      totalCustomers,
      totalProperties,
      totalAgents: totalAgents.length,
      totalCities: totalCities.length,
      priceRanges,
      propertyTypeCounts
    }
  } catch (error) {
    console.log("error in chart data service - ", error);
    throw new ErrorHelper('error in chart data service', StatusCodes.BAD_REQUEST, error);
  }
}

