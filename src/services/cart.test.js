import { addToCart, clearCart, getCartItems, getCartCount } from './cart';

describe('cart helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds items and counts them correctly', () => {
    const car = { _id: '1', name: 'Model S', price: 50000, image: 'img.jpg' };

    addToCart(car);
    addToCart({ ...car, _id: '2' });

    expect(getCartItems()).toHaveLength(2);
    expect(getCartCount()).toBe(2);
  });

  it('clears the cart from localStorage', () => {
    addToCart({ _id: '1', name: 'Model S', price: 50000, image: 'img.jpg' });

    clearCart();

    expect(getCartItems()).toEqual([]);
    expect(getCartCount()).toBe(0);
  });
});
