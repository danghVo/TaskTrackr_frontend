<template>
    <div class="button-list d-flex flex-row mt-4">
        <div class="button-item button-add" @click="this.add">
            <font-awesome-icon class="button-icon" :icon="['fa', 'plus']" />
            Add
        </div>
        <div class="button-item button-add" v-if="actionShow" @click="this.checkAll">
            <font-awesome-icon class="button-icon" :icon="['fa', 'check']" />
            Check all
        </div>
        <div class="button-item button-add" v-if="actionShow" @click="this.filterImportant">
            <font-awesome-icon class="button-icon" :icon="['fas', 'star']" />
            Important
        </div>
        <div class="button-item button-add" @click="this.refresh">
            <font-awesome-icon class="button-icon" :icon="['fas', 'arrows-rotate']" />
            Refresh
        </div>
        <div class="button-item button-search">
            <input type="text" @input="search" v-model = "this.searchText" class="inputSearch">
            <font-awesome-icon class="button-icon" :icon="['fas', 'magnifying-glass']" />
        </div>
    </div>
</template>

<script>
    export default {
        props: ["actionShow"],
        emits: ["add", "checkAll", "filterImportant", "refresh", "search"],
        data() {
            return {
                searchText: ""
            }
        },
        methods: {
           add(){
            this.$emit("add");
           },

           checkAll(){
            this.$emit("checkAll")
           },

           filterImportant(){
            this.$emit("filterImportant")
           },

           refresh() {
               this.searchText = ""
            this.$emit("refresh")
           },

           search() {
            this.$emit("search", this.searchText);
           }
        }
    }
</script>

<style scoped>
.button-list{
    padding: 0 32px;
}
.button-item{
    padding: 4px 8px;
    display: flex;
    /* border: 1px solid black; */
    background-color: white;
    background-clip: border-box;
    border-radius: 3px;
    margin: 0 8px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}

.button-icon{
    margin-right: 8px;
}

.button-search{
    border: 0px;
    padding: 0;
    margin-left: auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.button-search .button-icon {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 10px 10px;
    margin-right: 0;
}

.inputSearch{
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border: 0px;
    border-right: 1px solid black;
    padding: 6px 10px;

}
</style>