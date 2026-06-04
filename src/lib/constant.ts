export type CustomerRecord = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookingsCount: number;
  lifetimeSpend: number;
  lastBookingDate: string | null;
};

export const adminCustomersColumn = [
  { name: "CUSTOMER", uid: "customer" },
  { name: "EMAIL ADDRESS", uid: "email" },
  { name: "PHONE NUMBER", uid: "phone" },
  { name: "BOOKINGS", uid: "bookingsCount" },
  { name: "LIFETIME SPEND", uid: "lifetimeSpend" },
  { name: "LAST BOOKING", uid: "lastBookingDate" },
];

export interface PaginationMeta {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  totalPages: number;
  totalUsers: number;
}

export interface AdminCustomersResponseBody {
  pagination: PaginationMeta;
  users: CustomerRecord[];
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  body: T;
}

export type GetCustomersApiResponse = ApiResponse<AdminCustomersResponseBody>;