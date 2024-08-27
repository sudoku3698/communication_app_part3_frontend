
import Swal from 'sweetalert2'
export const API_URL="http://localhost:4200/";
//Users
export const getUsers = async () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}users`, config);
        console.log(response.status)
        if (response.status === 403 || response.status===401) {
            checkForbidden();
            return;
        }
        return await response.json();
    } catch (error) {
        
    }
}

export const deleteUser=async (id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}users/${id}`, {
            method: 'DELETE',
            ...config,
        });
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        return await response.json();
    } catch (error) {
        
    }
}

export const updateUser=async (user,id) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}users/${id}`, {
            method: 'PUT',
            ...config,
            body: JSON.stringify(user),
        });
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        return await response.json();
    } catch (error) {
        
    }
}


export const registerUser=async (user) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}register_users`, {
            method: 'POST',
            ...config,
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return {data, status: response.status};
    } catch (error) {
        
    }
}

export const loginUser = async (user) => {
    const response = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    return {data, status: response.status};
}



//Chats
export const getChats = async () => {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}chats`, config);
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        const data = await response.json();
        return data;
    } catch (error) {
        
    }
}

export const createChat = async (chats) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}chats`, {
            method: 'POST',
            ...config,
            body: JSON.stringify(chats),
        });
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        const data = await response.json();
        return {data, status: response.status};
    } catch (error) {
        
    }
}
export const title="Document";

//Documents
export const getDocuments = async () => {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}uploads`, config);
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        const data = await response.json();
        return data;
    } catch (error) {
        
    }
}
export const updateDocument = async (id,inputs) => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key => {
        if(key === 'label'){
            formData.append('label', inputs[key]);
        }else if(key === 'filename'){
            formData.append('filetoupload', inputs[key][0]);
        }
    });

    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    
    try {
        const response = await fetch(`${API_URL}uploads/${id}`, {
            method: 'PUT',
            ...config,
            body: formData,
        });
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        const data = await response.json();
        return {data, status: response.status};
    } catch (error) {
        
    }
}

export const addDocument = async (inputs) => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key => {
        if(key === 'label'){
            formData.append('label', inputs[key]);
        }else if(key === 'filename'){
            formData.append('filetoupload', inputs[key][0]);
        }
    });
    
    
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    try {
        const response = await fetch(`${API_URL}uploads`, {
            method: 'POST',
            ...config,
            body: formData,
        });
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        const data = await response.json();
        return {data, status: response.status};
    } catch (error) {
    }

}

export const deleteDocument = async (id) => {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}uploads/${id}`, {
            method: 'DELETE',
            ...config,
        });
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        const data = await response.json();
        return {data, status: response.status};
    } catch (error) {
        
    }
}


//loggedInUser
export const getToken = () => {
    return localStorage.getItem('token')
}

export const getLoggedInUser = async () => {
    const token = getToken()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${API_URL}get_auth_user`, config);
        if (response.status === 403 || response.status===401) {
            checkForbidden();
        }
        return await response.json()
    } catch (error) {
        
    }
}
export const setToken = (token) => {
    localStorage.setItem('token', token)
    return token
}

export const deleteLoggedInUser = () => {
    localStorage.removeItem('token')
    return null
}

const checkForbidden = () => {
        deleteLoggedInUser()
        Swal.fire({
            title: 'Session Expired',
            text: 'Your session has expired, please login again.',
            icon: 'error',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login'
            }
        })
        

}
