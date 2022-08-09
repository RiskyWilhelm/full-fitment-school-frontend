<script setup>
import { getClassUrl, getClassesUrl, pathMain } from '@/config/URIPath';
import { onBeforeMount, ref, computed, defineProps } from 'vue';

const classes = ref([]);
const foundClass = ref([]);
const props = defineProps({
    theme: {
        default: true
    }
});

onBeforeMount(async () => {
    try {
        await fetch(getClassesUrl)
            .then(response => response.json())
            .then(json => {
                classes.value = json
                });
    } catch (error) {
        console.log(error);
    }
});

async function postView(id) {
    try {
        await fetch(getClassUrl + id)
            .then(response => response.json())
            .then(json => {
                foundClass.value = json
                });
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <table class="table table-dark table-striped table-hover table-responsive" :class="{'text-white': theme}" style="max-width: 1440px; margin: 0 auto;">
        <thead>
            <tr>
                <th scope="col" >#</th>
                <th scope="col">Sınıf İsmi</th>
                <th scope="col">Öğrenci Sayısı</th>
                <th scope="col">Sorumlu Öğretmen</th>
                <th scope="col">Öğrenciler</th>
                <th scope="col" class="col-md-1">Etkileşimler</th>
            </tr>
            <Teleport to="#modals">
                <div class="modal fade"  :class="{'text-white': theme}" id="classShowModal" tabindex="-1" aria-labelledby="classShowModalLabel"
                            aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" :class="{'bg-dark': theme}">
                            <div class="modal-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col align-self-start">
                                            <h5 class="modal-title" id="classShowModalLabel">İsim: <span class="text-warning">{{ foundClass.className }}</span></h5>
                                        </div>
                                        <div class="col align-self-center user-select-none">
                                            &nbsp;
                                        </div>
                                        <div class="col align-self-end">
                                            <span class="text-end text-muted"><small class="extra-small">id:<span class="text-warning">{{
                                                    foundClass.id
                                            }}</span></small></span>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
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
                                                <span class="user-select-auto list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
                                                    <span class="d-block"><span class="text-info">id:</span>{{foundClass.responsibleTeacher.id}}</span>
                                                    <span class="d-block"><span class="text-info">First Name:</span>{{foundClass.responsibleTeacher.firstName}}</span>
                                                    <span class="d-block"><span class="text-info">Last Name:</span>{{foundClass.responsibleTeacher.lastName}}</span>
                                                </span>
                                            </span>
                                        <span v-else>Hiçbiri</span>
                                    </button>
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
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Teleport>
            <Teleport to="#modals">
                <div class="modal fade" :class="{'text-white': theme}" id="classTeacherModal" tabindex="-1" aria-labelledby="classTeacherModalLabel"
                            aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" :class="{'bg-dark': theme}">
                            <div class="modal-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col align-self-start">
                                            <h5 class="modal-title" id="classTeacherModalLabel">İsim: <span class="text-warning">{{ foundClass.className }}</span></h5>
                                        </div>
                                        <div class="col align-self-center user-select-none">
                                            &nbsp;
                                        </div>
                                        <div class="col align-self-end">
                                            <span class="text-end text-muted"><small class="extra-small">id:<span class="text-warning">{{
                                                    foundClass.id
                                            }}</span></small></span>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="list-group">
                                    <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                        <span class="text-warning d-block">Sorumlu Öğretmen:</span>
                                            <span class="copyable" v-if="foundClass.responsibleTeacher">
                                                <span class="user-select-auto list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
                                                    <span class="d-block"><span class="text-info">id:</span>{{foundClass.responsibleTeacher.id}}</span>
                                                    <span class="d-block"><span class="text-info">First Name:</span>{{foundClass.responsibleTeacher.firstName}}</span>
                                                    <span class="d-block"><span class="text-info">Last Name:</span>{{foundClass.responsibleTeacher.lastName}}</span>
                                                </span>
                                            </span>
                                        <span v-else>Hiçbiri</span>
                                    </button>
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Teleport>
            <Teleport to="#modals">
                <div class="modal fade"  :class="{'text-white': theme}" id="ClassStudentListModal" tabindex="-1" aria-labelledby="ClassStudentListModalLabel"
                            aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" :class="{'bg-dark': theme}">
                            <div class="modal-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col align-self-start">
                                            <h5 class="modal-title" id="ClassStudentListModalLabel">İsim: <span class="text-warning">{{ foundClass.className }}</span></h5>
                                        </div>
                                        <div class="col align-self-center user-select-none">
                                            &nbsp;
                                        </div>
                                        <div class="col align-self-end">
                                            <span class="text-end text-muted"><small class="extra-small">id:<span class="text-warning">{{
                                                    foundClass.id
                                            }}</span></small></span>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="list-group">
                                    <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                        <span class="text-warning d-block">Öğrenci Sayısı:</span>
                                        <span class="copyable">
                                            {{ foundClass.studentCount }}
                                        </span>
                                        
                                    </button>
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
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Teleport>
        </thead>
        <tbody>
            <template v-if="classes.length > 0">
                <tr v-for="(i, index) in classes" :key="index">
                    <th scope="row text-start">{{ i.id }}</th>
                    <!-- <th scope="row text-start">{{ i.id }}</th> -->
                    <td class="text-center">
                        <!-- Button trigger modal -->
                        <a class="navbar-text text-decoration-none text-white" href="#" @click="postView(i.id)" data-bs-toggle="modal" data-bs-target="#classShowModal">
                            <span class="text-warning">{{ i.className }}</span>
                        </a>
                    </td>
                    <td class="text-center">
                            {{ i.studentCount }}
                    </td>
                    <td class="text-center">
                        <!-- Button trigger modal -->
                        <a class="navbar-text text-white text-decoration-none" href="#" @click="postView(i.id)" data-bs-toggle="modal" data-bs-target="#classTeacherModal" v-if="i.responsibleTeacher">
                            <span class="text-warning">{{ (i.responsibleTeacher) ? i.responsibleTeacher.firstName : "Hiçbiri" }}</span>
                        </a>
                        <span v-else>
                            Hiçbiri
                        </span>
                    </td>

                    <td class="text-center">
                        <!-- Button trigger modal -->
                        <a class="navbar-text text-white text-decoration-none" href="#" @click="postView(i.id)" data-bs-toggle="modal" data-bs-target="#ClassStudentListModal" v-if="i.studentList.length > 0">
                            <span class="text-warning">{{ (i.studentList) ? "Listelendi" : "Hiçbiri" }}</span>
                        </a>
                        <span v-else>
                            Hiçbiri
                        </span>
                    </td>

                    <td class="text-end">
                        <div class="btn-group">
                            <router-link :to="{ name: 'edit-class', params: { id: i.id } }"
                                class="btn btn-outline-success btn-sm">Edit</router-link>
                            <router-link :to="{ name: 'get-class', params: { id: i.id } }"
                                class="btn btn-outline-primary btn-sm">View</router-link>
                            <router-link :to="{ name: 'delete-class', params: { id: i.id } }" class="btn btn-outline-danger btn-sm">Del</router-link>
                        </div>
                    </td>
                </tr>
            </template>
            <tr v-else>
                <td colspan="4">No posts</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.extra-small {
    font-size: 1em;
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
