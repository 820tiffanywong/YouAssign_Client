import { gql } from "@apollo/client";

export const GET_TIMESTAMP = gql`
    query Query($where: TimestampWhere) {
        timestamps(where: $where) {
            date
            id
            description
            hours_logged
            user {
                first
                last
                email
            }
            project {
                title
                id
            }
        }
    }
`