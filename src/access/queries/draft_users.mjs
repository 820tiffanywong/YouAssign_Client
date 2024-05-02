import { gql } from "@apollo/client";


export const DRAFT_USERS = gql`
    query GetUsersWithSkills($skillList: [String!]!, $min: Int, $topK: Int) {
        getUsersWithSkills(skillList: $skillList, min: $min, topK: $topK) {
            name
            skills
            percentKnown
        }
    }
`