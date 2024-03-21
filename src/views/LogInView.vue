<template>
    <div class="container-form">
        <div class="d-flex flex-row header-contain position-relative">
            <router-link to="/signin" class="text-center header btn">
                Đăng ký
            </router-link>
            <router-link to="/login" class="text-center header btn choose">
                Đăng nhập
            </router-link>
        </div>
        <div class="message-form"> {{ this.message }} </div>
        <div class="show-up">
            <UserForm :userInfor="this.user" @submitUser="checkUser" />
        </div>
    </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue"
import userService from "@/services/user.service"
export default {
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
            message: ""
        }
    },
    components: {
        UserForm
    },
    methods: {
        async checkUser(data) {
            try {
                this.user.username = data.username;
                this.user.password = data.password;
                await userService.checkUser(this.user);
                this.message = ""
                this.$router.push({ "name": "DateShow", params: { "userCollection": this.user.username } })
            }
            catch (ex) {
                this.message = ex.response.data.message
            }
        }
    },
    mounted() {
    },
}
</script>

<style scoped>
.header-contain {
    position: relative;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.header-contain::after {
    position: absolute;
    top: 0;
    content: "";
    left: calc(50% - 1px);
    width: 2px;
    background-color: white;
    display: block;
    height: 100%;
}

.header {
    background-color: rgb(215, 215, 215);
    width: 100%;
    font-weight: 500;
    font-size: 24px;
    border-radius: 0;
    padding: 16px 12px;
    border: 0px;
}

.header.choose {
    background-color: white;
}

.header a {
    text-decoration: none;
    color: black;
}

.show-up {
    animation: showUp 2s ease;
}

@keyframes showUp {
    from {
        transform: translateY(-50%);
    }

    to {
        transform: translateY(0);
    }
}

.container-form {
    width: 30%;
    max-width: 350px;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    transform: translateY(-10%);
}

.message-form{
    text-align: center;
    color: red;
    padding-top: 6px;
    margin: 0 auto;
    width: 100%;
    top: 70px;
    position: absolute;
}
</style>