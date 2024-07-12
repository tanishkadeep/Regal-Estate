import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
import { z } from "zod";
import { errorHandler } from "../utils/error";

const listingSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  regularPrice: z.number().min(0, "Regular price must be a positive number"),
  discountPrice: z.number().min(0, "Discount price must be a positive number"),
  bathrooms: z.number().min(0, "Number of bathrooms must be a positive number"),
  bedrooms: z.number().min(0, "Number of bedrooms must be a positive number"),
  furnished: z.boolean(),
  parking: z.boolean(),
  type: z.string(),
  offer: z.boolean(),
  imageUrls: z.array(z.string().url("Each image URL must be a valid URL")),
  userRef: z.string(),
});

const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = listingSchema.safeParse(req.body);

    if (!response.success) {
      const errorMessages = response.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));

      return next(errorHandler(411, errorMessages[0].message));
    }

    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user?.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user?.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export { createListing, deleteListing, updateListing };
