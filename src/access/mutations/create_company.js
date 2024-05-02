import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
    mutation Mutation($input: [CompanyCreateInput!]!) {
        createCompanies(input: $input) {
            companies {
                id
            }
        }
    }
`