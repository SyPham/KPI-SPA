<template>
    <transition name="fade">
        <router-view></router-view>
    </transition>
</template>

<script>

</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
