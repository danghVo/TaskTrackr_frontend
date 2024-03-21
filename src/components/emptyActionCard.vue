<template>
    <div class="flex-row align-items-center card-contain" v-show="this.addMode">
        <div class="d-flex flex-row align-items-center action-card">
            <div class="check" @click="checkDone">
                <font-awesome-icon :icon="['fas', 'circle']" />
            </div>
            <div class="important-star" @click="checkImportant">
                <font-awesome-icon class="star-empty" :icon="['fas', 'star']" />
            </div>
            <input type="text" v-model.lazy="action.actionName" ref="inputAction" @blur="createAction" @keypress.enter="this.$refs.inputAction.blur()">
        </div>
    </div>
</template>

<script>
export default {
    props: ["addMode"],
    emits: ["createAction", "turnOffAddMode"],
    data() {
        return {
            action: {
                actionName: ""
            }
        }
    },
    watch: {
        addMode() {
            if(this.addMode)
                this.$nextTick(function() {
                    this.$refs.inputAction.focus()
                })
        }
    },
    methods: {
        createAction() {
            if(this.action.actionName == ""){
                this.$emit("turnOffAddMode")
                return;
            }
            this.$emit("createAction", this.action.actionName)
            this.action.actionName = ""
        }
    },
    mounted() {
        this.action.actionName = ""
    }
}
</script>

<style>
.card-contain{
    position: relative;
}
.action-card {
    padding: 12px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    background-color: rgb(255, 255, 255);
    position: relative;
    flex: 1;
    display: flex;
    animation: showUp 0.5s linear;
}

@keyframes showUp {
    from{ opacity: 0; }
    to { opacity: 1; }
}

.check {
    cursor: pointer;
    font-size: 20px;
}

.important-star {
    position: absolute;
    left: 45px;
    font-size: 20px;
    cursor: pointer;
}

.action-card input {
    padding: 4px;
    font-size: 20px;
    border: 0px;
    margin-left: 50px;
    background-color: transparent;
}

.star-empty {
    color: black;
    opacity: 0.5;
}

</style>