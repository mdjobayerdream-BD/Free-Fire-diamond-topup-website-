
import { Package, PackageType, SiteSettings } from './types';

export const INITIAL_PACKAGES: Package[] = [
  { id: 'd1', name: '25 Diamonds', amount: 25, price: 25, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd2', name: '50 Diamonds', amount: 50, price: 45, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd3', name: '115 Diamonds', amount: 115, price: 85, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd4', name: '240 Diamonds', amount: 240, price: 175, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd5', name: '355 Diamonds', amount: 355, price: 260, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd6', name: '480 Diamonds', amount: 480, price: 345, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd7', name: '505 Diamonds', amount: 505, price: 370, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd8', name: '610 Diamonds', amount: 610, price: 440, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd9', name: '725 Diamonds', amount: 725, price: 520, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd10', name: '850 Diamonds', amount: 850, price: 610, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd11', name: '965 Diamonds', amount: 965, price: 690, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd12', name: '1090 Diamonds', amount: 1090, price: 780, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd13', name: '1240 Diamonds', amount: 1240, price: 890, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd14', name: '1480 Diamonds', amount: 1480, price: 1060, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd15', name: '1850 Diamonds', amount: 1850, price: 1330, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd16', name: '2015 Diamonds', amount: 2015, price: 1450, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd17', name: '2530 Diamonds', amount: 2530, price: 1810, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd18', name: '3060 Diamonds', amount: 3060, price: 2190, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd19', name: '3770 Diamonds', amount: 3770, price: 2700, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd20', name: '5060 Diamonds', amount: 5060, price: 3600, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd21', name: '7590 Diamonds', amount: 7590, price: 5400, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'd22', name: '10120 Diamonds', amount: 10120, price: 7200, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  
  { id: 'm1', name: 'Weekly Lite Pack', amount: 0, price: 35, type: PackageType.MEMBERSHIP, deliveryTime: '5-20 Min' },
  { id: 'm2', name: 'Weekly Membership', amount: 0, price: 165, type: PackageType.MEMBERSHIP, deliveryTime: '5-20 Min' },
  { id: 'm3', name: 'Monthly Membership', amount: 0, price: 790, type: PackageType.MEMBERSHIP, deliveryTime: '5-20 Min' },
  { id: 'm4', name: 'Weekly + Monthly Combo', amount: 0, price: 940, type: PackageType.MEMBERSHIP, deliveryTime: '5-20 Min' },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  bkashNumber: '01619789895',
  nagadNumber: '01619789895',
  binanceId: '1210169527',
  noticeText: 'Welcome to JioFFTopup! Get your Free Fire diamonds instantly at the best price in Bangladesh. 24/7 service available.',
  serviceChargePercent: 5,
  whatsapp: '+8801619789895',
  telegram: 'jiofftopup_support'
};

export const ADMIN_UID = '7382970242';
