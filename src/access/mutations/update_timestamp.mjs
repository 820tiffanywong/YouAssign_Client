import { gql } from "@apollo/client";


export const UPDATE_TIMESTAMP = gql`
    mutation Mutation($where: TimestampWhere, $update: TimestampUpdateInput) {
        updateTimestamps(where: $where, update: $update) {
            timestamps {
                hours_logged
                description
            }
        }
    }
`