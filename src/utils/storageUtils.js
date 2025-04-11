export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Ошибка при чтении из localStorage:', error);
    return null;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Ошибка при записи в localStorage:', error);
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Ошибка при удалении из localStorage:', error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Ошибка при очистке localStorage:', error);
  }
}; 