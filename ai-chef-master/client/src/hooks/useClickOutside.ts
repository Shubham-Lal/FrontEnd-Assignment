import { useEffect, RefObject } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, ignoreButton?: HTMLElement): void => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ignoreButton && event.target instanceof Node && ignoreButton.contains(event.target)) {
                return;
            }
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref, callback, ignoreButton]);
};

export default useClickOutside;