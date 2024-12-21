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


    const propertyTypeCounts = await Property.aggregate([
        {$group: {
                _id: "$PropertyType", 
                count: { $sum: 1 } 
            }
        }
    ]);

    const priceRanges = await Property.aggregate([
        {
          $group: {
            _id: {
              range: {
                $switch: {
                  branches: [
                    { case: { $lte: ["$price", 50000] }, then: "0-50k" },
                    { case: { $and: [{ $gt: ["$price", 50000] }, { $lte: ["$price", 100000] }] }, then: "50k-100k" },
                    { case: { $and: [{ $gt: ["$price", 100000] }, { $lte: ["$price", 250000] }] }, then: "100k-250k" },
                    { case: { $and: [{ $gt: ["$price", 250000] }, { $lte: ["$price", 500000] }] }, then: "250k-500k" },
                  ],
                  default: "500k+",
                },
              },
              purpose: "$purpose", // Rent or Sale
            },
            count: { $sum: 1 }, // Count properties in each group
          },
        },
        {
          $group: {
            _id: "$_id.range", // Group by price range
            rent: {
              $sum: {
                $cond: [{ $eq: ["$_id.purpose", "rent"] }, "$count", 0], // Count rent properties
              },
            },
            sale: {
              $sum: {
                $cond: [{ $eq: ["$_id.purpose", "sale"] }, "$count", 0], // Count sale properties
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            range: "$_id",
            rent: 1,
            sale: 1,
          },
        },
      ]);
      

    return {
        totalCustomers,
        totalProperties,
        totalAgents:totalAgents.length,
        totalCities:totalCities.length,
        priceRanges,
        propertyTypeCounts
    }
   } catch (error) {
        console.log("error in chart data service - ", error);
        throw new ErrorHelper('error in chart data service',StatusCodes.BAD_REQUEST, error);
   }
}

