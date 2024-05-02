import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

/** Page state atom - specifies the current page to route to
 */
export const pageState = atom({
    key: 'pageState',
    default: "profile",
    effects_UNSTABLE: [persistAtom],
});

/** Dark mode atom - toggles the dark mode state
 */
export const darkMode = atom({
    key: 'darkMode',
    default: "light",
    effects_UNSTABLE: [persistAtom],
});

/** Dashboard Post State Atom - holds currently viewed posts
 */
export const dashboardPostState = atom({
    key: 'postState',
    default: 'recents',
    effects_UNSTABLE: [persistAtom],
});


export const dashboardState = atom({
    key: 'dashboardState',
    default: 'home',
    effects_UNSTABLE: [persistAtom],
});


export const adminPageState = atom({
    key:'adminPageState',
    default:'skills',
    effects_UNSTABLE: [persistAtom],

})


/** Manages whether viewing skills or categories on skill admin page
 */
export const adminSkillPageState = atom({
    key:'adminSkillPageState',
    default:'skills',
    effects_UNSTABLE: [persistAtom],

})



export const settingsPageState = atom({
    key:'settingsPageState',
    default:'profile',
    effects_UNSTABLE: [persistAtom],

})


export const profilePageState = atom({
    key:'profilePageState',
    default:'skills',
    effects_UNSTABLE: [persistAtom],

})

export const explorePageSection = atom({
    key:'explorePageSection',
    default:null,
    effects_UNSTABLE: [persistAtom],
})

export const explorePageItem = atom({
    key:'explorePageItem',
    default:"",
    effects_UNSTABLE: [persistAtom],
})


export const ExplorePageSkillNav = atom({
    key:'explorePageSkillNav',
    default:'skills',
    effects_UNSTABLE: [persistAtom],
})

export const CurrentViewedProfile = atom({
    key:'currentViewedProfile',
    default:null,
    effects_UNSTABLE: [persistAtom],
})


export const rolePageState = atom({
    key:'rolePageState',
    default:'roles',
    effects_UNSTABLE: [persistAtom],
})