import { gql } from "@apollo/client";

export const GET_SKILL = gql`
    query Skills($where: SkillWhere) {
        skills(where: $where) {
            title
            description
            img_src
            date_added
            users {
                img
                first 
                last
                slug
                email
            }
        }
    }
`;