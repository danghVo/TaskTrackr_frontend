<template>
    <Form class="d-flex flex-column bg-white" @submit="submitUser" :validation-schema="UserSchema">
        <div class="mb-4 form-contain">
            <label class="form-label fs-5" for="username">Tên đăng nhập: </label>
            <Field v-model="user.username" @focus="borderGradient" @blur="removeBorder" type="text" name="username" class="form-control" id="username" autofocus/>
            <div class="input-line"></div>
            <ErrorMessage name="username" class="error-feedback text-center"/>
        </div>
        <div class="mb-4 form-contain">
            <label class="form-label fs-5" for="password">Mật khẩu: </label>
            <Field v-model="user.password" @focus="borderGradient" @blur="removeBorder" type="password" name="password" class="form-control" id="password" />
            <div class="input-line"></div>
            <ErrorMessage name="password" class="error-feedback text-center"/>
        </div>
        <div v-if="signIn" class="mb-4 form-contain">
            <label class="form-label fs-5" for="password-confirm">Nhập lại mật khẩu: </label>
            <Field v-model="user.passwordConfirm" @focus="borderGradient" @blur="removeBorder" type="password" name="passwordConfirm" class="form-control" />
            <div class="input-line"></div>
            <ErrorMessage name="passwordConfirm" class="error-feedback text-center"/>
        </div>
        <div class="align-self-end">
            <button type="submit" class="btn" v-if="signIn">Đăng ký</button>
            <button type="submit" class="btn" v-else>Đăng nhập</button>
            <button type="reset" class="btn ml-16 bg-secondary btn-secondary">Hủy</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: ["signIn", "userInfor"],
    emits: ["submitUser"],
    data() {
        let UserSchema

        if(this.signIn) {
            UserSchema = yup.object().shape({
                username: yup
                        .string()
                        .required("Bạn chưa nhập tên đăng nhập")
                        .min(2, "Tên đăng nhập phải có ít nhất 2 kí tự"),
                password: yup   
                        .string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w]+$/g, "Mật khẩu phải có chữ hoa và số")
                        .required("Bạn chưa nhập mật khẩu")
                        .min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
                passwordConfirm: yup
                        .string()
                        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không đúng")
                        .required("Bạn chưa nhập lại mật khẩu"),    
            })
        }
        else {           
            UserSchema = yup.object().shape({
                username: yup
                        .string()
                        .required("Bạn chưa nhập tên đăng nhập"),
                password: yup   
                        .string()
                        .required("Bạn chưa nhập mật khẩu"),   
            })}
        return {
            user: { "username": "", "password": "", passwordConfirm: "" },
            UserSchema
        }
    },

    methods: {
        borderGradient(e) {
            const formContain = e.target.parentElement;
            const inputLine = formContain.querySelector(".input-line");
            if(!formContain.classList.contains("afterBlock")){
                formContain.classList.add("afterBlock");
                setTimeout(() => { 
                    inputLine.style.top = "69px";
                    inputLine.style.display = "block"; 
                }, 400)
            }
            
        },
        
        removeBorder(e) {
            const Field = e.target;
            if(!Field.value) {
                const formContain = e.target.parentElement;
                formContain.classList.remove("afterBlock");
                const inputLine = formContain.querySelector(".input-line");  
                inputLine.style.display = "none"; 
            }
        },

        submitUser(e) {
            this.$emit("submitUser", this.user)
        }
    }
}
</script>

<style scoped>

form{
    padding: 0 16px 20px;
    padding-top: 32px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.form-control {
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    padding: 4px 4px;
    min-height: 33px;
    position: relative;
}

@keyframes FieldAnimation {
    from{
        margin-top: 0;
    }
    to{
        margin-top: 6px;
    }
}

.form-contain{
    position: relative;
}

.input-line {
    width: 100%;
    top: 69px;
    left: 0;
    right: 0;
    display: none;
    position: absolute;
    height: 0.8px;
    background-image: linear-gradient(to left, #D9AFD9, #97D9E1);
    animation: borderGradient 1s ease;
}

@keyframes borderGradient {
    from {
        display: none;
        width: 0;
        left: 50%;
        right: 50%;
    }
    to {
        display: block;
        width: 100%;
        left: 0;
        right: 0;
    }
}

.form-label{
    margin-bottom: 0;
}
.afterBlock .form-control{
    margin-top: 6px;
    box-shadow: none;
    border-bottom-color: rgb(108, 108, 108);
    animation: FieldAnimation 0.3s ease-in;
}

.btn {
    position: relative;
    background-color: black;
    padding: 8px 12px;
    border-radius: 5px;
    color: white;
    outline: 1px solid;
    outline-offset: 0px;
    outline-color: black;
}

.btn-secondary{
    outline-color: #6c757d;
}

.btn:hover{
    opacity: 1 !important;
    background-color: black;
    color: white;
    outline-offset: 5px;
    outline-color: transparent;
    animation: hoverButton 1350ms cubic-bezier(0.2, 1, 0.22, 1) infinite;
}

.error-feedback{
    margin-top: 8px;
    display: block;
    color: red;
}


</style>