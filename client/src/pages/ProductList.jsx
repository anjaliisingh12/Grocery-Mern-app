import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { AppContext } from "../context/AppContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // ✅ GET AXIOS INSTANCE + CURRENCY FROM CONTEXT
  const { currency, axios } = useContext(AppContext);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("FETCH PRODUCT ERROR:", error);
    }
  }, [axios]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ================= CHANGE STOCK =================
  const toggleStock = async (id, currentStatus) => {
    try {
      await axios.post("/api/product/stock", {
        id,
        inStock: !currentStatus,
      });

      fetchProducts();
    } catch (error) {
      console.error("STOCK UPDATE ERROR:", error);
    }
  };

  return (
    <div className="w-full px-6 py-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border w-[300px]">Name</th>
              <th className="p-3 border w-[120px]">Price</th>
              <th className="p-3 border w-[160px] text-center">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="p-2 border text-gray-700">
                    {item.name}
                  </td>

                  <td className="p-2 border">
                    {currency}{item.offerPrice}
                  </td>

                  <td className="p-2 border text-center">
                    <button
                      onClick={() => toggleStock(item._id, item.inStock)}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition
                        ${
                          item.inStock
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  Product not found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;