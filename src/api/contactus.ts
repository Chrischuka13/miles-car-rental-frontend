import axios from "axios";

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const contactUsApi = async (payload: ContactPayload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/contact/contact-us`,
    payload,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};