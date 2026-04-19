"use client";

import style from '@/components/button/button.module.css';
import mapHook from "@/utils/mapHook";

interface ButtonProps {
    children: React.ReactNode;
    selectFunction: string;
    functionParameters?: any;
}

export default function Button({ children, selectFunction, functionParameters}: ButtonProps) {
    return (
        <div className={style.container}>
            <button onClick={() => mapHook(selectFunction)(functionParameters )}>
                {children}
            </button>
        </div>
    );
}