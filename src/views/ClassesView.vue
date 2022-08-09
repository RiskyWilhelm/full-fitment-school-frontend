<script setup>
import PostIndexVue from '@/components/posts/ClassIndex.vue';
import ClassTitleVue from '@/components/posts/ClassTitle.vue';
import ClassTitle from '@/components/posts/ClassTitle.vue';
import { ref, defineProps } from 'vue';

const title = ref('This is an post list page');

const props = defineProps({
    theme: {
        default: true
    }
});
</script>

<template>
    <div>
        <ClassTitleVue :theme="theme" :title="title" />
        <PostIndexVue :theme="theme" />
    </div>
</template>
