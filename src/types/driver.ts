export interface Driver {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  baseCity: string;
  yearsOfExperience: number;
  languages: string[];
  rating: number;
  trips: number;
  licenseNumber: string;
  expiryDate: string;
  isVerified: boolean;
  status:
    | "available"
    | "on-trip"
    | "off-duty"
    | "inactive";
  createdAt: string;
  updatedAt: string;
}