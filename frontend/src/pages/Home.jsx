import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { deleteInvoice, fetchInvoices } from "../api-client";

const Home = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { data } = useQuery("fetchQuery", () => fetchInvoices());

  const { mutate } = useMutation(deleteInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchQuery");
      showToast({ message: "Invoice Deleted!", type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      mutate(id);
    }
  };

  return (
    <div className="space-y-3 px-2">
      <h2 className="text-3xl">Invoices:</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Invoice ID</th>
              <th className="py-3 px-6 text-left">Client Name</th>
              <th className="py-3 px-6 text-left">Enterprise Name</th>
              <th className="py-3 px-6 text-left">Product Title</th>
              <th className="py-3 px-6 text-left">Product Price</th>
              <th className="py-3 px-6 text-left">Date of Creation</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data?.invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{invoice._id}</td>
                <td className="py-3 px-6">{invoice.client.name}</td>
                <td className="py-3 px-6">{invoice.entreprise.name}</td>
                <td className="py-3 px-6">{invoice.product.title}</td>
                <td className="py-3 px-6">
                  ${invoice.product.price.toFixed(2)}
                </td>
                <td className="py-3 px-6">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  <button onClick={() => handleDelete(invoice._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
