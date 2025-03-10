import SideNavbar from "./SideNavbar";
import Main from "./Main";

// Home Component that renders SideNavbar and Main Component
// eslint-disable-next-line react/prop-types
export default function Home({sideNavbar, videosFiltered}) {
    return(
        <div className="flex w-full pt-2.5 pl-3 box-border">
            {/* Render SideNavbar and pass sideNavbar as prop */}
            <SideNavbar sideNavbar={sideNavbar}/>

            {/* Render Main and pass sideNavbar and videosFiltered as props */}
            <Main sideNavbar={sideNavbar} videosFiltered={videosFiltered}/> 
        </div>
    )
}
