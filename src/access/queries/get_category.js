import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
    query Query($where: CategoryWhere) {
        categories(where: $where) {
            title
            color
            skills {
                title
                img_src
                users {
                    first
                    last
                    img
                    email
                  }
            }
            skillsAggregate {
                count
            }
        }
    }
`;