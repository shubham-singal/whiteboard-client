const COURSES_URL="http://wbdv-generic-server.herokuapp.com/api/00140471/courses"

export const findAllCourses = () =>{
    return fetch(COURSES_URL)
        .then(response => response.json())
}

export const findCourseById = (courseId) => {
    return fetch(`${COURSES_URL}/${courseId}`,{
        method: 'GET'
    })
        .then(response => response.json())
}

export const deleteCourse = (courseId) =>{
    return fetch(`${COURSES_URL}/${courseId}`,{
        method: 'DELETE'
    })
        .then(response => response.json())
}

export const createCourse = (course) => {
    return fetch(COURSES_URL, {
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(course)
    }).then(response => response.json())

}

export const updateCourse = (courseId,course) => {
    return fetch(`${COURSES_URL}/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const api = {
    findAllCourses,
    findCourseById,
    deleteCourse,
    createCourse,
    updateCourse
}

export default api;

