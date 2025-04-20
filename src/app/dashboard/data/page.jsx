export default function Page() {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl overflow-hidden">
                        <iframe className={"w-full h-full"}
                                src="https://www.youtube.com/embed/rzyQIks_PPo?si=uO_mAvl4DmSseso5"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen></iframe>
                    </div>
                    <div className="bg-muted/50 aspect-video rounded-xl"></div>
                    <div className="bg-muted/50 aspect-video rounded-xl"></div>
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>
            </div>
        </>
    );
}
