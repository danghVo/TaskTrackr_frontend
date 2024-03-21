<template>
    <div class="userToDo">
            <h3 class="header">
                <font-awesome-icon class="header-icon" :icon="['fas', 'circle-arrow-left']" @click="backToDateShow"/>
                {{ this.date.date }}:
            </h3>
            <actionButtons :actionShow="this.actionShow" 
                           @add="turnOnAddMode" 
                           @checkAll="this.checkAll = true"
                           @filterImportant="this.filter = true" 
                           @refresh="this.refresh()"
                           @search="this.search"/>
            <router-view :todoList="this.date.todoList" 
                         @getNewList="this.getDate" 
                         :addMode="this.addMode" 
                         @turnOffAddMode="this.turnOffAddMode" 
                         :checkAll="this.checkAll" 
                         @turnOffCheckAll="this.checkAll = false"
                         :filterImportant="this.filter"
                         @turnOffImportant="this.filter = false"
                         :searchText="this.searchText">
            </router-view>
    </div>
</template>

<script>
import todoService from "@/services/todo.service";
import todo from "@/components/todo.vue";
import actionButtons from "./actionButtons.vue";
import todoCard from "@/components/todoCard.vue";
export default{
    components: {
        todo,
        todoCard,
        actionButtons
    },  
    props: ["userCollection", "dateId", "todoId"],
    data() {
        return{
            actionShow: this.todoId,
            date: {},
            addMode: false,
            checkAll: false,
            filter: false,
            searchText: ""
        }
    },  
    watch: {
        todoId() {
            this.actionShow = this.todoId
        }
    },
    methods: {
        async getDate() {
            try{
                this.date = await todoService.getDate(this.userCollection, this.dateId);
            }
            catch(ex) {
                console.log(ex);
            }
        },

        refresh() {
            this.addMode = false;
            this.checkAll = false;
            this.searchText = "";
            this.filter = false;
            this.getDate()
        },

        backToDateShow() {
            this.$router.push({name: "DateShow"});
        },

        turnOffAddMode() {
            this.addMode = false
        },

        turnOnAddMode() {
            this.addMode = true;
        },

        search(searchText) {
            this.searchText = searchText
        }
    },
    created() {
        this.getDate();
    },
}
</script>

<style scoped>
.userToDo {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 60px;
}

.header {
    font-size: 20px;
    padding: 0 32px;
}

.header-icon{
    margin-right: 5px;
    cursor: pointer;
}
</style>