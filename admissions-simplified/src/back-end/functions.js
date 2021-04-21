import { db, storage } from './firebase.config';

export const fectchStudentRequest = async (studentId) => {
    const response = db.collection('requests');
    const query = response.where("student", "==", studentId)
    const data = await query.get();
    if (data.empty) return [];
    let result = []
    data.forEach(doc => result.push(doc.data()));
    return result;
}

export const createContractInDB = async (studentId, registrarId, universityList, contractAdress) => {
    const requestsRef = db.collection('requests');
    const data = {
        studentId: studentId,
        registrarId: registrarId,
        universityList: universityList,
        contractAdress: contractAdress,
    }
    const res = await requestsRef.add(data);
    return res.id;
}

export const getAllRegistrar = async () => {
    const requestsRef = db.collection('users');
    const query = requestsRef.where("userType", "==", "highschool")
    const data = await query.get()
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data()));
    return result;
}

export const getAllUniversities = async () => {
    const requestsRef = db.collection('users');
    const query = requestsRef.where("userType", "==", "university")
    const data = await query.get()
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data()));
    return result;
}

export const getRegistrarId = async (highschool) => {
    const requestsRef = db.collection('requests');
    const query = requestsRef.where("displayName", "==", highschool)
    const data = await query.get()
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data()));
    return result;
}

export const getAllRequestFromRegistar = async (registrar) => {
    const requestsRef = db.collection('requests');
    const query = requestsRef.where('assignedHS', '==', registrar);
    const data = await query.get()
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data()));
    return result;
}

export const getStudentContractAdresses = async (student_uid) => {
    const requestsRef = db.collection('requests');
    const query = requestsRef.where('studentId', '==', student_uid);
    const data = await query.get()
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data().contractAdress));
    return result;
}

export const getRegistrarContractAdress = async (registrar_id) => {
    const requestsRef = db.collection('requests');
    const query = requestsRef.where('registrarId', '==', registrar_id);
    const data = await query.get()
    if (data.empty) return null;
    let result = []
    data.forEach(doc => result.push(doc.data().contractAdress));
    return result
}

export const getUniversityContractAdress = async (university_id) => {
    const requestsRef = db.collection('requests');
    const query = requestsRef.where('universityList', "array-contains", university_id);
    const data = await query.get()
    if (data.empty) return [];
    let result = []
    data.forEach(doc => result.push(doc.data().contractAdress));
    return result
}
export const uploadFileToContract = async (file, contractAddress) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    const uploadFile = await fileRef.put(file);
    console.log(uploadFile);
    const downloadUrl = await fileRef.getDownloadURL();
    const requestsRef = db.collection('requests');
    const query = requestsRef.where('contractAdress', '==', contractAddress);
    const data = await query.get();
    data.forEach(async doc => {
        if (doc.data().files) await doc.ref.update({files: [...doc.data().files, {'name': file.name, 'downloadUrl': downloadUrl}]});
        else await doc.ref.update({files: [{'name': file.name, 'downloadUrl': downloadUrl}]})
    })
    return "completed";
}

export const getAllFilesFromContractAddress = async (contractAddress) => {
    const requestsRef = db.collection('requests');
    const query = requestsRef.where('contractAdress', '==', contractAddress);
    const data = await query.get();
    let result = [];
    data.forEach(doc => result.push(doc.data().files));
    console.log(result[0])
    return result[0];
}