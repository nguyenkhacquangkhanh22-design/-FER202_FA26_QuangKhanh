export const validateRegister = (values) => {
  const errors = {};

  // 1. Họ và tên
  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ tên';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Họ tên phải có ít nhất 3 ký tự';
  }

  // 2. Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !values.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Email không đúng định dạng';
  }

  // 3. Mật khẩu
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (values.password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  } else if (!/[a-zA-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
    errors.password = 'Mật khẩu phải có cả chữ và số';
  }

  // 4. Nhập lại mật khẩu
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  }

  // 5. Số điện thoại (không bắt buộc)
  if (values.phone && values.phone.trim() !== '') {
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(values.phone.trim())) {
      errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
    }
  }

  // 6. Ngày sinh (không bắt buộc, nếu nhập phải từ 16 tuổi)
  if (values.birthday) {
    const birthDate = new Date(values.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      errors.birthday = 'Bạn phải từ 16 tuổi trở lên';
    }
  }

  // 7. Chuyên ngành
  if (!values.major) {
    errors.major = 'Vui lòng chọn chuyên ngành';
  }

  // 8. Đồng ý điều khoản
  if (!values.agree) {
    errors.agree = 'Bạn cần đồng ý điều khoản';
  }

  return errors;
};