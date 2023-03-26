import axios from "axios";

const API = {
    URL: "http://localhost:3000/api",

    instance: axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-Type": "application/json",
        },
    }),
    init:()=>{
        console.log('api initiated');
        API.instance.interceptors.request.use(
            (config) => {
              const token = API.getToken();
              if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;  
              }
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
    },
    getFormData:(ele)=>{
        try {
            const fd=new FormData(ele);
            return Object.fromEntries(fd.entries());
            
        } catch (error) {
            return {};
        }
    },
    img: (name) => {
        return `http://localhost:3000/${name}`;
    },

    getToken: () => {
        return localStorage.getItem('_xtoken');
    },
    setToken:(token)=>{
        return localStorage.setItem('_xtoken',token);

    },
    getRefreshToken: () => {
        return localStorage.getItem('_xtokenrefresh');
    },
    get: (path) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await API.instance.get( path);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }

        })
    },





    post: (path, formData) => {

        return new Promise(async (resolve, reject) => {
            try {
                
                const res = await API.instance.post( path, formData);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }

        })
    },
    postForm: (path, formData) => {

        return new Promise(async (resolve, reject) => {
            try {
                         
                const res = await API.instance.postForm( path, formData);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }

        })
    },

    patchForm: (path, formData) => {

        return new Promise(async (resolve, reject) => {
            try {
                           
                const res = await API.instance.patchForm( path, formData);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }

        })
    },
    patch: (path, formData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await API.instance.patch( path, formData);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }

        })
    },
    delete: (path, formData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await API.instance.delete( path, formData);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }

        })
    }

}

export default API;