<script setup>
import ClassTitle from '@/components/teachers/TeacherTitle.vue';
import { reactive, ref, defineProps, watch } from 'vue';
import { getClassUrl, getTeacherUrl, createTeacherUrl, pathMain } from '@/config/URIPath';


const createdTeacher = reactive({
    firstName: null,
    lastName: null,
    responsibleClass: null,
    isClassFound: true,
    errorMessage: null
});

const foundClass = ref(null);
const classErrorMessage = ref(null);

const props = defineProps({
    theme: {
        default: true
    }
});

const title = ref('This is an teacher create page');

async function postSave() {
    if(createdTeacher.firstName && createdTeacher.lastName && createdTeacher.firstName.trim() && createdTeacher.lastName.trim() && createdTeacher.firstName.length >= 2 && createdTeacher.lastName.length > 2){
        const data = {
            firstName: createdTeacher.firstName,
            lastName: createdTeacher.lastName,
            responsibleClass: createdTeacher.responsibleClass
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        // console.log(requestOptions);
        await fetch(createTeacherUrl, requestOptions)
        .then(response => {
            if(response.ok){
                response.json();
                window.location.href = `${pathMain}teachers`;
            }
            else if(createdTeacher.responsibleClass && createdTeacher.isClassFound == false){
                createdTeacher.errorMessage = "Bu sınıfın bir öğretmeni zaten var";
                throw new Error("Bu sınıfın bir öğretmeni zaten var");
            }
            else if(createdTeacher.responsibleClass && createdTeacher.isClassFound == true){
                createdTeacher.errorMessage = "Girdiğiniz öğretmeni kontrol ediniz.";
                throw new Error("Girdiğiniz öğretmeni kontrol ediniz.");
            }
            else{
                createdTeacher.errorMessage = "Sınıf zaten var.";
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
        createdTeacher.errorMessage = "Lütfen geçerli, 2 harf veya 2 harften büyük isim ve soyad giriniz";
    }
}

async function getClassIsAvailable(id) {
    if(id){
        try {
            await fetch(getClassUrl + id)
                .then(response => response.json())
                .then(json => {
                    if(json.code){
                        createdTeacher.isClassFound = true;
                        foundClass.value = json.message;
                        classErrorMessage.value = json.message;
                    }
                    else{
                        foundClass.value = null;
                        foundClass.value = json;
                        createdTeacher.isClassFound = false;
                        classErrorMessage.value = null;
                    }
                });
        } catch (error) {
            classErrorMessage.value = "Beklenmedik error.";
            createdTeacher.isClassFound = true;
            console.log(error);
        }
    }
    else{
        foundClass.value = null;
    }
}



</script>

<template>
<div>
<ClassTitle :title="title" />

            <div id="input-container">
                <span class="text-danger" v-if="createdTeacher && createdTeacher.errorMessage">{{createdTeacher.errorMessage}}</span>
                <span class="text-white" v-else>{{createdTeacher.firstName}}  {{createdTeacher.lastName}}</span>
                <div class="form-floating mb-3 text-white justify-content-center">
                    <input type="text" class="form-control" id="title" placeholder="Öğretmen İsmi" v-model="createdTeacher.firstName" @input="createdTeacher.errorMessage ? createdTeacher.errorMessage = null : null">
                    <label for="title">Öğretmen İsmi</label>
                </div>
                <div class="form-floating mb-3 text-white justify-content-center">
                    <input type="text" class="form-control" id="title" placeholder="Öğretmen Soyadı" v-model="createdTeacher.lastName" @input="createdTeacher.errorMessage ? createdTeacher.errorMessage = null : null">
                    <label for="title">Öğretmen Soyadı</label>
                </div>
                <span class="text-danger" v-if="foundClass && classErrorMessage">{{classErrorMessage}}</span>
                <span class="text-info" v-else>
                    <span v-if="foundClass">
                        <span class="text-warning">Sınıf ismi: </span>
                        {{foundClass ? foundClass.className : null}}

                        <span class="text-warning">Sorumlu Öğretmen: </span>
                        {{foundClass ? foundClass.responsibleTeacher ? foundClass.responsibleTeacher.firstName + ' ' + foundClass.responsibleTeacher.lastName : 'Hiçbiri' : null}}
                    </span>
                    <span v-else>
                        Hiçbiri
                    </span>

                </span>
                <!-- <span class="text-white">{{foundClass}}</span> -->
                <div class="form-floating mb-3 text-white justify-content-center">
                    <input type="number" class="form-control" id="title" placeholder="Sorumlu Öğretmen" v-model="createdTeacher.responsibleClass" @input="getClassIsAvailable(createdTeacher.responsibleClass)">
                    <label for="title">Sorumlu Sınıf ID</label>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="d-grid gap-2 mt-4">
                            <button class="btn btn-success" type="button" @click="postSave">Create New Class</button>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <router-link :to="{name: 'teachers'}" class="btn btn-danger">Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div>
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
