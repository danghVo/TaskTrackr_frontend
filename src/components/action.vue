<template>
    <div class="background-action scroll">
        <transition-group name="actionList" v-if="this.localActionList != []">
            <template v-for="action in this.localActionList" :key="action.actionId">
                <actionCard :action="action" @updateAction="this.updateAction" @deleteAction="this.deleteAction"/>
            </template>
        </transition-group>
        <emptyActionCard :addMode="this.addMode" @turnOffAddMode="this.$emit('turnOffAddMode')" @createAction="this.createAction"/>
    </div>
</template>

<script>
import actionCard from "@/components/actionCard.vue";
import todoService from "@/services/todo.service.js";
import emptyActionCard from "@/components/emptyActionCard.vue";
export default{
    components: {    
        actionCard,
        emptyActionCard
    },
    props: ["todoList", "userCollection", "dateId", "todoId", "addMode", "checkAll", "filterImportant", "searchText"],
    emits: ["getNewList", "turnOffAddMode", "turnOffCheckAll"],
    data() {
        return {
            localActionList: this.setLocalActionList(),
            localToDoList: this.todoList,
            message: ""
        }
    },
    watch: {
        todoList: {
            handler(newValue, oldValue) {
                if(newValue.length > 0){
                    this.localActionList =  Array.from(newValue[this.todoId].actionList);
                }
                else {
                    this.localActionList = []
                }
            },
        },
        checkAll() {
            if(this.checkAll) {
                this.localActionList.forEach((action, index) => {
                    this.updateAction(action.actionId, {"status": true})
                })
                this.$emit("getNewList")
                this.$emit("turnOffCheckAll")
            }           
        },

        filterImportant() {
            if(this.filterImportant) {
                this.localActionList = this.localActionList.filter((action, index) => {
                    return action.important
                })
            }
            else this.$emit("getNewList")
        },

        searchText() {
            if(this.searchText)
                this.localActionList = this.localActionList.filter((item, index) => {
                    return (new RegExp(this.searchText, "g")).test(item.actionName)
                })
            else this.$emit("getNewList")
        }
    },
    methods: {
        setLocalActionList() {
            if(this.todoList)
                this.localActionList = this.todoList[this.todoId].actionList
            else this.$emit("getNewList")
        },

        async updateAction(actionId, data) {
            try{
                await todoService.updateAction(this.userCollection, this.dateId, this.todoId, actionId, data);
                this.$emit("getNewList")
            }
            catch(ex) {
                console.log(ex);
            }
        },

        async deleteAction(actionId) {
            try{
                await todoService.deleteAction(this.userCollection, this.dateId, this.todoId, actionId);
                this.$emit("getNewList")
            }
            catch(ex) {
                console.log(ex)
            }
        },

        async createAction(todoName) {
            try {
                await todoService.createAction(this.userCollection, this.dateId, this.todoId,todoName)
                this.$emit("turnOffAddMode")
                this.$emit("getNewList")
            }
            catch(ex){
                console.log(ex)
                this.message = ex.response.data.message;
            }
        },  
    },
    mounted() {
        this.setLocalActionList()
    }
}
</script>

<style scoped>
.background-action{
    height: 423px;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 16px;
    background-color: rgba(0, 0, 0, 0.1);
}

.actionList-leave-active,
.actionList-enter-active {
    transition: all 0.2s ease;
}

.actionList-leave-to{
    opacity: 0;
    transform: translateX(50px);
}
.actionList-enter-from {
    opacity: 0;
    transform: translateX(50px);
}
</style>