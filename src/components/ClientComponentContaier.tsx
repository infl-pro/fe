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

const ClientComponentContaier = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default ClientComponentContaier;
