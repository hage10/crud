import BaseApiConfig from "./BaseApiConfig.js"

export default class BaseApi {
    constructor() {
        this.apiController = null;
    }

    /**
     * post bản ghi
     * @param {*} body 
     * @returns 
     */
    add(body) {
        return BaseApiConfig.post(`${this.apiController}`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }

    /**
     * Lấy bản ghi có id
     * @param {*} id 
     * @returns 
     */
    getById(id) {
        return BaseApiConfig.get(`${this.apiController}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }


    /**
     * Sử bản ghi có id
     * @param {*} id 
     * @param {*} body 
     * @returns 
     */
    update(id, body) {
        return BaseApiConfig.put(`${this.apiController}/${id}`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }

    /**
     * Xóa bản ghi có id
     * @param {*} id 
     * @returns 
     */
    delete(id) {
        return BaseApiConfig.delete(`${this.apiController}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }
    getAll() {
        return BaseApiConfig.get(`${this.apiController}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }

}