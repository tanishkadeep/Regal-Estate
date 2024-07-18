import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ListingInterface } from "../utills/types";
import {
  FaBath,
  FaBed,
  FaChair,
  FaCheck,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Contact from "../components/Contact";
import { BACKEND_URL } from "../config";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState<ListingInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BACKEND_URL}/api/listing/get/${params.listingId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && (
        <p className="text-center my-24 text-3xl font-extrabold">Loading...</p>
      )}
      {error && (
        <p className="text-center my-24 text-3xl font-extrabold">
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 px-12">
            <div className="text-3xl font-bold flex gap-4 items-center">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}{" "}
              <div className=" w-12 h-12 flex justify-center items-center cursor-pointer text-slate-700 hover:text-black">
                <FaShare
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                />
              </div>
            </div>

            {copied && (
              <p className="fixed bottom-[5%] right-[5%] z-10 font-bold rounded-md bg-white px-5 py-3 flex items-center gap-3 shadow-md">
                <FaCheck /> Link copied!
              </p>
            )}

            <p className="flex mt-2 items-center gap-2 text-slate-600  text-md font-medium">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <p className="bg-red-800 w-full max-w-[200px] text-white text-center p-1 rounded-md font-medium">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <>
                  <p className="bg-green-800 w-full max-w-[200px] text-white text-center p-1 rounded-md font-medium">
                    On Offer
                  </p>
                  <div className="flex flex-wrap items-center gap-2 font-semibold">
                    <span className="line-through text-red-700">
                      ${listing.regularPrice.toLocaleString("en-US")}
                    </span>
                    <span className="text-green-700">
                      ${listing.discountPrice.toLocaleString("en-US")}
                    </span>
                    {listing.type === "rent" && <span>/ month</span>}
                  </div>
                </>
              )}
            </div>

            <p className="text-slate-800 my-2 font-medium">
              <span className="font-bold text-black">Description - </span>
              {listing.description}
            </p>

            <ul className="text-green-900 font-bold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mb-4">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser.id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3 font-medium"
              >
                Contact landlord
              </button>
            )}

            {!currentUser && !contact && (
              <Link
                to="/signin"
                className="bg-slate-700 text-white rounded-lg text-center p-3"
              >
                <button className="uppercase hover:opacity-90 font-medium">
                  Sign in to contact landlord
                </button>
              </Link>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
