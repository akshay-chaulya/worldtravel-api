import { Schema, model } from "mongoose";

const citiesSchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 50,
    },
    countryName: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 50,
    },
    positions: [
      {
        lat: { type: String, required: true },
        lng: { type: String, required: true },
      },
    ],
    emoji: { type: String, required: true },
    visitDates: [{ type: String, required: true }],
    descriptions: [String],
    visitCount: { type: Number, default: 1 },

    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Cities = model("Cities", citiesSchema);

export default Cities;
