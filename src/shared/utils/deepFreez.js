export const deepFreez=(object)=>{
    Object.freeze(object)
    Object.getOwnPropertyNames(object).forEach((property)=>{
        const value=object[property];
        if(value && typeof value ==='object' && Object.isFrozen(value)){
            deepFreez(value)
        }
    })

    return object;
}