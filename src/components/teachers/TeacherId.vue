<script setup>
import { getTeacherUrl } from '@/config/URIPath';
import ClassTitle from '@/components/teachers/TeacherTitle.vue';
import { onBeforeMount, ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const foundTeacher = ref([]);
const title = ref('This is an one post list page');
const deneme = computed(() => {
    if(parseInt(route.params.id) !== foundTeacher.value.id) {
        return true
    }
})
const props = defineProps({
    theme: {
        default: true
    }
});

onBeforeMount(async () => {
    try {
        await fetch(getTeacherUrl + route.params.id)
            .then(response => response.json())
            .then(json => foundTeacher.value = json);
    } catch (error) {
        console.log(error);
    }
});

</script>

<template>
<div>
    <ClassTitle :title="title" />
        <div class="card mt-3 bg-dark text-white">
            <span class="text-start badge bg-secondary text-wrap text-white extra-small">id: <span class="text-warning">{{ foundTeacher.id }}</span></span>
            <div class="card-body">
                <span v-if="deneme"><h3>No class found!</h3></span>
                <h5 class="card-title">
                    <table>
                        <tr>
                            <td><span class="text-warning">{{ foundTeacher.firstName }}</span><span class="text-info">&nbsp; {{ foundTeacher.lastName }}</span></td>
                        </tr>
                    </table>                    
                </h5>
                <p class="card-text">
                    <table class="d-flex flex-column">
                        <div class="list-group">
                            <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                <span class="text-white d-block">Sorumlu Sınıf:</span>
                                <span class="text-warning" v-if="foundTeacher.responsibleClass">
                                    <p class="d-block user-select-auto">Sınıf ID:<span class="text-info">{{foundTeacher.responsibleClass ? foundTeacher.responsibleClass.id : null}}</span></p>
                                    <p class="d-block user-select-auto">Sınıf İsmi:<span class="text-info">{{foundTeacher.responsibleClass ? foundTeacher.responsibleClass.className : null}}</span></p>
                                    <p class="d-block user-select-auto">Öğrenci Sayısı:<span class="text-info">{{foundTeacher.responsibleClass ? foundTeacher.responsibleClass.studentCount : null}}</span></p>
                                </span>
                                <span v-else class="text-info">
                                    Hiçbiri
                                </span>
                            </button>
                            
                        </div>
                    </table>
                </p>
                <div class="btn-group">
                    <router-link :to="{name:'edit-teacher'}" class="btn btn-outline-success m-2">Edit</router-link>
                    <router-link :to="{name:'delete-teacher'}" class="btn btn-outline-danger m-2">Delete</router-link>
                    <router-link :to="{name:'teachers'}" class="btn btn-outline-warning m-2">Back</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.extra-small {
    font-size: 1em;
    font-style: italic;
}
.list-group-item{
    color: white;
}

.list-group::-webkit-scrollbar { display: none; }
/* -moz- (Firefox): */
.list-group {
     overflow: -moz-scrollbars-none; 
}
/* -ms- (Internet Explorer +10): */
.list-group { -ms-overflow-style: none; }

.list-group-item:focus{
    box-shadow: 0 0 0 2px rgba(107, 107, 107, 0.5);
    background: #d4d3d32d!important;
}

.list-group-item-action{
    transition: background 200ms;
}

.list-group-item-action:hover {
    background: #8585852d!important;
}
</style>
