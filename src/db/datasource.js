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
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
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
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
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
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
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
        console.error('Error:', error);
        throw error;
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

export const setDBUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
}



//Chats
export const getChats = () => {
    const chats = JSON.parse(localStorage.getItem('chats')) || []
    return chats
}

export const setDbChats = (chats) => {
    localStorage.setItem('chats', JSON.stringify(chats))
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
    const response = await fetch(`${API_URL}uploads`, config);
    const data = await response.json();
    return data;
}
export const updateDocument = async (document) => {
    const formData = new FormData();
    formData.append('filetoupdate', document.fileToUpload);
    formData.append('label', document.label);

    const response = await fetch(`${API_URL}uploads/${document.id}`, {
        method: 'PATCH',
        body: formData,
    });
    const data = await response.json();
    return {data, status: response.status};
}

export const addDocument = async (document) => {
    const formData = new FormData();
    formData.append('file', document.fileToUpload);
    formData.append('label', document.label);
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(`${API_URL}uploads`, {
        method: 'POST',
        ...config,
        body: formData,
    });
    const data = await response.json();
    return {data, status: response.status};

}

export const deleteDocument = async (id) => {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(`${API_URL}uploads/${id}`, {
        method: 'DELETE',
        ...config,
    });
    const data = await response.json();
    return {data, status: response.status};
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
    const response = await fetch(`${API_URL}get_auth_user`, config);
    return await response.json()
}
export const setToken = (token) => {
    localStorage.setItem('token', token)
    return token
}

export const deleteLoggedInUser = () => {
    localStorage.removeItem('token')
    return null
}
