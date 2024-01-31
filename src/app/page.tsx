'use client';
import React from 'react';
import useSearch from 'services/products/useSearch';

const page = () => {
    const { products } = useSearch({ page: 1 });

    return <div>roaost</div>;
};

export default page;
