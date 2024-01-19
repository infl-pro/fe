import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import {
    CheckBoxOutlineBlankIcon,
    CheckBoxIcon,
} from 'components/atoms/IconButton';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';

export interface CheckBoxProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'defaultValue' | 'onChange'
    > {
    /**
     * 표시 라벨
     */
    label?: string;
    onChange: () => void;
}

const CheckBoxElement = styled.input`
    display: none;
`;

const Label = styled.label`
    cursor: pointer;
    margin-left: 6px;
    user-select: none;
`;

/**
 * 체크 박스
 */
const CheckBox = (props: CheckBoxProps) => {
    const { id, label, onChange, checked, ...rest } = props;

    return (
        <>
            <CheckBoxElement
                {...rest}
                type="checkbox"
                checked={checked ?? false}
                onChange={onChange}
            />
            <Flex alignItems="center">
                {/* 체크 박스 ON/OFF 그리기 */}
                {checked ? (
                    <CheckBoxIcon size={20} onClick={onChange} />
                ) : (
                    <CheckBoxOutlineBlankIcon size={20} onClick={onChange} />
                )}
                {/* 체크 박스 라벨 */}
                {label && label.length > 0 && (
                    <Label htmlFor={id} onClick={onChange}>
                        <Text>{label}</Text>
                    </Label>
                )}
            </Flex>
        </>
    );
};

export default CheckBox;
