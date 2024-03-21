import apiService from "./api.service";

class UserSevice {
    constructor(baseUrl = "/api/user") {
        this.api = apiService(baseUrl)
    }

    async createUser(data) {
        return (await this.api.post("/signin", data)).data
    }

    async checkUser(data) {
        return (await this.api.get(`/login/${data.username}/${data.password}`)).data
    }
}

export default new UserSevice();