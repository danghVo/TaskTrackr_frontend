<template>
    <div class="d-flex flex-row align-items-center card-contain">
        <div class="d-flex flex-row align-items-center action-card">
            <div class="check" @click="checkDone">
                <Transition name="check">
                    <font-awesome-icon v-if="this.action.status" :icon="['fas', 'circle-check']" style="color: green" />
                    <font-awesome-icon v-else :icon="['fas', 'circle']" />
                </Transition>
            </div>
            <div class="important-star" @click="checkImportant">
                <Transition name="check">
                    <font-awesome-icon class="start-full" v-if="this.action.important" :icon="['fas', 'star']"
                        style="color: #fff82e;" />
                    <font-awesome-icon class="star-empty" v-else :icon="['fas', 'star']" />
                </Transition>
            </div>
            <input type="text" :class="{done: this.isDone}" ref="inputAction" v-model.lazy="action.actionName" @blur="this.reNameAction"
                @keypress.enter="this.$refs.inputAction.blur()" disabled>
            <div class="menu" @click="openOption"><font-awesome-icon :icon="['fasl', 'ellipsis-vertical']" /></div>
        </div>
        <Transition name="optionList">
            <div class="action-option flex-row" ref="actionOption" v-show="this.isOpen">
                <div class="option-item" @click.stop="this.openInputAction">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                </div>
                <div class="option-item" @click.stop="this.deleteAction">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                </div>
                <div class="option-item" @mouseover="() => {this.showInfo = true}" @mouseleave="() => {this.showInfo = false}">
                    <font-awesome-icon :icon="['fas', 'info']" />
                </div>
            </div>
        </Transition>
        <div class="info" v-show="this.showInfo" ref="info">
            <span>Tạo: {{ created }}</span>
            <span>Hoàn thành: {{ done }}</span>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["updateAction", "deleteAction"],
    props: ["action"],
    data() {
        return {
            isOpen: false,
            isDone: this.action.status,
            showInfo: false,
            created: "",
            done: ""
        }
    },
    watch: {
        'action.done_at'() {
            this.setDoneTime()
        },
        "action.status"() {
            this.isDone = this.action.status
        }
    },
    methods: {
        openOption() {
            this.isOpen = !this.isOpen
        },

        async checkDone() {
            this.$emit("updateAction", this.action.actionId, { "status": !this.action.status })
            this.isDone = !this.isDone
        },

        checkImportant() {
            this.$emit("updateAction", this.action.actionId, { "important": !this.action.important })
        },

        openInputAction() {
            this.$refs.inputAction.disabled = false;
            this.$refs.inputAction.focus()
        },

        reNameAction() {
            this.$emit("updateAction", this.action.actionId, { "actionName": this.action.actionName })
            this.$refs.inputAction.disabled = true;
            this.isOpen = false
        },

        deleteAction() {
            this.$emit("deleteAction", this.action.actionId)
        },

        setDoneTime() {
            if(this.action.done_at != "") {
            const doneDate = new Date(this.action.done_at)
            this.done = doneDate.toLocaleDateString("en-GB") + " " + doneDate.toLocaleTimeString()
            }
            else this.done = "Chưa hoàn thành"
        }

        // showInfo() {
        //     this.$refs.info.style.display = "flex"
        // }
    },
    mounted() {
        const createDate = new Date(this.action.created_at)
        this.created = createDate.toLocaleDateString("en-GB") + " " + createDate.toLocaleTimeString()
        this.setDoneTime()
    },
}
</script>

<style scoped>

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

.menu {
    font-size: 20px;
    margin-left: auto;
    margin-right: 8px;
    padding: 0 12px;
    cursor: pointer;
}

.action-option {
    display: flex;
}

.optionList-enter-active {
    animation: slideIn 0.5s ease;

}

.optionList-leave-active {
    animation: slideOut 0.5s ease
}

@keyframes slideIn {
    from {
        width: 0;
    }

    to {
        width: 160px;
    }
}

@keyframes slideOut {
    from {
        width: 160px;
    }

    to {
        width: 0;
    }
}

.optionShow {
    display: flex;
}

.option-item {
    padding: 0 20px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    display: block;
    line-height: 62px;
    cursor: pointer;
}


.check-enter-active {
    transition: all 0.5s linear;
    /* animation: slideIn 0.5s ease; */
}

.check-enter-from {
    opacity: 0;
    position: absolute;
}

.show{
    display: flex;
}

.info{
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 3px;
    right: 5px;
    z-index: 3;
    padding: 12px;
    bottom: -80px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.done{
    text-decoration: line-through;
}
</style>