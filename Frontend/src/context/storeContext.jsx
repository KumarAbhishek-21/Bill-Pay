import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:3000/api";
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <StoreContext.Provider value={{ url, token, setToken }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
