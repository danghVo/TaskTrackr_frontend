import apiService from "./api.service";

class ToDoService {
    constructor(baseUrl = "/api/todolist"){
        this.api = apiService(baseUrl)
    }

    async createDate(userCollection, data) {
        return (await this.api.post(`/${userCollection}/date`, {"date": data})).data
    }

    async getAllDate(userCollection) {
        return (await this.api.get(`/${userCollection}/date`)).data
    }

    async updateDate(userCollection, date) {
        return (await this.api.put(`/${userCollection}/${date._id}`, {"date": date.date})).data
    }

    async deleteDate(userCollection, dateId) {
        return (await this.api.delete(`/${userCollection}/${dateId}`)).data
    }

    async getDate(userCollection, dateId) {
        return (await this.api.get(`/${userCollection}/${dateId}`)).data
    }

    async createAction(userCollection, dateId, todoId, data) {
        return (await this.api.post(`/${userCollection}/${dateId}/${todoId}/action`, {"actionName": data})).data
    }

    async updateAction(userCollection, dateId, todoId,actionId, data) {
        return (await this.api.put(`/${userCollection}/${dateId}/${todoId}/${actionId}`, data)).data
    }

    async deleteAction(userCollection, dateId, todoId,actionId) {
        return (await this.api.delete(`/${userCollection}/${dateId}/${todoId}/${actionId}`)).data
    }

    async createToDo(userCollection, dateId, data) {
        return (await this.api.post(`/${userCollection}/${dateId}/todo`, {"todoName": data})).data 
    }

    async changeToDoName(userCollection, dateId, todoId, data) {
        return (await this.api.put(`/${userCollection}/${dateId}/${todoId}`, {"todoName": data})).data
    }

    async deleteToDo(userCollection, dateId, todoId) {
        return (await this.api.delete(`/${userCollection}/${dateId}/${todoId}`)).data
    }
}

export default new ToDoService();