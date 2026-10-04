import CourseWizard from './usereducer/CourseWizard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <CourseWizard initialCourseId="react" />
    </div>
  );
}

export default App;