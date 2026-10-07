import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import InputField from './InputField';
import { fields, genders, majors, initialValues } from '../data/registerConfig';
import { validateRegister } from '../utils/validateRegister';

const ValidatedRegisterForm = () => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState('');

  // Dữ liệu dẫn xuất: tính toán trực tiếp từ state values
  const errors = validateRegister(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const showError = (name) => (touched[name] ? errors[name] : undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Đánh dấu tất cả các ô đã touched khi bấm submit
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!isValid) return;

    setSuccess(`Đăng ký thành công! Chào mừng ${values.fullName}`);
    setValues(initialValues);
    setTouched({});
  };

  const handleReset = () => {
    setValues(initialValues);
    setTouched({});
    setSuccess('');
  };

  return (
    <div className="max-w-md mx-auto p-3">
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')} dismissible>
          {success}
        </Alert>
      )}

      <Form noValidate onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.id}
            id={field.id}
            name={field.id}
            label={field.label}
            type={field.type}
            required={field.required}
            value={values[field.id]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError(field.id)}
          />
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Giới tính</Form.Label>
          <div>
            {genders.map((gender) => (
              <Form.Check
                inline
                key={gender}
                type="radio"
                id={`gender-${gender}`}
                name="gender"
                label={gender}
                value={gender}
                checked={values.gender === gender}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="major">
          <Form.Label>
            Chuyên ngành <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="major"
            value={values.major}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={Boolean(showError('major'))}
          >
            <option value="">-- Chọn chuyên ngành --</option>
            {majors.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {showError('major')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="agree">
          <Form.Check
            type="checkbox"
            name="agree"
            label="Tôi đồng ý với điều khoản sử dụng"
            checked={values.agree}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={Boolean(showError('agree'))}
            feedback={showError('agree')}
            feedbackType="invalid"
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="mb-3">
          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
          <Button variant="outline-secondary" type="button" onClick={handleReset}>
            Làm lại
          </Button>
        </Stack>

        <div className={`small ${isValid ? 'text-success' : 'text-danger'}`}>
          {isValid
            ? 'Thông tin hợp lệ'
            : `Còn ${Object.keys(errors).length} mục chưa hợp lệ`}
        </div>
      </Form>
    </div>
  );
};

export default ValidatedRegisterForm;