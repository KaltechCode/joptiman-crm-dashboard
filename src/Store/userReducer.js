const SET_IS_ADMIN='SET_IS_ADMIN';


export const setIsAdmin=(isAdmin)=>({
    type:'SET_IS_ADMIN',
    payload:isAdmin
})


const initialState={
    isAdmin:false
}

export const userReducer =(state=initialState , action)=>{
  switch (action.type){
    case SET_IS_ADMIN:
        return { ...state, isAdmin: action.payload };
   
    default:
        return state                            
}
}

