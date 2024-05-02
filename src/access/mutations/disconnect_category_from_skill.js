import { gql } from "@apollo/client";

export const DISCONNECT_CATEGORY_FROM_SKILL = gql`
    mutation Mutation($disconnect: CategoryDisconnectInput, $where: CategoryWhere) {
        updateCategories(disconnect: $disconnect, where: $where) {
            categories {
                title
                color
                skills {
                    title
                }
            }
        }
    }
`;