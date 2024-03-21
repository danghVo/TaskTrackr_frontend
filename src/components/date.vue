<template>
    <div class="date-contain">
        <transition-group name="dateRow">
            <template v-for="(dateRow, indRow) in this.renderList">
                <div class="date-row row g-3">
                    <transition-group name="dateCardList">
                        <template v-for="(date, indCol) in dateRow" :key="date._id">
                            <emptyDateCard v-if="date.date == ''" @createDate="this.createDate" />
                            <dateCard v-else :date="date" @submitDate="editDate" @deleteDate="this.deleteDate" @openDate="openDate"/>
                        </template>
                    </transition-group>
                </div>
            </template>
        </transition-group>
    </div>
</template>

<script>
import dateCard from "@/components/dateCard.vue"
import emptyDateCard from "./emptyDateCard.vue"
import todoService from "@/services/todo.service.js"
export default {
    components: {
        dateCard,
        emptyDateCard
    },
    props: ["username"],
    emits: ["openDate"],
    data() {
        return {
            renderList: [],
        }
    },
    methods: {
        formRenderList(arr) {
            this.renderList = [];
            if(arr.length > 0) {
                Array.from(arr).forEach((date, index) => {
                    if (index % 3 == 0) {
                        this.renderList.push([]);
                    }
                    this.renderList[this.renderList.length - 1].push(date)
                })
                
                if(this.renderList[this.renderList.length - 1].length < 3)
                    this.renderList[this.renderList.length - 1].push({"_id": "", "date": ""})
                else this.renderList.push([{"_id": "", "date": ""}])
            }
            else this.renderList.push([{"_id": "", "date": ""}])
        },

        async getAllDate() {
            try {
                const result = await todoService.getAllDate(this.username);
                this.formRenderList(result)
            }
            catch (ex) {
                console.log(ex)
            }
        },

        async editDate(date) {
            try {
                const result = await todoService.updateDate(this.username, date)
            }
            catch (ex) {
                console.log(ex)
            }
        },

        async createDate(date) {
            try {
                const result = await todoService.createDate(this.username, date)
                if (result)
                    await this.getAllDate();
                return result
            }
            catch (ex) {
                console.log(ex)
            }
        },

        async deleteDate(date) {
            try {
                const result = await todoService.deleteDate(this.username, date._id);
                if (result)
                    await this.getAllDate();
                return result
            }
            catch (ex) {
                console.log(ex)
            }
        },
        openDate(dateId) {
            this.$router.push({name: "ToDoShow", params: {"dateId": dateId}});
        }

    },
    mounted() {
        this.getAllDate()
    }
}
</script>

<style scoped>
.date-contain {
    position: relative;
    height: 480px;
    margin-top: 16px;
    padding: 0 32px;
    overflow-y: auto;
}

.date-row {
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: 16px;
    flex-wrap: nowrap;
    overflow: hidden;
    position: relative;
}

.dateCardList-move,
.dateCardList-enter-active,
.dateCardList-leave-active {
    transition: all 0.3s ease;
}

.dateCardList-enter-from {
    opacity: 0;
}
.dateCardList-leave-to {
    opacity: 0;
}

.dateRow-move,
.dateRow-enter-active,
.dateRow-leave-active{
    transition: all 0.5s ease;
}

.dateRow-enter-from{
    opacity: 0;
    position: absolute;
    left: 0;
}
.dateRow-leave-to {
    opacity: 0;
}
</style>