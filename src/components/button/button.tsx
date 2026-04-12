"use client";

import style from '@/components/button/button.module.css';
import mapHook from "@/utils/mapHook";

export default function Button({ children, selectFunction, functionParameters }: { children: React.ReactNode, selectFunction: string, functionParameters?: any }) {
    return (
        <div className={style.container}>
            <button onClick={() => mapHook(selectFunction)(functionParameters)}>
                {children}
            </button>
        </div>
    );
}