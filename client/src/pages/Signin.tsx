import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { RootState } from "../redux/store";
import OAuth from "../components/OAuth";
import { BACKEND_URL } from "../config";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="px-16 max-w-lg mx-auto my-24">
      <h1 className="text-3xl sm:text-4xl text-center font-extrabold my-7">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 font-medium mt-3"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-3 justify-center items-center font-medium">
        <div>Don't have an account?</div>
        <Link to={"/signup"}>
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
      {error && (
        <div className="text-red-500 mt-5 text-center font-semibold">
          {error}
        </div>
      )}
    </div>
  );
}
