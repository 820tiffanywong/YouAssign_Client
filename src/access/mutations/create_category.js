import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
    mutation CreateCategories($input: [CategoryCreateInput!]!) {
        createCategories(input: $input) {
            categories {
                title
                color
            }
        }
    }
`;