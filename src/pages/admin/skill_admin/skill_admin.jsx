import { useRecoilState } from 'recoil';
import { adminSkillPageState } from "../../../atoms"
import { TabToggleBarLg } from "../../../components/custom.library";
import { CategoryManager } from './categories/category_manager';
import { SkillManager } from "./skills/skill_manager";

const SkillAdmin = () => {
    const [pageState,] = useRecoilState(adminSkillPageState)

    return (
        <div className="w-full relative">
            <TabToggleBarLg
                tabs={['skills','categories']}
                tabState={adminSkillPageState}
            />
            {pageState === "skills" ?(
                <SkillManager />
            ):(
                <CategoryManager/>
            )}
        </div>
    )
}
export default SkillAdmin;