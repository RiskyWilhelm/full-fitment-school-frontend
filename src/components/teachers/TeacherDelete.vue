<script setup>
import { deleteTeacherUrl, getTeacherUrl, pathMain } from '@/config/URIPath';
import ClassTitle from '@/components/teachers/TeacherTitle.vue';
import { onBeforeMount, ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const foundTeacher = ref([]);

const title = ref('This is an post delete page');

const btn = ref('danger');

const props = defineProps({
    theme: {
        default: true
    }
});

const deneme = computed(() => {
    if (parseInt(route.params.id) !== foundTeacher.value.id) {
        return true
    }
})

onBeforeMount(async () => {
    try {
        await fetch(getTeacherUrl + route.params.id)
            .then(response => response.json())
            .then(json => foundTeacher.value = json);
    } catch (error) {
        console.log(error);
    }
});

async function deletePost() {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch(deleteTeacherUrl + route.params.id, requestOptions)
        .then(response => {
            response.json();
            window.location.href = `${pathMain}teachers`;
        })
        .catch(error => console.log(error));
}

</script>
<template>
<div>
    <ClassTitle :title="title" />
        <div class="card mt-3 bg-dark text-white">
            <span class="text-start badge bg-secondary text-wrap text-white extra-small">id: {{ foundTeacher.id }}</span>
            <div class="card-body">
                <span v-if="deneme">
                    <h3>Öğretmen yokolmuş!</h3>
                </span>
                <div v-else>
                    <h5 class="card-title text-warning mb-5"><span class="text-info">{{ foundTeacher.firstName }}  {{ foundTeacher.lastName }}</span></h5>
                    <span class="text-warning">Sorumlu Sınıf:
                        <div v-if="foundTeacher.responsibleClass" class="mb-5">
                            <p class="text-white">ID:<span class="text-info">{{ foundTeacher.responsibleClass.id }}</span></p>
                            <p class="text-white">İsim:<span class="text-info">{{ foundTeacher.responsibleClass.className }}</span></p>
                            <p class="text-white">Soyisim:<span class="text-info">{{ foundTeacher.responsibleClass.studentCount }}</span></p>
                        </div>
                        <div v-else class="text-info mb-5">
                            Hiçbiri
                        </div>
                    </span>
                </div>
                
                <div class="container">
                    <div class="row">
                        <div class="d-grid gap-2 mt-4">
                            {{(deneme) ? "Wanna try deleting nothing?" : null}} 
                            <button @mouseover="btn = 'success'" @mouseleave="btn = 'danger'"
                                :class='"btn btn-block btn-" + btn' @click="!deneme ? deletePost() : null">
                                {{ (btn == 'danger' && !deneme) ? 'Are you sure you want to delete this post?' : 'Yes. I want it deleted.' }}
                            </button>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <router-link :to="{name: 'teachers'}" class="btn btn-warning">Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.extra-small {
    font-size: 0.6rem;
    font-style: italic;
}
</style>
