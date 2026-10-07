import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import InputField from './InputField';
import { fields, genders, majors, initialValues } from '../data/registerConfig';

const REQUIRED_MESSAGES = {
  fullName: 'Vui lòng nhập họ và tên',
  email: 'Vui lòng nhập email',
  password: 'Vui lòng nhập mật khẩu',
  major: 'Vui lòng chọn chuyên ngành',
};

const validate = (values) => {
  const errors = {};

  // Kiểm tra các trường bắt buộc thông thường
  Object.entries(REQUIRED_MESSAGES).forEach(([field, message]) => {
    if (!values[field] || !values[field].trim()) {
      errors[field] = message;
    }
  });

  // Kiểm tra nhập lại mật khẩu
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  }

  // Kiểm tra checkbox điều khoản
  if (!values.agree) {
    errors.agree = 'Bạn cần đồng ý điều khoản';
  }

  return errors;
};

const RegisterForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Ẩn lỗi của riêng điều khiển vừa sửa
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitted(null);
      return;
    }

    setSubmitted(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <div className="max-w-md mx-auto p-3">
      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(null)} dismissible>
          <Alert.Heading>Đã nhận đăng ký của {submitted.fullName}!</Alert.Heading>
          <pre className="mb-0 text-start">{JSON.stringify(submitted, null, 2)}</pre>
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
            error={errors[field.id]}
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
            isInvalid={Boolean(errors.major)}
          >
            <option value="">-- Chọn chuyên ngành --</option>
            {majors.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.major}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="agree">
          <Form.Check
            type="checkbox"
            name="agree"
            label="Tôi đồng ý với điều khoản sử dụng"
            checked={values.agree}
            onChange={handleChange}
            isInvalid={Boolean(errors.agree)}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
          <Button variant="outline-secondary" type="button" onClick={handleReset}>
            Làm lại
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default RegisterForm;