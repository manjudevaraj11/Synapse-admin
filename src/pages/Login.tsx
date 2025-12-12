import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    const res = await dispatch(login(data));
    console.log("res: ", res, res.meta, res.meta.requestStatus);

    if (res.meta.requestStatus === "fulfilled") {
      console.log("going inside");
      navigate("/"); // go to dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
