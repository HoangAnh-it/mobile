export const initialLoginState = {
    user: {
      id: null,
      role: null
    },
    token: null,
    isLoggedIn: false
}
  
export default function reducer(state, action) {
    console.log("dispatch login",action)
    const { type, payload } = action
    
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                user: {
                    id: payload.id,
                    role: payload.role
                },
                token: payload.token,
                isLoggedIn: true
            }
        
        case 'LOGOUT':
            return {
                ...initialLoginState
            }
        
        default:
            return state
        
    }
}