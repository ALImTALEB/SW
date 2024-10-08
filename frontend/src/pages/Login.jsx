import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api-client.js";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign in successful!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 px-2" onSubmit={onSubmit}>
      <h2 className="text-3xl">Sign In</h2>

      <label className="text-gray-700 font-bold flex-1">
        Email
        <input
          type="email"
          className="
                border rounded w-full py-1 px-2 font-normal
                "
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 font-bold flex-1">
        Password
        <input
          type="password"
          className="
                border rounded w-full py-1 px-2 font-normal
                "
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 py-2 px-4 rounded text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
