import axios from "axios";
import { SERVER_URL } from "../../../lib/src/persistance/utils.ts";

export default axios.create({ baseURL: SERVER_URL });
