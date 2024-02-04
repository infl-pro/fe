'use client';
import ClientComponentContaier from 'components/ClientComponentContaier';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import CategoryPageContent from 'components/templates/CategoryPageContent';

const CategoryPage: NextPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // const slug: Category[] = Array.isArray(router.query.slug)
    //     ? (router.query.slug as Category[])
    //     : [];

    // url에서 값 받아서 동적으로 search api 카테고리 넣어주기
    return (
        <ClientComponentContaier>
            <CategoryPageContent />
        </ClientComponentContaier>
    );
};

export default CategoryPage;
