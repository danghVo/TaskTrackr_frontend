<template>
    <div class="background-main d-flex align-items-center">
        <div class="required-content">
            Không tìm thấy trang bạn truy cập. 
            <router-link :to="{name: 'LogIn'}">Trở về</router-link>
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