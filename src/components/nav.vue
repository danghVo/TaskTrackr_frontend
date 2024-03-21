<template>
    <nav class="navbar">
        <div class="container-fluid nav-contain justify-content-space-between">
            <div class="nav-user fs-2">
                <font-awesome-icon class="user-icon" :icon="['fa', 'circle-user']" />

                <ul class="dropdown-menu user-dropdown" aria-labelledby="navbarDropdown">
                    <li>
                        <router-link class="dropdown-item" to="/login" >Log out</router-link>
                    </li>
                </ul>
            </div>
            <div class="navbar-brand text-center fs-4">
                To Do List
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
nav {
    position: absolute;
    top: 0;
    height: 60px;
    width: 100%;
    background-color: white;
}

.nav-contain {
    margin: 0 16px;
}

.nav-option:hover .gear-icon {
    animation: rotate 3s linear infinite;
}

.user-icon {
    outline: 1px solid transparent;
    border-radius: 20px;
}

.nav-user:hover .user-dropdown {
    display: block;
}

.dropdown-menu {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    padding: 0;
    overflow: hidden;
}

.dropdown-item {
    padding: 8px 4px 8px 10px;
}


.nav-user:hover .user-icon {
    animation: growAnimation 0.8s linear infinite;
}

@keyframes growAnimation {
    from {
        outline-offset: 0;
        outline-color: black;
    }

    to {
        outline-offset: 10px;
        outline-color: transparent;
    }
}

@keyframes rotate {
    from {
        rotate: 0;
    }

    to {
        rotate: 360deg;
    }
}

.navbar-brand{
    margin: 0 auto;
}
</style>