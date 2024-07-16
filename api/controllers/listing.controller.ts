import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
import { string, z } from "zod";
import { errorHandler } from "../utils/error";
import { SortOrder } from "mongoose";

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

const getListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const getListings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 9;
    const startIndex = parseInt(req.query.startIndex as string) || 0;

    const offerParam = req.query.offer as string | undefined;
    const furnishedParam = req.query.furnished as string | undefined;
    const parkingParam = req.query.parking as string | undefined;
    const typeParam = req.query.type as string | undefined;
    const searchTerm = (req.query.searchTerm as string) || "";
    const sort = (req.query.sort as string) || "createdAt";
    const order: SortOrder = (req.query.order as "asc" | "desc") || "desc";

    const offer =
      offerParam === undefined || offerParam === "false"
        ? { $in: [false, true] }
        : offerParam === "true";

    const furnished =
      furnishedParam === undefined || furnishedParam === "false"
        ? { $in: [false, true] }
        : furnishedParam === "true";

    const parking =
      parkingParam === undefined || parkingParam === "false"
        ? { $in: [false, true] }
        : parkingParam === "true";
    const type =
      typeParam === undefined || typeParam === "all"
        ? { $in: ["sale", "rent"] }
        : typeParam;

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export { createListing, deleteListing, updateListing, getListing, getListings };
