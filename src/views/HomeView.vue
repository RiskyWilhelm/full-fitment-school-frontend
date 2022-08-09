<template>
  <div class="home" :class="{'text-white': theme}">
    <h1>This is an home page</h1>
  </div>
</template>

<script>
export default {
  props:{
    theme: {
      default: true
    }
  }
}
</script>
