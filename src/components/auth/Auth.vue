<template>
  <div id="auth" class="login-page">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "auth"
};
</script>
<style lang="scss" scoped></style>
