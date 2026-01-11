export function setAuth(token,role) {
    localStorage.setItem("token",token);
    localStorage.setItem("role",role);
}

export function getToken(){
    return localStorage.getItem("token") ;
} 

export function getRole(){
    return localStorage.getItem("role") ;
    if (!role) return null;

  return role.toUpperCase();
}

export function logout(){
     localStorage.clear() ;
}