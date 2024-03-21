<template>
    <div class="col-4" :date-id="this.dateLocal._id" @click="openDate">
        <div class="date-item" ref="dateItem">
            <div class="content">
                Ngày:
                <input class="content-input" v-model.lazy="this.dateLocal.date" ref="inputDate" @blur="this.admitChange" @keypress.enter="this.$refs.inputDate.blur()" disabled>
            </div>
            <div ref="errorInput" class="error-message-date"></div>
            <div class="icon">
                <font-awesome-icon @click.stop="editDate" class="icon-item" :icon="['fas', 'pen']" />
                <font-awesome-icon @click.stop="deleteDate" class="icon-item" :icon="['fas', 'trash']" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["date"],
    emits: ["submitDate", "deleteDate", "openDate"],
    data() {
        return {
            dateLocal: this.date || {"_id": "", "date": ""},
            dateReg: /^\d{2}\/\d{2}\/\d{4}$/,
            deleteFlag: false
        }
    },
    methods: {
        openDate() {
            this.$emit("openDate", this.dateLocal._id)
        },

        editDate() {
            const inputDate = this.$refs.inputDate
            inputDate.disabled = false
            inputDate.focus()
        },

        deleteDate() {
            this.deleteFlag = true
            this.$emit("deleteDate", this.dateLocal)
        },

        admitChange(e) {
            const inputDate = this.$refs.inputDate
            const error = this.$refs.errorInput
            inputDate.disabled = true
            error.innerText = ""
            this.formDate()
            if(!(new RegExp(this.dateReg, 'g')).test(this.dateLocal.date)) {
                this.editDate()
                error.innerText = "Bạn nhập sai định dạng ngày"
            }
            else this.$emit("submitDate", this.dateLocal)
        },

        
        formDate() {
            let [ day, month, year ] = this.dateLocal.date.split("/")
            if(day.length == 1) day = "0"+day;
            if(month.length == 1) month = "0"+month;
            this.dateLocal.date = day + "/" + month + "/" + year
        },
    },
}
</script>

<style scoped>
.date-item{
    position: relative;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    background-color: white;
    min-height: 100px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
    padding: 1px 16px;
}

.showOffForm {
    animation: showOffForm 0.4s linear;

}

@keyframes showOffForm {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.content{
    margin-top: 8px;
}

.error-message-date{
    font-size: 14px;
    color: rgb(230, 0, 0);
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

.content{
    display: flex;
    flex-direction: row;
}

.content-input{
    font-size: 20px;
    min-width: 100px;
    width: 100%;
    border: none;
    background-color: transparent;
    margin-left: 8px;
    padding: 0 4px;
    display: inline-block;
}

.content-input:disabled {
    color: black;
}

.content-input:focus {
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    animation: inputEff 0.2s ease;
}

@keyframes inputEff {
    from{
        border: 0;
        background-color: transparent;
    }
    to{
        border: 1px;
        background-color: rgba(255, 255, 255, 0.5);
    }
}

.date-empty {
    position: relative;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border: 1px solid;
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
</style>