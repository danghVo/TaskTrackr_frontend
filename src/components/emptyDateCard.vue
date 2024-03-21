<template>
    <div v-if="createMode" ref="dateItem" class=" col-4 showUpForm">
        <div class="date-item">
            <div class="content">
                Ngày:
                <input class="content-input" v-model.lazy="this.date" ref="inputDate" @keypress.enter="this.$refs.inputDate.blur()" @blur="checkValue">
            </div>
            <div ref="errorInput" class="error-message"></div>
            <div class="icon">
                <font-awesome-icon @click="cancleCreate" class="icon-item" :icon="['fas', 'x']" />
            </div>
        </div>
    </div>
    <div v-else @click="onCreate" class=" col-4">
        <div class="date-empty">
            <font-awesome-icon  class="empty-icon" :icon="['fa', 'plus']" />
        </div>
    </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
    data() {
        return {
            createMode: false,
            date: "",
            dateReg: /^\d{2}\/\d{2}\/\d{4}$/,
        }
    },
    emits: ["createDate"],
    methods: {
        createDate() {
            const error = this.$refs.errorInput
            error.innerText = ""
            this.formDate(this.date)
            if (!(new RegExp(this.dateReg, 'g')).test(this.date)) {
                error.innerText = "Bạn nhập sai định dạng ngày"
            }
            else {
                this.createMode = false;
                this.$emit("createDate", this.date)
                this.date = "";
            }
        },

        formDate() {
            let [ day, month, year ] = this.date.split("/")
            if(day.length == 1) day = "0"+day;
            if(month.length == 1) month = "0"+month;
            this.date = day + "/" + month + "/" + year
        },

        checkValue() {
            if (!this.date) {
                this.createMode = false
            }
            else this.createDate()
        },

        async onCreate() {
            this.createMode = true
            await nextTick();
            this.$refs.inputDate.focus();
        },

        cancleCreate() {
            this.createMode = false;
        }
    },
}

</script>

<style scoped>
.date-empty {
    position: relative;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border: 1px solid;
    border-color: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);
    min-height: 100px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.empty-icon {
    font-size: 40px;
    color: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);
    ;
}

.date-item {
    position: relative;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    background-color: white;
    min-height: 100px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
    padding: 1px 16px;
}

.showUpForm {
    animation: showUpForm 0.7s linear;
}

.showOffForm {
    animation: showOffForm 0.4s linear;

}

@keyframes showUpForm {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes showOffForm {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.content {
    margin-top: 8px;
}

.error-message {
    font-size: 14px;
    color: rgb(230, 0, 0);
}

.content {
    display: flex;
    flex-direction: row;
}

.content-input {
    font-size: 16px;
    min-width: 100px;
    width: 100%;
    border: none;
    background-color: transparent;
    margin-left: 8px;
    padding: 2px 8px;
    display: inline-block;
    visibility: visible
}

.content-input:focus {
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    animation: inputEff 0.2s ease;
}
.icon{
    position: absolute;
    bottom: 0;
    right: 4px;
}

.icon-item{
    cursor: pointer;
    margin: 8px;
    font-size: 16px;
}

.icon-item:hover{
    font-size: 24px;
    border-radius: 5px;
}
</style>