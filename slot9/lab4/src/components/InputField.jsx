import Form from 'react-bootstrap/Form';

const InputField = ({
  id,
  label,
  type = 'text',
  placeholder,
  helpText,
  error,
  required,
  ...inputProps
}) => {
  const isInvalid = Boolean(error);

  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && (
        <Form.Label>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={isInvalid}
        required={required}
        {...inputProps}
      />
      {isInvalid ? (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      ) : (
        helpText && <Form.Text className="text-muted">{helpText}</Form.Text>
      )}
    </Form.Group>
  );
};

export default InputField;