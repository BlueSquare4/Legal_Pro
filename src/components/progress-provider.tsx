"use client"

import { useProgressBar } from 'next-nprogress-bar';
import { useEffect } from 'react';

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
    const { NProgress } = useProgressBar();
  
    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
        });
    }, [NProgress]);

    return (
        <>
            {children}
        </>
    );
};
