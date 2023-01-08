import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class PostApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "posts";
    }

    getList(pageNumber,pageSize){
        return BaseApiConfig.get(`${this.apiController}?_page=${pageNumber}&_limit=${pageSize}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

}

export default new PostApi();