import { useCallback, useEffect, useState } from 'react';

export const useSelection = (items: number[] | undefined) => {
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        setSelected([]);
    }, [items]);

    const handleSelectAll = useCallback(() => {
        if (!items) return;
        setSelected([...items]);
    }, [items]);

    const handleSelectOne = useCallback((item: number) => {
        setSelected(prevState => [...prevState, item]);
    }, []);

    const handleDeselectAll = useCallback(() => {
        setSelected([]);
    }, []);

    const handleDeselectOne = useCallback((item: number) => {
        setSelected(prevState => {
            return prevState.filter(_item => _item !== item);
        });
    }, []);

    return {
        handleDeselectAll,
        handleDeselectOne,
        handleSelectAll,
        handleSelectOne,
        selected,
    };
};
