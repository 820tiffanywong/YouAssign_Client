import { gql } from '@apollo/client'

export const CREATE_SKILL = gql`
    mutation Mutation($input: [SkillCreateInput!]!) {
        createSkills(input: $input) {
            skills {
                title
                img_src
                description
                date_added
            }
        }
    }
`;