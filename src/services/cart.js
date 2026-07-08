import API from '../services/api';

const CART_KEY = 'carseller_cart';

const emitCartUpdate = () => {
  window.dispatchEvent(new Event('cart:updated'));
};

export const syncCartToBackend = async (items) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }

  try {
    await API.post('/cart', { items }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Failed to sync cart', error);
  }
};

export const getCartItems = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to read cart', error);
    return [];
  }
};

export const addToCart = (car) => {
  const items = getCartItems();
  const existingItem = items.find((item) => item._id === car._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ ...car, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartUpdate();
  syncCartToBackend(items);
  return items;
};

export const removeFromCart = (carId) => {
  const items = getCartItems().filter((item) => item._id !== carId);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartUpdate();
  syncCartToBackend(items);
  return items;
};

export const updateQuantity = (carId, quantity) => {
  const items = getCartItems().map((item) =>
    item._id === carId ? { ...item, quantity: Math.max(1, quantity) } : item,
  );

  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartUpdate();
  syncCartToBackend(items);
  return items;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  emitCartUpdate();
  syncCartToBackend([]);
  return [];
};

export const getCartCount = () => getCartItems().reduce((sum, item) => sum + item.quantity, 0);
