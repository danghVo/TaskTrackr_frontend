<template>
    <div class="userToDo">
        <h3 class="header">Your To Do List:</h3>
        <date :username="this.userCollection" />
    </div>
</template>
 
<script>
import date from "@/components/date.vue"
export default {
    name: "DateShow",
    emits: ["openDate"],
    props: ['userCollection'],
    components: {
        date,
    },
    methods: {
        openDate(dateId) {
            this.$emit("openDate", dateId);
        }
    },
    mounted() {
    }
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
</style>