import db from './firebase.config';

export const fectchStudentRequest = async (studentId) => {
    const response = db.collection('requests');
    const query = response.where("student", "==", studentId)
    const data = await query.get();
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data()));
    return result;
}

export const writeRequest = async (data) => {
    const requestsRef = db.collection('requests');
    const res = await requestsRef.add(data);
    return res.id;
}