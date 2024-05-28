import React, { createContext, useState, useRef, useContext } from 'react';

const UpgradeContext = createContext(null);

const UpgradeProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [page, setPage] = useState(1);

    const nicknameRef = useRef(null);
    const fullNameRef = useRef(null);
    const descriptionRef = useRef(null);

    const value = {
        nickname,
        setNickname,
        fullName,
        setFullName,
        description,
        setDescription,
        image,
        setImage,
        page,
        setPage,
        nicknameRef,
        fullNameRef,
        descriptionRef,
    };

    return (
        <UpgradeContext.Provider value={value}>
            {children}
        </UpgradeContext.Provider>
    );
};

const useUpgrade = () => {
    const context = useContext(UpgradeContext)
    if (!context) {
        throw new Error('useUpgrade must be used within a UpgradeProvider');
      }
      return context;
}

export {UpgradeProvider, useUpgrade}
