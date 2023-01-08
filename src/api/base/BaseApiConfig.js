import axios from "axios";

var BaseAPIConfig = axios.create({
	baseURL: "http://localhost:3000/"
});

export default BaseAPIConfig;