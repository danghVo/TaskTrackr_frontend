<template>
    <div class="todo-item" ref="todoItem" @click="openToDo">
        <div class="todo-content">
            <font-awesome-icon class="todo-item-icon" :icon="['fasl', 'list-check']" />
            <input ref="inputName" @blur="this.checkName" @keypress.enter="this.$refs.inputName.blur()" v-model.lazy="this.todoLocal.todoName" disabled>
            <span class="error-message"> {{ this.message }}</span>
        </div>
        <div class="todo-edit">
            <font-awesome-icon ref="editIcon" @click.stop="this.editTodo" class="todo-edit-icon" :icon="['fas', 'pen']" />
            <font-awesome-icon @click.stop="this.deleteToDo" class="todo-edit-icon" :icon="['fas', 'trash']" />
        </div>
    </div>
</template>

<script>
import todoService from "@/services/todo.service";
export default {
    props: ["todo"],
    emits: ["renewList","deleteToDo", "checkToDoName"],
    data() {
        return {
            todoLocal: this.todo,
            message: "",
            tempName: "",
        }
    },
    methods: {
        editTodo() {
            this.$refs.inputName.disabled = false;
            this.$refs.inputName.focus();
            this.message = ""
            this.tempName = this.todoLocal.todoName
        },

        async checkName() {
            this.$refs.inputName.disabled = true;
            if(this.tempName == this.todoLocal.todoName)return;
            
            await this.changeToDoName()
            this.$emit("renewList")
        },
        
        async changeToDoName() {
            try {
                await todoService.changeToDoName(this.$route.params.userCollection, this.$route.params.dateId, this.todoLocal.todoId, this.todoLocal.todoName)
            }
            catch(ex){
                console.log(ex)
                this.message = ex.response.data.message;
                this.todoLocal.todoName = this.tempName
            }
        },
        async deleteToDo() {
            try {
                await todoService.deleteToDo(this.$route.params.userCollection, this.$route.params.dateId, this.todoLocal.todoId);
                this.$emit("renewList")
            }
            catch (ex) {
                console.log(ex)
            }
        },

        openToDo() {
            this.$router.push({name: "ActionShow", params: {"todoId": this.todoLocal.todoId}});
        }
    }
}
</script>

<style>
.todo-item{
    margin-top: 12px;
    position: relative;
    background-color: white;
    min-height: 80px;
    padding: 12px;
    border-radius: 5px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: showUp 0.5s linear;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    cursor: pointer;
}

@keyframes showUp {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

.todo-item-icon {
    margin-right: 6px;
}

.todo-content{
    display: flex;
    justify-content: center;
    align-items: center;
}

.todo-content input{
    border: 0px;
    background-color: white;
    width: 100%;
    padding-left: 6px;
    color: black;
}

.todo-content input:focus{
    border: 1px solid #bcbcbc;
    /* padding-left: 6px; */
    padding: 6px 6px;
    border-radius: 3px;
}

.todo-edit{
    display: flex;
    flex-direction: row;
}

.todo-edit-icon {
    margin: 0 8px;
    cursor: pointer;
}

.todo-edit-icon:hover{
    font-size: 24px;
}

.error-message{
    position: absolute;
    font-size: 14px;
    bottom: 4px;
    width: 100%;
    left: 32px;
    color: red;
}
</style>