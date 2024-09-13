import { citiesInputsValidate } from "../validation/index.js";
import { Cities } from "../models/index.js";
import { errorHandler, responseHandler } from "../utils/index.js";

export const addCities = async (req, res) => {
  try {
    const { success, error } = citiesInputsValidate.safeParse(req.body);

    if (!success) {
      throw {
        status: 403,
        message: "Invalid credentials",
        error: error.errors,
      };
    }

    const { cityName, countryName, position, emoji, visitDate, description } =
      req.body;

    const existCity = await Cities.findOne({ cityName });

    if (existCity) {
      existCity.descriptions = [...existCity.descriptions, description];
      existCity.positions = [...existCity.positions, position];
      existCity.visitCount += 1;
      existCity.visitDates = [...existCity.visitDates, visitDate];
      await existCity.save();
      return responseHandler(res, {
        message: "You have visited this city in the past. We updated it.",
      });
    }

    const newCity = await Cities.create({
      userId: req.id,
      cityName,
      countryName,
      positions: [position],
      emoji,
      visitDates: [visitDate],
      descriptions: [description],
    });

    responseHandler(res, {
      message: "City added successfully.",
      data: newCity,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getCities = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    const cities = await Cities.find({ userId: req.id })
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalCities = await Cities.countDocuments({ userId: req.id });

    return responseHandler(res, {
      data: {
        cities,
        totalCities,
        totalPages: Math.ceil(totalCities / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getCountries = async (req, res) => {
  try {
    const cities = await Cities.find({ userId: req.id });

    const setCounties = new Set();
    const countries = cities
      .filter((city) => {
        if (!setCounties.has(city.countryName)) {
          setCounties.add(city.countryName);
          return true;
        }
        return false;
      })
      .map((city) => {
        return { countryName: city.countryName, emoji: city.emoji };
      });

    return responseHandler(res, {
      message: "Countries retrieved successfully.",
      data: {
        countries,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await Cities.findByIdAndDelete(id);

    if (!city) throw { message: "Invalid id or no city found", status: 403 };

    return responseHandler(res, {
      message: "successfully deleted city",
      data: city,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getCity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw { message: "Empty id", status: 403 };

    const city = await Cities.findById(id);

    if (!city) throw { message: "Invalid id or city not found", status: 403 };

    return responseHandler(res, {
      data: {
        city,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
