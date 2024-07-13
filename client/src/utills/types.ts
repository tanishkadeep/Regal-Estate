export interface ListingInterface {
  name: String;
  description: String;
  address: String;
  regularPrice: Number;
  discountPrice: Number;
  bathrooms: number;
  bedrooms: number;
  furnished: Boolean;
  parking: Boolean;
  type: String;
  offer: Boolean;
  imageUrls: Array<string>;
  userRef: String;
  _id: String;
}
