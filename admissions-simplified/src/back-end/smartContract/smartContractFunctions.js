
const params = {
    date_of_birth:'"11/20/1997"',
    doc_description:'"Fall and Spring transcripts"',
    doc_status:'"pending"',
    doc_type:'"Transcript"',
    graduation_year:'"2021"',
    send_to:['"Centrale Paris"','"Mines"'].join("; "),
    student_first_name:'"Mathilde"',
    student_last_name:'"Bachy"',
    student_school_name:'"Berkeley"',
}

export const initContractStorageMLSON = (params) => {
    const contractStorage = `(Pair (Pair (Pair ${params.date_of_birth} ${params.doc_description}) (Pair ${params.doc_status} ${params.doc_type})) (Pair (Pair ${params.graduation_year} {${params.send_to}}) (Pair ${params.student_first_name} (Pair ${params.student_last_name} ${params.student_school_name}))))`
    return contractStorage
}


