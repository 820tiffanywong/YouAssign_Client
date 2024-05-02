import { gql } from "@apollo/client";

export const DISCONNECT_USER_FROM_PROJECT = gql`
    mutation Mutation($where: ProjectWhere, $disconnect: ProjectDisconnectInput) {
        updateProjects(where: $where, disconnect: $disconnect) {
            projects {
                id
            }
        }
    }
`;