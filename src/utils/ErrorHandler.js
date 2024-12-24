
export default function handleError(error) {

    const errorsObjectToText = (errors,keyrequired=false) =>{
        let error = '';
        for (const key in errors) {
            error += `${keyrequired?key+" - ":""} ${errors[key]}`;
        }
        return error.trim();
    };
    const errorParser = (e) => {
        return errorsObjectToText(e?.data?.errors || e?.errors) || e?.data || "An unexpected error occurred";
    };

    if (Array.isArray(error) || typeof error === 'object'){
        alert(errorParser(error));
    }else{
        alert(error.data)
    }
    
};
