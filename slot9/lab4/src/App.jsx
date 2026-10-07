import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="container my-4">
    <h5 className="mb-3 text-center">
      Bài 5: Form đăng ký có validation (errors, touched, onBlur, Regex)
    </h5>
    <ValidatedRegisterForm />
  </div>
);

export default App;