import { useEffect } from "react";
import { useProductStore } from '@/store';
import ProductCard from "./NewCard";


const NewProducts = () => {
  const { newProduct, loading, fetchNewProduct } = useProductStore();

 
  useEffect(() => {
    fetchNewProduct();
  }, [fetchNewProduct]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Sản Phẩm Mới
          </h2>
          <p className="text-gray-600">Khám phá những sản phẩm vừa cập bến!</p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded"></div>
        </div>

     

        {/* Danh sách sản phẩm */}
        {!loading && newProduct.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newProduct.map((product) => (
              <div key={product.id} className="relative">
                {/* Nhãn "Mới" */}
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  NEW
                </span>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Không có sản phẩm */}
        {!loading && newProduct.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Chưa có sản phẩm mới nào.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewProducts;