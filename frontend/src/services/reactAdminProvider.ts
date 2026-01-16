// React Admin data provider that connects to the VerifDoc backend admin API
import simpleRestProvider from "ra-data-simple-rest";
import { DataProvider } from "react-admin";

const apiUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const adminDataProvider: DataProvider = simpleRestProvider(apiUrl);

// You can extend this provider to add custom headers (e.g., JWT) like:
// const adminDataProvider = simpleRestProvider(apiUrl, {
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });
