<script setup>
import ClassTitle from '@/components/posts/ClassTitle.vue';
import { reactive, ref, defineProps, watch } from 'vue';
import { getClassUrl, getTeacherUrl, createClassUrl, pathMain } from '@/config/URIPath';


const createdClass = reactive({
    className: '',
    responsibleTeacher: null,
    isTeacherFound: false,
    isClassFound: true,
    errorMessage: null
});

const foundTeacher = ref(null);
const teacherErrorMessage = ref(null);

const props = defineProps({
    theme: {
        default: true
    }
});

const title = ref('This is an post create page');

async function postSave() {
    if(createdClass.className.trim() && createdClass.className.length >= 3){
        const data = {
            className: createdClass.className,
            responsibleTeacher: createdClass.responsibleTeacher
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        // console.log(requestOptions);
        await fetch(createClassUrl, requestOptions)
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
        })
        .catch(error => {
            console.log(error.message);
            if (error.response) {
                console.log(error.response.data);
            }
        })
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

            <!-- <form @submit.prevent="editSave(post._id, event)"> DATA CHECK CONTROL AFTER -->
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

                        <span class="text-warning">Sorumlu Sınıf: </span>
                        {{foundTeacher ? foundTeacher.responsibleClass ? foundTeacher.responsibleClass.className : 'Hiçbiri' : null}}
                        
                    </span>
                    <span v-else>
                        Hiçbiri
                    </span>

                </span>
                <!-- <span class="text-white">{{foundTeacher}}</span> -->
                <div class="form-floating mb-3 text-white justify-content-center">
                    <input type="number" class="form-control" id="title" placeholder="Sorumlu Öğretmen" v-model="createdClass.responsibleTeacher" @input="getTeacherIsAvailable(createdClass.responsibleTeacher)">
                    <label for="title">Sorumlu Öğretmen ID</label>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="d-grid gap-2 mt-4">
                            <button class="btn btn-success" type="button" @click="postSave">Create New Class</button>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <router-link :to="{name: 'classes'}" class="btn btn-danger">Cancel</router-link>
                        </div>
                    </div>
                </div>
                <!-- <div class="form-floating text-white border-primary">
                    
                    <textarea class="form-control" placeholder="Post Description" id="description" style="height: 100px"
                        v-model="createdClass.responsibleTeacher"></textarea>
                    <label for="description">Sorumlu Öğretmen</label>
                    <div class="container">
                        <div class="row">
                            <div class="d-grid gap-2 mt-4">
                                <button class="btn btn-success" type="button" @click="postSave">Create New Class</button>
                            </div>
                            <div class="d-grid gap-2 mt-4">
                                <router-link :to="{name: 'classes'}" class="btn btn-danger">Cancel</router-link>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        <!-- </form> -->
</div>
</template>

<style>
.form-control, .form-control:focus{
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: 1px solid rgba(159, 191, 223, 0.548);
}
.form-control::placeholder{
    color: red;
}
#input-container{
    display: flex;
    flex-direction: column;
    max-width: 768px;
    justify-content: center;
    margin: 0 auto;
}
</style>
