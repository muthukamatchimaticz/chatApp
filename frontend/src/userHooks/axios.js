import axios from "axios";
import { ReportChat } from "../userRoutes/userRoutes";

const API_URL = process.env.REACT_APP_URL;

export const ReportOffensive = async (payload) => {

    console.log("payload", payload);

    const report = await axios.post(`${API_URL}${ReportChat}`, payload);

    return report;

}
