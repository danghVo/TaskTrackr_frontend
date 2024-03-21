<template>
    <div class="background-main d-flex align-items-center">
        <div class="required-content">
            Để tạo todolist của riêng bạn. Hãy
            <router-link :to="{name: 'LogIn'}">Đăng nhập</router-link>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>

.required-content{
    position: relative;
    margin: auto;
    text-align: center;
    font-size: 20px;
}
</style>