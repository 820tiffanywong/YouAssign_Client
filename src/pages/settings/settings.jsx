import { settingsPageState } from "../../atoms";
import { useRecoilState } from 'recoil';
import ProfileSettings from "./profile_settings";
import { PageHeader } from "../../components/prebuilt.library";

const Settings = () => {
    const [menuState,setMenuState] = useRecoilState(settingsPageState)
    return (
        <>
            <PageHeader>
                {menuState} Settings
            </PageHeader>
            <div className="flex no-wrap ">
                <ProfileSettings />
            </div>
        </>
    )
}
export default Settings;