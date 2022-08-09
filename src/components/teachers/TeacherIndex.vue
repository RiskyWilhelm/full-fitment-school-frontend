<script setup>
import { getClassUrl, getTeacherUrl, getTeachersUrl, pathMain } from '@/config/URIPath';
import { onBeforeMount, ref, computed, defineProps } from 'vue';

const teachers = ref([]);
const foundTeacher = ref([]);
const props = defineProps({
    theme: {
        default: true
    }
});

onBeforeMount(async () => {
    try {
        await fetch(getTeachersUrl)
            .then(response => response.json())
            .then(json => {
                teachers.value = json
                });
    } catch (error) {
        console.log(error);
    }
});

async function postView(id) {
    try {
        await fetch(getTeacherUrl + id)
            .then(response => response.json())
            .then(json => {
                foundTeacher.value = json
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
                <th scope="col">Öğretmen ismi</th>
                <th scope="col">Öğretmen Soyadı</th>
                <th scope="col">Sorumlu Sınıf</th>
                <th scope="col" class="col-md-1">Etkileşimler</th>
            </tr>
            <!-- Show teacher -->
            <Teleport to="#modals">
                <div class="modal fade"  :class="{'text-white': theme}" id="teacherShowModal" tabindex="-1" aria-labelledby="teacherShowModalLabel"
                            aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" :class="{'bg-dark': theme}">
                            <div class="modal-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col align-self-start">
                                            <h5 class="modal-title" id="teacherShowModalLabel"><span class="text-warning">{{ foundTeacher.firstName }}  {{ foundTeacher.lastName }}</span></h5>
                                        </div>
                                        <div class="col align-self-center user-select-none">
                                            &nbsp;
                                        </div>
                                        <div class="col align-self-end">
                                            <span class="text-end text-muted"><small class="extra-small">id:<span class="text-warning">{{
                                                    foundTeacher.id
                                            }}</span></small></span>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="list-group">
                                    <!-- <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                        <span class="text-warning d-block">Öğrenci Sayısı:</span>
                                        <span class="copyable">
                                            {{ foundTeacher.studentCount }}
                                        </span>
                                        
                                    </button> -->
                                    <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                        <span class="text-warning d-block">Sorumlu Sınıf:</span>
                                            <span class="copyable" v-if="foundTeacher.responsibleClass">
                                                <span class="user-select-auto list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
                                                    <span class="d-block"><span class="text-info">id:</span>{{foundTeacher.responsibleClass.id}}</span>
                                                    <span class="d-block"><span class="text-info">Sınıf ismi:</span>{{foundTeacher.responsibleClass.className}}</span>
                                                    <span class="d-block"><span class="text-info">Sınıfın Öğrenci Sayısı:</span>{{foundTeacher.responsibleClass.studentCount}}</span>
                                                </span>
                                            </span>
                                        <span v-else>Hiçbiri</span>
                                    </button>
                                    <!-- <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                        <span class="text-warning d-block">Öğrenci Listesi:</span>
                                        <span class="copyable" v-if="foundTeacher.studentList && foundTeacher.studentList.length > 0">
                                            <ul class="list-group list-unstyled overflow-auto" style="max-height: 450px;">
                                                <li v-for="(student) in foundTeacher.studentList" :key="student.id" class="user-select-auto list-group-item list-group-item-action mb-2" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
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
                                    </button> -->
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
            <!-- Show class -->
            <Teleport to="#modals">
                <div class="modal fade" :class="{'text-white': theme}" id="teacherClassModal" tabindex="-1" aria-labelledby="teacherClassModalLabel"
                            aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" :class="{'bg-dark': theme}">
                            <div class="modal-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col align-self-start">
                                            <h5 class="modal-title" id="teacherClassModalLabel">İsim: <span class="text-warning">{{foundTeacher.responsibleClass ? foundTeacher.responsibleClass.className : null}}</span></h5>
                                        </div>
                                        <div class="col align-self-center user-select-none">
                                            &nbsp;
                                        </div>
                                        <div class="col align-self-end">
                                            <span class="text-end text-muted"><small class="extra-small">Sınıf id:<span class="text-warning">{{
                                                    foundTeacher.responsibleClass ? foundTeacher.responsibleClass.id : null
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
                                        <span class="text-warning d-block">Sınıf:</span>
                                            <span class="copyable" v-if="foundTeacher.responsibleClass">
                                                <span class="user-select-auto list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
                                                    <span class="d-block"><span class="text-info">id:</span>{{foundTeacher.responsibleClass.id}}</span>
                                                    <span class="d-block"><span class="text-info">First Name:</span>{{foundTeacher.responsibleClass.className}}</span>
                                                    <span class="d-block"><span class="text-info">Last Name:</span>{{foundTeacher.responsibleClass.studentCount}}</span>
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
            <!-- <Teleport to="#modals">
                <div class="modal fade"  :class="{'text-white': theme}" id="additionalTeacherModal" tabindex="-1" aria-labelledby="additionalTeacherModalLabel"
                            aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" :class="{'bg-dark': theme}">
                            <div class="modal-header">
                                <div class="container">
                                    <div class="row">
                                        <div class="col align-self-start">
                                            <h5 class="modal-title" id="additionalTeacherModalLabel">İsim: <span class="text-warning">{{ foundTeacher.className }}</span></h5>
                                        </div>
                                        <div class="col align-self-center user-select-none">
                                            &nbsp;
                                        </div>
                                        <div class="col align-self-end">
                                            <span class="text-end text-muted"><small class="extra-small">id:<span class="text-warning">{{
                                                    foundTeacher.id
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
                                            {{ foundTeacher.studentCount }}
                                        </span>
                                        
                                    </button>
                                    <button type="button" class="user-select-all list-group-item list-group-item-action text-start" :class="{'bg-dark': theme}">
                                        <span class="text-warning d-block">Öğrenci Listesi:</span>
                                        <span class="copyable" v-if="foundTeacher.studentList && foundTeacher.studentList.length > 0">
                                            <ul class="list-group list-unstyled overflow-auto" style="max-height: 450px;">
                                                <li v-for="(student) in foundTeacher.studentList" :key="student.id" class="user-select-auto list-group-item list-group-item-action mb-2" :class="{'bg-dark': theme}" style="z-index: 2; cursor: text;">
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
            </Teleport> -->
        </thead>
        <tbody>
            <template v-if="teachers.length > 0">
                <tr v-for="(i, index) in teachers" :key="index">
                    <th scope="row text-start">{{ i.id }}</th>
                    <!-- <th scope="row text-start">{{ i.id }}</th> -->
                    <td class="text-center">
                        <!-- Button trigger modal -->
                        <a class="navbar-text text-decoration-none text-white" href="#" @click="postView(i.id)" data-bs-toggle="modal" data-bs-target="#teacherShowModal">
                            <span class="text-warning">{{ i.firstName }}</span>
                        </a>
                    </td>
                    <td class="text-center">
                            {{ i.lastName }}
                    </td>
                    <td class="text-center">
                        <!-- Button trigger modal -->
                        <a class="navbar-text text-white text-decoration-none" href="#" @click="postView(i.id)" data-bs-toggle="modal" data-bs-target="#teacherClassModal" v-if="i.responsibleClass">
                            <span class="text-warning">{{ (i.responsibleClass) ? i.responsibleClass.className : "Hiçbiri" }}</span>
                        </a>
                        <span v-else>
                            Hiçbiri
                        </span>
                    </td>

                    <!-- <td class="text-center">
                        <a class="navbar-text text-white text-decoration-none" href="#" @click="postView(i.id)" data-bs-toggle="modal" data-bs-target="#additionalTeacherModal" v-if="i.studentList.length > 0">
                            <span class="text-warning">{{ (i.studentList) ? "Listelendi" : "Hiçbiri" }}</span>
                        </a>
                        <span v-else>
                            Hiçbiri
                        </span>
                    </td> -->

                    <td class="text-end">
                        <div class="btn-group">
                            <router-link :to="{ name: 'edit-teacher', params: { id: i.id } }"
                                class="btn btn-outline-success btn-sm">Edit</router-link>
                            <router-link :to="{ name: 'get-teacher', params: { id: i.id } }"
                                class="btn btn-outline-primary btn-sm">View</router-link>
                            <router-link :to="{ name: 'delete-teacher', params: { id: i.id } }" class="btn btn-outline-danger btn-sm">Del</router-link>
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
