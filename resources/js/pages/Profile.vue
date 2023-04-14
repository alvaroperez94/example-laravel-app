<template>
    <div>
        <Menu></Menu>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <img src="../../assets/user.png" alt="User default image">
                </div>
                <div class="col-8">
                    {{ user.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GlobalComponents from '@/globalComponents.js'

export default {
    name: "Home",
    components: {
        ...GlobalComponents
    },
    data() {
        return {
            user: this.$store.state.auth.user
        }
    },
}
</script>

<style>
img {
    max-width: 100%;
}
</style>