import React, { useState, useEffect } from 'react';

const generateUniqueId = () => {
  // Получаем текущую дату и время
  const now = new Date();
  const timestamp = now.getTime();
  
  // Получаем информацию о браузере
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  // Получаем размеры экрана
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  
  // Создаем хеш из всех этих данных
  const dataToHash = `${timestamp}${userAgent}${platform}${screenWidth}${screenHeight}`;
  
  // Простая функция для создания хеша
  const hash = dataToHash.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  // Преобразуем хеш в строку из 4 символов
  const uniqueId = Math.abs(hash).toString(36).substring(0, 4).toUpperCase();
  
  return uniqueId;
};

const UniqueCode = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Генерируем уникальный код при монтировании компонента
    const uniqueId = generateUniqueId();
    setCode(uniqueId);
    
    // Сохраняем код в localStorage
    localStorage.setItem('dashboard_unique_id', uniqueId);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
        <span className="text-gray-600">Unique ID:</span>
        <span className="font-mono font-bold text-blue-600 tracking-wider">{code}</span>
      </div>
    </div>
  );
};

export default UniqueCode; 