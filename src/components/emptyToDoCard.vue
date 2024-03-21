<template>
    <div class="todo-item" ref="todoItem" v-show="this.addMode">
        <div class="todo-content">
            <font-awesome-icon class="todo-item-icon" :icon="['fasl', 'list-check']" />
            <input ref="inputName" @blur="this.checkName" @keypress.enter="this.$refs.inputName.blur()" v-model.lazy="this.todoLocal.todoName">
            <span class="error-message"> {{ this.messageLocal }}</span>
        </div>
    </div>
</template>

<script>
export default{
    props: ["todo", "addMode", "message"],
    emits: ["createToDo", "turnOffAddMode"],
    data() {
        return {
            todoId: -1,
            todoLocal: {todoName: ""},
            messageLocal: "",
        }
    },
    watch: {
        message(newValue) {
            if(newValue != ""){
                this.messageLocal = newValue;
                this.$refs.inputName.focus()
            }
        },
        addMode(){
            if(this.addMode) {
                this.$nextTick(function() {
                    this.$refs.inputName.focus()
                })
            }
        }
    },
    methods: {
        checkName() {
            if(this.todoLocal.todoName == ""){
                this.$emit("turnOffAddMode");
                return;
            } 
            this.$emit("createToDo", this.todoLocal.todoName, this.todoId)
        },
    },
    mounted() {
        this.todoLocal.todoName=""
    },
}
</script>

<style scoped>
.error-message{
    position: absolute;
    font-size: 14px;
    bottom: 0px;
    width: 100%;
    left: 36px;
    color: red;
}
</style>