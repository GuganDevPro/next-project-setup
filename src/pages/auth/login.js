import { emailValidation, numOnly, numAndChar, charOnly } from "@/utils/common";
import React, { useState, useEffect, useContext } from 'react';
import Captcha, { validateCaptcha } from "@/components/captcha/captcha"
// import { loginCall } from "../../utils/axios";
import { useGlobalContext } from "@/utils/GlobalProvider";
import handleError from "@/utils/ErrorHandler"
export default function Login() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: ''
  });

  const { captchaValue } = useGlobalContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Email is required';
    }
    // else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = 'Email is invalid';
    // }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.captcha) {
      newErrors.captcha = 'Captcha is required';
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      if (!validateCaptcha(formData.captcha, captchaValue)) {
        return alert('Captcha validation failed. Please try again.');
      }
      // const response = await loginCall('login', formData);
      console.log('Login Successful:', response.data);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <>
      <div>
        <p>
          hello Buddy
          <Captcha />
        </p>
      </div>
    </>
  );
}
