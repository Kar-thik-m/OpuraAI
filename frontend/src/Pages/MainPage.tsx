import MainBar from "../components/MainBar";
import SideBar from "../components/SideBar";

function MainPage() {
    return (
        <div className="flex h-screen w-full bg-[#d9d9d9] font-sans text-gray-800">
            <SideBar />
            <MainBar />
        </div>
    )
}

export default MainPage;
