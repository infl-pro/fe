'use client';
import React from 'react';
import StyledComponentsRegistry from 'lib/registry';
import {
    ServerStyleSheet,
    StyleSheetManager,
    ThemeProvider,
} from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { theme } from 'themes/index';
import GlobalSpinner from './organisms/GlobalSpinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClinet = new QueryClient();

const ClientComponentContaier = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <QueryClientProvider client={queryClinet}>
            <StyledComponentsRegistry>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <GlobalSpinner />
                    {children}
                </ThemeProvider>
            </StyledComponentsRegistry>
        </QueryClientProvider>
    );
};

export default ClientComponentContaier;
