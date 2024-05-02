import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
    mutation CreateProjects($input: [ProjectCreateInput!]!) {
        createCategories(input: $input) {
            project {
                title
                description
            }
        }
    }
`;