import { Icons } from "../components/Icons"
const SideBar = () => {
    return (
        <>
            <div className="w-[240px] flex flex-col py-8 px-6">
                <div className="flex items-center gap-3">
                    <Icons.OpuraBrandIcon size={32} />
                    <span className="font-semibold text-[19px] text-gray-900 tracking-tight">Opura AI</span>
                </div>


                {/* <div className="flex flex-col gap-8 mt-24">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center gap-4">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#c0c0c0]"></div>
                            <div className="h-[1px] w-12 bg-[#757575]"></div>
                        </div>
                    ))}
                </div> */}

                <div className="flex-1" />

                <div className="flex items-center gap-4 mb-4">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#c0c0c0]"></div>
                    <div className="h-[1px] w-12 bg-[#757575]"></div>
                </div>
            </div>
        </>

    )
}
export default SideBar