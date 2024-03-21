<template>
    <div class="container-form">
        <div class="d-flex flex-row header-contain position-relative">
            <router-link to="/signin" class="text-center header btn choose">
                Đăng ký
            </router-link>
            <router-link to="/login" class="text-center header btn">
                Đăng nhập
            </router-link>
        </div>
        <div class="message-form"> {{ this.message }} </div>
        <div class="show-up">
            <UserForm :signIn="signin" @submitUser="createUser" :userInfor="user" />
        </div>
    </div>
</template>

<script>
import UserForm from "../components/UserForm.vue"
import UserService from "../services/user.service"
export default {
    components: {
        UserForm
    },
    data() {
        return {
            signin: true,
            user: {
                username: "",
                password: "",
            },
            message: ""
        }
    },
    methods: {
        async createUser(data) {
            try {
                this.user.username = data.username;
                this.user.password = data.password;
                await UserService.createUser(this.user);
                this.$router.push("/login")
            }
            catch (ex) {
                console.log(ex) 
                this.message = ex.response.data.message
            }
        }
    }
}
</script>

<style scoped   >
.background {
    background-image: linear-gradient(to bottom right, #a18cd1, #fad0c4, #fbc2eb, #fcb69f);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 100% 100%;
    }

    50% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 100% 100%;
    }
}

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