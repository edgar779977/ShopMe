// IsMobileContext.js
import React, { createContext, useState, useEffect } from 'react';

const IsMobileContext = createContext();

export const IsMobileProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768); // Adjust as per your mobile breakpoint
    };

    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return (
        <IsMobileContext.Provider value={{ isMobile }}>
            {children}
        </IsMobileContext.Provider>
    );
};

export default IsMobileContext;
