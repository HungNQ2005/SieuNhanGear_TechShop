import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const clearFilters = () => {
        setSelectedCategoryId(null);
        setSelectedManufacturerId(null);
        setSearchQuery('');
    };

    return (
        <FilterContext.Provider value={{
            selectedCategoryId,
            setSelectedCategoryId,
            selectedManufacturerId,
            setSelectedManufacturerId,
            searchQuery,
            setSearchQuery,
            clearFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    return useContext(FilterContext);
}