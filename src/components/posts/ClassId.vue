<script setup>
import { getClassUrl } from '@/config/URIPath';
import ClassTitle from '@/components/posts/ClassTitle.vue';
import { onBeforeMount, ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const foundClass = ref([]);
const title = ref('This is an one post list page');
const deneme = computed(() => {
    if(parseInt(route.params.id) !== foundClass.value.id) {
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
        await fetch(getClassUrl + route.params.id)
            .then(response => response.json())
            .then(json => foundClass.value = json);
    } catch (error) {
        console.log(error);
    }
});

</script>

<template>
<div>
    <ClassTitle :title="title" />
        <div class="card mt-3 bg-dark text-white">
            <span class="text-start badge bg-secondary text-wrap text-white extra-small">id: <span class="text-warning">{{ foundClass.id }}</span></span>
            <div class="card-body">
                <span v-if="deneme"><h3>No class found!</h3></span>
                <h5 class="card-title">
                    <table>
                        <tr>
                            <td>İsim:</td>
                            <td><span class="text-warning">{{ foundClass.className }}</span></td>
                        </tr>
                    </table>                    
                </h5>
                <p class="card-text">
                    <table class="d-flex flex-column">
                        <div class="list-group">
                            <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                <span class="text-warning d-block">Öğrenci Sayısı:</span>
                                <span class="copyable">
                                    {{ foundClass.studentCount }}
                                </span>
                                
                            </button>
                            <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                <span class="text-warning d-block">Sorumlu Öğretmen:</span>
                                    <span class="copyable" v-if="foundClass.responsibleTeacher">
                                        <span class="user-select-auto list-group-item list-group-item-action text-start text-white" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
                                            <span class="d-block"><span class="text-info">id:</span>{{foundClass.responsibleTeacher.id}}</span>
                                            <span class="d-block"><span class="text-info">First Name:</span>{{foundClass.responsibleTeacher.firstName}}</span>
                                            <span class="d-block"><span class="text-info">Last Name:</span>{{foundClass.responsibleTeacher.lastName}}</span>
                                        </span>
                                    </span>
                                <span v-else>Hiçbiri</span>
                            </button>
                        </div>
                        <div class="list-group">
                            
                            <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                <span class="text-warning d-block">Öğrenci Listesi:</span>
                                <span class="copyable" v-if="foundClass.studentList && foundClass.studentList.length > 0">
                                    <ul class="list-group list-unstyled overflow-auto" style="max-height: 450px;">
                                        <li v-for="(student) in foundClass.studentList" :key="student.id" class="user-select-auto list-group-item list-group-item-action mb-2" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
                                            <span class="d-block">
                                                    <span class="text-info">id:</span>{{student.id}}
                                            </span>
                                            <span class="d-block">
                                                <span class="text-info">First Name:</span>{{student.firstName}}
                                            </span>
                                            <span class="d-block">
                                                <span class="text-info">Last Name:</span>{{student.lastName}}
                                            </span>
                                        </li>
                                    </ul>
                                </span>
                                <span v-else>Hiçbiri</span>
                            </button>
                        </div>
                    </table>
                </p>
                <div class="btn-group">
                    <router-link :to="{name:'edit-class'}" class="btn btn-outline-success m-2">Edit</router-link>
                    <router-link :to="{name:'delete-class'}" class="btn btn-outline-danger m-2">Delete</router-link>
                    <router-link :to="{name:'classes'}" class="btn btn-outline-warning m-2">Back</router-link>
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
