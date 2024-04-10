
import axios from "axios"

const checkLogin = async () => {
    const result = await axios.get(process.env.server_url + "user", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}

//File
const uploadFile = async (p: string, file: File, type: string) => {
    const formData = new FormData()
    formData.append("file", file)
    if (type === "pic") {
        const fileUpload = await axios.post(process.env.server_url + p + "/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        })
        return fileUpload.data
    }
    if (type === "file") {
        const fileUpload = await axios.post(process.env.server_url + p + "/uploadFile", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        })
        return fileUpload.data
    }
}
const getPic = async (p: string, u: string) => {
    const result = await axios.get(process.env.server_url + p + "/pic?username=" + u,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        }
    )
    return result.data
}
const deleteFile = async (p: string, name: string, id: string) => {
    const result = await axios.delete(process.env.server_url + p + `/pic?name=${name}&id=${id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        },
    )
    return result.data
}

//Item
const getItem = async (p: string, a: string, skip: number | undefined, limit: number | undefined) => {
    const result = await axios.get(process.env.server_url + `${p}/${a}?skip=${skip ? skip : ""}&limit=${limit ? limit : ""}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}
const getOneItembySlug = async (p: string, a: string, s: string) => {
    const result = await axios.get(process.env.server_url + p + `/${a}?slug=${s}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return result.data
}
const createItem = async (p: string, a: string, body: any) => {
    const result = await axios.post(process.env.server_url + p + "/" + a, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}
const updateItem = async (p: string, a: string, id: string, body: any) => {
    const result = await axios.put(process.env.server_url + p + "/" + a + "?id=" + id, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}
const deleteItem = async (p: string, a: string, id: string) => {
    const result = await axios.delete(process.env.server_url + p + "/" + a + "?id=" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}

const updtteProfile = async (body: any) => {
    const result = await axios.put(process.env.server_url + "user", body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}

const viewLesson = async (p: string, slug: string, course: string,) => {
    const result = await axios.get(process.env.server_url + p + "/lesson" + "?slug=" + slug + "&course=" + course, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}

const createLesson = async (p: string, body: any,) => {
    const result = await axios.post(process.env.server_url + p + "/lesson", body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}
const updateLesson = async (p: string, id: string, body: any,) => {
    const result = await axios.put(process.env.server_url + p + "/lesson?id=" + id, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
    })
    return result.data
}

export const UserAuthen = {
    checkLogin,
    uploadFile,
    createItem,
    getItem,
    getOneItembySlug,
    getPic,
    deleteFile,
    updateItem,
    deleteItem,
    updtteProfile,
    viewLesson,
    createLesson,
    updateLesson
}