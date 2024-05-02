import { gql } from "@apollo/client";

export const GET_ROLES = gql`
    query Query {
        roles {
            title
            permissions {
                name
                access
                resource
                id
            }
            users {
                first
                last
                img
                email
            }
        }
    }
`;