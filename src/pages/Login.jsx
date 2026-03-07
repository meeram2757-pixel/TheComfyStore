import { FormInput, SubmitButton } from "../components";
import { Form, Link, useNavigate } from "react-router-dom";
import { customFetch } from "../api";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setIsSubmitting(true);
    try {
      const response = await customFetch.post("/auth/local", data);
      loginUser(response.data);
      toast.success("logged in successfully");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please check your credentials";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      loginUser(response.data);
      toast.success("logged in as guest");
      navigate("/");
    } catch (error) {
      toast.error("there was an error logging in as guest");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="james@gmail.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitButton text={isSubmitting ? "logging in..." : "login"} />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
