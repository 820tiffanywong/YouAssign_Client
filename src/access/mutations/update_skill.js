import { gql } from "@apollo/client";

export const UPDATE_SKILL = gql`
    mutation Mutation($where: SkillWhere, $update: SkillUpdateInput) {
        updateSkills(where: $where, update: $update) {
            skills {
                title
                img_src
                description
                date_added
            }
        }
    }
`;