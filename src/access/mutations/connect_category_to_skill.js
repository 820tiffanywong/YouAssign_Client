import { gql } from "@apollo/client";

export const CONNECT_CATEGORY_TO_SKILL = gql`
    mutation Mutation($connect: CategoryConnectInput, $where: CategoryWhere) {
        updateCategories(connect: $connect, where: $where) {
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