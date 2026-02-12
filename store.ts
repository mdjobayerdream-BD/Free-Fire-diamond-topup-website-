
import { Package, Order, User, SiteSettings, OrderStatus } from './types';
import { INITIAL_PACKAGES, DEFAULT_SETTINGS } from './constants';

class Store {
  private static instance: Store;
  
  private constructor() {
    this.init();
  }

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  private init() {
    if (!localStorage.getItem('packages')) {
      localStorage.setItem('packages', JSON.stringify(INITIAL_PACKAGES));
    }
    if (!localStorage.getItem('settings')) {
      localStorage.setItem('settings', JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }

  getPackages(): Package[] {
    return JSON.parse(localStorage.getItem('packages') || '[]');
  }

  updatePackages(packages: Package[]) {
    localStorage.setItem('packages', JSON.stringify(packages));
  }

  getSettings(): SiteSettings {
    return JSON.parse(localStorage.getItem('settings') || '{}');
  }

  updateSettings(settings: SiteSettings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }

  addOrder(order: Order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  updateOrderStatus(orderId: string, status: OrderStatus) {
    const orders = this.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem('orders', JSON.stringify(updated));
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      const users = this.getUsers();
      if (!users.find(u => u.id === user.id)) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }
    } else {
      localStorage.removeItem('currentUser');
    }
  }
}

export const store = Store.getInstance();
