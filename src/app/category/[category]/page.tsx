'use client';
import ClientComponentContaier from 'components/ClientComponentContaier';
import { NextPage } from 'next';
import React from 'react';
import CategoryPageContent from 'components/templates/CategoryPageContent';
import { usePathname, useSearchParams } from 'next/navigation';

const extractCategoryFromUrl = (pathname: string) => {
    const parts = pathname.split('/category/');

    const category = parts[1];

    return category;
};

const CategoryPage: NextPage = () => {
    const pathname = usePathname();

    console.log(pathname);
    return (
        <ClientComponentContaier>
            <CategoryPageContent
                searchCategory={extractCategoryFromUrl(pathname)}
            />
        </ClientComponentContaier>
    );
};

export default CategoryPage;
