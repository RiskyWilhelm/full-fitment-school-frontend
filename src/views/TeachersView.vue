<script setup>
import TeacherIndexVue from '@/components/teachers/TeacherIndex.vue';
import TeacherTitleVue from '@/components/teachers/TeacherTitle.vue';
import TeacherTitle from '@/components/teachers/TeacherTitle.vue';
import { ref, defineProps } from 'vue';

const title = ref('This is an teacher list page');

const props = defineProps({
    theme: {
        default: true
    }
});
</script>

<template>
    <div>
        <TeacherTitleVue :theme="theme" :title="title" />
        <TeacherIndexVue :theme="theme" />
    </div>
</template>
