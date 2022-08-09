<script setup>
import { updateClassUrl, getClassUrl, getTeacherUrl, pathMain } from '@/config/URIPath';
import ClassTitle from '@/components/posts/ClassTitle.vue';
import { onBeforeMount, reactive, ref, defineProps } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const createdClass = reactive({
    id: null,
    studentCount: null,
    className: '',
    responsibleTeacher: null,
    isTeacherFound: false,
    isClassFound: true,
    errorMessage: null
});

const editingClassName = ref(null);
const foundTeacher = ref(null);
const teacherErrorMessage = ref(null);

const props = defineProps({
    theme: {
        default: true
    }
});
const title = ref('This is an post edit page');

onBeforeMount(async () => {
    try {
        await fetch(getClassUrl + route.params.id)
            .then(response => response.json())
            .then(json => {
                createdClass.id = json.id;
                createdClass.className = json.className;
                createdClass.studentCount = json.studentCount;
                createdClass.responsibleTeacher = (json.responsibleTeacher) ? json.responsibleTeacher.id : null;
                foundTeacher.value = json.responsibleTeacher;
                editingClassName.value = json.className;
            });
    } catch (error) {
        console.log(error);
    }
});



async function editSave() {
    if(createdClass.className.trim() && createdClass.className.length >= 3){
        const data = {
            className: createdClass.className,
            responsibleTeacher: createdClass.responsibleTeacher
        };
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch(updateClassUrl + route.params.id, requestOptions)
            .then(response => {
                if(response.ok){
                    response.json();
                    window.location.href = `${pathMain}classes`;
                }
                else if(createdClass.responsibleTeacher && createdClass.isTeacherFound == false){
                    createdClass.errorMessage = "Öğretmen zaten bir sınıfa ait.";
                    throw new Error("Öğretmen zaten bir sınıfa ait.");
                }
                else if(createdClass.responsibleTeacher && createdClass.isTeacherFound == true){
                    createdClass.errorMessage = "Girdiğiniz öğretmeni kontrol ediniz.";
                    throw new Error("Girdiğiniz öğretmeni kontrol ediniz.");
                }
                else{
                    createdClass.errorMessage = "Sınıf zaten var.";
                    throw new Error("Sınıf zaten var.");
                }
                window.location.href = `${pathMain}classes`;
            })
            .then(json => createdClass.value = json)
            .catch(error => {
                console.log(error.message);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
    }
    else{
        createdClass.errorMessage = "Lütfen geçerli, 3 harf veya 3 harften büyük bir isim giriniz";
    }
}

async function getTeacherIsAvailable(id) {
    if(id){
        try {
            await fetch(getTeacherUrl + id)
                .then(response => response.json())
                .then(json => {
                    if(json.code){
                        createdClass.isTeacherFound = true;
                        foundTeacher.value = json.message;
                        teacherErrorMessage.value = json.message;
                    }
                    else{
                    foundTeacher.value = null;
                    foundTeacher.value = json;
                    createdClass.isTeacherFound = false;
                    teacherErrorMessage.value = null;
                    }
                });
        } catch (error) {
            teacherErrorMessage.value = "Beklenmedik error.";
            createdClass.isTeacherFound = true;
            console.log(error);
        }
    }
    else{
        foundTeacher.value = null;
    }
}


</script>

<template>
<div>
    <ClassTitle :title="title" />
            <!-- <div class="form-floating mt-3 mb-3">
                <input type="text" class="form-control" id="title" placeholder="Post Title" v-model="createdClass.className">
                <label for="title">Post Title</label>
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Post Description" id="description" style="height: 100px"
                    v-model="createdClass.studentCount"></textarea>
                <label for="description">Post Description</label>
                <div class="container">
                    <div class="row">
                        <div class="d-grid gap-2 mt-4">
                            <button class="btn btn-success" type="button" @click="editSave()">Save the
                                edit</button>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <router-link :to="{name: 'classes'}" class="btn btn-warning">Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div> -->

            <div id="input-container">
                <span class="text-danger" v-if="createdClass && createdClass.errorMessage">{{createdClass.errorMessage}}</span>
                <span class="text-white" v-else>{{createdClass.className}}</span>
                <div class="form-floating mb-3 text-white justify-content-center">
                    <input type="text" class="form-control" id="title" placeholder="Sınıf İsmi" v-model="createdClass.className" @input="createdClass.errorMessage ? createdClass.errorMessage = null : null">
                    <label for="title">Sınıf İsmi</label>
                </div>
                <span class="text-danger" v-if="foundTeacher && teacherErrorMessage">{{teacherErrorMessage}}</span>
                <span class="text-info" v-else>
                    <span v-if="foundTeacher">
                        <span class="text-warning">İsim: </span>
                        {{foundTeacher ? foundTeacher.firstName : null}}

                        <span class="text-warning">Soyisim: </span>
                        {{foundTeacher ? foundTeacher.lastName : null}}
                    </span>
                    <span v-else>
                        Hiçbiri
                    </span>

                </span>
                <div class="form-floating mb-3 text-white justify-content-center">
                    <input type="number" class="form-control" id="title" placeholder="Sorumlu Öğretmen" v-model="createdClass.responsibleTeacher" @input="getTeacherIsAvailable(createdClass.responsibleTeacher)">
                    <label for="title">Sorumlu Öğretmen ID</label>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="d-grid gap-2 mt-4">
                            <button class="btn btn-success" type="button" @click="editSave()">{{editingClassName ? editingClassName : null}} Sınıfı bu bilgilerle güncelle</button>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <router-link :to="{name: 'classes'}" class="btn btn-danger">Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
.form-control, .form-control:focus{
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: 1px solid rgba(159, 191, 223, 0.548);
}
#input-container{
    display: flex;
    flex-direction: column;
    max-width: 768px;
    justify-content: center;
    margin: 0 auto;
}
</style>
