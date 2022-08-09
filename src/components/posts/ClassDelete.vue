<script setup>
import { deleteClassUrl, getClassUrl, pathMain } from '@/config/URIPath';
import ClassTitle from '@/components/posts/ClassTitle.vue';
import { onBeforeMount, ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const foundClass = ref([]);

const title = ref('This is an post delete page');

const btn = ref('danger');

const props = defineProps({
    theme: {
        default: true
    }
});

const deneme = computed(() => {
    if (parseInt(route.params.id) !== foundClass.value.id) {
        return true
    }
})

onBeforeMount(async () => {
    try {
        await fetch(getClassUrl + route.params.id)
            .then(response => response.json())
            .then(json => foundClass.value = json);
    } catch (error) {
        console.log(error);
    }
});

async function deletePost() {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch(deleteClassUrl + route.params.id, requestOptions)
        .then(response => {
            response.json();
            window.location.href = `${pathMain}classes`;
        })
        .catch(error => console.log(error));
}

</script>
<template>
<div>
    <ClassTitle :title="title" />
        <div class="card mt-3 bg-dark text-white">
            <span class="text-start badge bg-secondary text-wrap text-white extra-small">id: {{ foundClass.id }}</span>
            <div class="card-body">
                <span v-if="deneme">
                    <h3>No post found!</h3>
                </span>
                <div v-else>
                    <h5 class="card-title text-warning mb-5">Öğrenci Sayısı: <span class="text-info">{{ foundClass.studentCount }}</span></h5>
                    <span class="text-warning">Sorumlu Öğretmen:
                        <div v-if="foundClass.responsibleTeacher" class="mb-5">
                            <p class="text-white">ID:<span class="text-info">{{ foundClass.responsibleTeacher.id }}</span></p>
                            <p class="text-white">İsim:<span class="text-info">{{ foundClass.responsibleTeacher.firstName }}</span></p>
                            <p class="text-white">Soyisim:<span class="text-info">{{ foundClass.responsibleTeacher.lastName }}</span></p>
                        </div>
                        <div v-else class="text-info mb-5">
                            Hiçbiri
                        </div>
                    </span>
                    <h5 class="card-title text-warning">Öğrenci Tablosu</h5>
                    <table class="table table-dark table-hover table-responsive" :class="{'text-white': theme}" style="max-width: 1440px; margin: 0 auto;">
                        <thead>
                            <th style="width: 33%;">ID</th>
                            <th style="width: 33%;">İsim</th>
                            <th style="width: 33%;">Soyisim</th>
                        </thead>
                        <tbody>
                            <template v-if="foundClass.studentList.length > 0">
                                <tr v-for="(student, index) in foundClass.studentList" :key="index">
                                    <td>{{student.id}}</td>
                                    <td>{{student.firstName}}</td>
                                    <td>{{student.lastName}}</td>
                                </tr>
                            </template>
                            
                            <tr v-else>
                                <td colspan="4" class="text-info">Öğrenci yok</td>
                            </tr>
                        </tbody>
                    </table>
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
                            <router-link :to="{name: 'classes'}" class="btn btn-warning">Cancel</router-link>
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
