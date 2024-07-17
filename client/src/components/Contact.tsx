import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingInterface } from "../utills/types";
import { BACKEND_URL } from "../config";

interface ContactProps {
  listing: ListingInterface;
}

export default function Contact({ listing }: ContactProps) {
  const [landlord, setLandlord] = useState<landlordInterface | null>(null);
  const [message, setMessage] = useState("");
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  interface landlordInterface {
    username: string;
    email: string;
    password: string;
    avatar: string;
    id: string;
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90 font-medium"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
