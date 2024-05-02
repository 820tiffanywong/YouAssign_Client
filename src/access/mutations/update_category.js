import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategories($where: CategoryWhere, $update: CategoryUpdateInput) {
        updateCategories(where: $where, update: $update) {
            categories {
                title
                color
            }
        }
    }
`;