import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);

    const clearFilters = () => {
        setSelectedCategoryId(null);
        setSelectedManufacturerId(null);
    };

    return (
        <FilterContext.Provider value={{
            selectedCategoryId,
            setSelectedCategoryId,
            selectedManufacturerId,
            setSelectedManufacturerId,
            clearFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    return useContext(FilterContext);
}