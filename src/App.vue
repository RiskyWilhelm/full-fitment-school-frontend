<template>
<div class="container-fluid">
  <div class="sticky-top border-primary">
    <a class="text-white navbar-text navbar-brand align-self-center position-absolute start-0" href="#">
      <div class="flip-text-container">
        <span style="--i:6">G</span>
        <span style="--i:7">i</span>
        <span style="--i:8">t</span>
        <span style="--i:9">h</span>
        <span style="--i:10">u</span>
        <span style="--i:11">b</span>
      </div>
      <div class="flip-text-container">
        <span style="--i:1">Y</span>
        <span style="--i:2">u</span>
        <span style="--i:3">n</span>
        <span style="--i:4">u</span>
        <span style="--i:5">s</span>
        &nbsp;
        <span style="--i:6">Y</span>
        <span style="--i:7">ı</span>
        <span style="--i:8">l</span>
        <span style="--i:9">d</span>
        <span style="--i:10">ı</span>
        <span style="--i:11">z</span>
      </div>
    </a>

    <span class="text-white navbar-text align-self-center position-absolute end-0" href="#">
      server(PostgreSQL):
      http://localhost:8080/#/
    </span>
    
    <nav class="navbar navbar-dark navbar-expand-lg">
    <a class="navbar-brand" href="#">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTexts" aria-controls="navbarTexts" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarTexts">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link h4" :to="{name: 'home'}">Students</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link h4" :to="{name: 'home'}">Lessons</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link h4" :to="{name: 'teachers'}">Teachers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link h4" :to="{name: 'classes'}">Classes</router-link>
        </li>
      </ul>
    </div>
    </nav>
  </div>
  <router-view :theme="isDarkTheme"/>
  </div>
</template>


<script>
export default {
  data(){
    return {
      isDarkTheme: true
    }
  },
  mounted(){
    this.isDarkTheme ? document.body.setAttribute('class', 'bg-dark') : document.body.setAttribute('class', '')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
} */

nav a.router-link-exact-active {
  color: #42b983!important;
}



.flip-text-container {
  color: rgb(33,37,41);
}

.flip-text-container span {
  display: inline-block;
  animation: move calc(10s + (0.5s * var(--i))) ease-in-out infinite;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes move {
  0% {
    transform: translate(-30%, 0);
  }
  50% {
    color: rgb(92, 94, 92);
  }
  75%{
    color: white;
  }
  100% {
    transform: translate(30%, 0);
  }
}

.words span:nth-child(2) {
  animation-delay: 0.5s;
}

.words span:nth-child(3) {
  animation-delay: 1s;
}

.words span:nth-child(4) {
  animation-delay: 1.5s;
}

.words span:nth-child(5) {
  animation-delay: 2s;
}

.words span:nth-child(6) {
  animation-delay: 2.5s;
}

.words span:nth-child(7) {
  animation-delay: 3s;
}
</style>
