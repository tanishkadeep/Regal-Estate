import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="px-16 max-w-lg mx-auto my-24">
      <h1 className="text-3xl sm:text-4xl text-center font-extrabold my-7">
        Sign Up
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
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
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
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 font-semibold"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-3 justify-center items-center font-medium">
        <div>Have an account?</div>
        <Link to={"/signin"}>
          <span className="text-blue-700 hover:underline">Sign in</span>
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
