import { useState } from 'react';

export function useIconLoader() {
    const [isLoading, setIsLoading] = useState(true);

    return {isLoading, setIsLoading};
}