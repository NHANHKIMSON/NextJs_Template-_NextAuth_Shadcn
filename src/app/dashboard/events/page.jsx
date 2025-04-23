// import ZoneDesigner from "../../components/ZoneDesigner";
'use client';
import dynamic from 'next/dynamic';

const ZoneDesigner = dynamic(() => import('../../components/ZoneDesigner'), {
    ssr: false,
});
export default function Page(){
    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Event Zone Designer</h1>
                <ZoneDesigner />
            </div>
        </>
    )
}