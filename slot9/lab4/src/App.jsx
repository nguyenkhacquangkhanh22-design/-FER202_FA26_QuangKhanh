import ProductFilter from './components/ProductFilter';
import { products } from './data/products';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="container my-4">
    <h5>Bài 3: Tìm kiếm, lọc và sắp xếp sản phẩm</h5>
    <ProductFilter products={products} />
  </div>
);

export default App;