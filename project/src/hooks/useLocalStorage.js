import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => { 
        const storedData = localStorage.getItem(key);
        
        return storedData ? JSON.parse(storedData) : defaultValue; // you parse value saved on Browser localStorage
    });
    
    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue)); // you stringify value to be saved on Browser localStorage
        
        setValue(newValue);
    };
    
    return [
        value,
        setLocalStorageValue,
    ];
}


// this custom hook has too parts, the first is the setting function which makes it so that 
// first, we set values both on browser via localStorage and on our local App component
// second, we initialize our local value for state via using localStorage which is:
// either persisting data from previous refresh cycle
// or we set a hardcoded init value -> 'auth' : {} 
