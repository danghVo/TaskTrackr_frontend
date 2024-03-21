<template>
    <div class="todo-contain scroll">
        <template v-for="(row, rowIndex) in this.todoView">
            <div class="row row-item"> 
                <template v-for="(todo, todoIndex) in row" :key="todo.todoId">
                    <div class="col-4">
                        <emptyToDoCard v-if="todo.todoId == -1" :todo="todo" :addMode="this.addMode" @createToDo="this.createToDo" :message="this.message" @turnOffAddMode="this.$emit('turnOffAddMode')"/>
                        <todoCard v-else :todo="todo" @renewList="this.$emit('getNewList')"/>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import todoService from "@/services/todo.service";
import todoCard from "@/components/todoCard.vue"
import emptyToDoCard from "./emptyToDoCard.vue";
export default {
    components:{
        todoCard,
        emptyToDoCard
    },
    emits: ["getNewList", "turnOffAddMode"],
    props: ["todoList", "addMode" , "searchText"],
    data() {
        return {
            todoView: [],
            message: ""
        }
    },
    watch: {
        todoList(newValue, oldValue) {
                this.todoView = this.getToDoView(this.todoList);
        },

        searchText() {
            if(this.searchText){
                const todoLocal = this.todoList.filter((item, index) => {
                    return (new RegExp(this.searchText, "g")).test(item.todoName)
                })
                this.todoView = this.getToDoView(todoLocal)
            }
            else this.$emit("getNewList")
        }
    },
    methods: {
        getToDoView(todoListTemp) {
            var temp = [];
            if(todoListTemp.length > 0) {
                Array.from(todoListTemp).forEach(function(todo, index) {
                    if(index % 3 == 0)
                        temp.push([]);
                    temp[ temp.length - 1 ].push(todo);
                })
                if(temp[temp.length - 1].length < 3)
                        temp[temp.length - 1].push({"todoId": -1 ,"todoName": ""})
                    else temp.push([{"todoId": -1 ,"todoName": ""}])
            }
            else temp.push([{"todoId": -1 ,"todoName": ""}])
            return temp;
        },

        async createToDo(todoName) {
            try {
                await todoService.createToDo(this.$route.params.userCollection, this.$route.params.dateId, todoName)
                this.$emit("turnOffAddMode")
                this.$emit("getNewList")
            }
            catch(ex){
                console.log(ex)
                this.message = ex.response.data.message;
            }
        },  
    },
}
</script>

<style scoped>
.todo-contain{
    overflow-y: auto;
    position: relative;
    margin-top: 12px;
    max-height: 400px;
    overflow-x: hidden;
}

.row-item{
    padding: 0 32px;
}
</style>