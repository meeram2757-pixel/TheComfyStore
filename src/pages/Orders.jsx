import { redirect, useLoaderData, Form } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../api";
import { PaginationContainer, SectionTitle } from "../components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

export const loader = async ({ request }) => {
  const user = getUserFromLocalStorage();

  if (!user) {
    toast.warn("You must be logged in to view orders");
    return redirect("/login");
  }
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await customFetch.get("/orders", {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return { orders: response.data.data, meta: response.data.meta };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      "there was an error accessing your orders";

    toast.error(errorMessage);
    if (error?.response?.status === 401 || error?.response?.status === 403)
      return redirect("/login");

    return null;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const user = getUserFromLocalStorage();

  try {
    if (user.username === "demo user") {
      toast.error("Demo user cannot delete orders");
      return null;
    }
    await customFetch.delete(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    toast.success("Order deleted successfully");
    return null;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error?.response?.status === 403
        ? "The demo API does not allow deleting orders. This is a restriction on the server."
        : error?.response?.data?.error?.message ||
          "there was an error deleting your order";

    toast.error(errorMessage);

    if (error?.response?.status === 401) return redirect("/login");
    return null;
  }
};

const Orders = () => {
  const { orders, meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle title="Please make an order" />;
  }
  return (
    <>
      <SectionTitle title="Your Orders" />
      <div className="mt-8">
        <h4 className="mb-4 capitalize">
          total orders : {meta.pagination.total}
        </h4>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className="hidden lg:block">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const id = order.id;
                const { name, address, numItemsInCart, orderTotal, createdAt } =
                  order.attributes;
                const date = dayjs(createdAt).format("hh:mm a - MMM Do, YYYY ");
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{numItemsInCart}</td>
                    <td>{orderTotal}</td>
                    <td className="hidden lg:block">{date}</td>
                    <td>
                      <Form method="POST">
                        <input type="hidden" name="id" value={id} />
                        <button className="btn btn-error btn-xs">Delete</button>
                      </Form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationContainer />
    </>
  );
};
export default Orders;
