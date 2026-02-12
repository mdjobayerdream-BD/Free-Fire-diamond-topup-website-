
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PackageType {
  DIAMOND = 'DIAMOND',
  MEMBERSHIP = 'MEMBERSHIP'
}

export interface Package {
  id: string;
  name: string;
  amount: number;
  price: number;
  type: PackageType;
  deliveryTime: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  playerUid: string;
  playerName: string;
  packageId: string;
  packageName: string;
  amount: number;
  price: number;
  serviceCharge: number;
  totalPayable: number;
  paymentMethod: string;
  senderNumber: string;
  transactionId: string;
  status: OrderStatus;
  createdAt: string;
}

export interface User {
  id: string;
  uid: string; // Used for Admin check: 7382970242
  name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
}

export interface SiteSettings {
  bkashNumber: string;
  nagadNumber: string;
  binanceId: string;
  noticeText: string;
  serviceChargePercent: number;
  whatsapp: string;
  telegram: string;
}
