<template>
    <div class="background-main d-flex align-items-center">
        <navbar @logOut="logOut" @changePass="changePass"/>
        <router-view style="background-color: #ececec; padding-top: 16px;"></router-view>
    </div>
</template>

<script>
import navbar from "@/components/nav.vue";
export default {
    components: {
        navbar
    },
    methods: {
        logOut() {
            this.$router.push({name: 'LogIn'})
        },
    }
}
</script>

<style>

</style>