import AddProd from "../components/ui/AddProd";
import ProductTable from "../components/ui/ProductTable";
import UpdateProd from "../components/ui/UpdateProd";

export default function Home() {
  return (
    <div>
      <nav className="relative top-5 left-3 mb-6 bg-white w-[97%]  dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center scrollbar-hide">
          <ul className="flex space-x-5 justify-end">
            <li className="absolute left-3 text-xl font-bold text-gray-800 dark:text-gray-200">
              PC Store Inventory Management
            </li>
            <li><a href="#" className="text-gray-800 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-700">Home</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-700">Add Product</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-700">Update Product</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-700">Sell</a></li>
          </ul>
        </nav>
      <div className="bg-white dark:bg-gray-900 min-h-[90vh] flex items-center justify-center w-full">  
        <main className="w-full max-w-4xl p-4">
          <AddProd/>
          <ProductTable/>
        </main>
      </div>
    </div>
  );
}
