<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'This is an post api page',
    },
    theme: {
        default: true
    }
});

</script>
<template>
<div class="mb-2" :class="{'text-white': theme}">
    <!-- <h1 class="text-warning">{{title}}</h1> -->
    <div class="gap-2 mt-4 justify-content-center">
        <router-link :to="{name: 'create-teacher'}" class="btn btn-info text-white">New Teacher
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
        </router-link>
    </div>
</div>
</template>
