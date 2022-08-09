const pathMain = 'http://localhost:8080/#/';

// School Classes urls
const createClassUrl = 'http://localhost:8081/classes/createClass'
const updateClassUrl = 'http://localhost:8081/classes/updateClass/'
const deleteClassUrl = 'http://localhost:8081/classes/deleteClass/'
const getClassesUrl = 'http://localhost:8081/classes/getAllClasses';
const getClassUrl = 'http://localhost:8081/classes/getClass/';

// Student urls
const getStudentsUrl = '';


// Teacher urls
const getTeachersUrl = 'http://localhost:8081/teachers/getAllTeachers';
const getTeacherUrl = 'http://localhost:8081/teachers/getTeacher/';
const createTeacherUrl = 'http://localhost:8081/teachers/createTeacher';
const deleteTeacherUrl = 'http://localhost:8081/teachers/deleteTeacher/';
const updateTeacherUrl = 'http://localhost:8081/teachers/updateTeacher/';
module.exports = {
    getClassesUrl,
    getClassUrl,
    createClassUrl,
    updateClassUrl,
    deleteClassUrl,
    pathMain,

    getTeachersUrl,
    getTeacherUrl,
    createTeacherUrl,
    deleteTeacherUrl,
    updateTeacherUrl
}