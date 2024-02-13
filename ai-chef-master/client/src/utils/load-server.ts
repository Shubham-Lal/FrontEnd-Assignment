import { Dispatch, SetStateAction, useEffect } from "react";

function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);

        fetch(url)
            .then(response => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

const loadServer = (setServerDown: Dispatch<SetStateAction<boolean>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        let isMounted = true;
        const maxAttempts = 5;
        let attempts = 0;

        const loadServer = async () => {
            while (attempts < maxAttempts && isMounted) {
                try {
                    const response = await fetchWithTimeout(`${import.meta.env.VITE_SERVER_URL}`, 1000);

                    if (response.ok) {
                        setLoading(false);
                        break;
                    }
                } catch (error) {
                    console.error('Failed to fetch server status:', error);
                }
                attempts++;
                await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
            }

            if (isMounted && attempts >= maxAttempts) {
                setServerDown(true);
                setLoading(false);
            }
        };

        loadServer();

        return () => {
            isMounted = false;
        };
    }, []);
}

export default loadServer;