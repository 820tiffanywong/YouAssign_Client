import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
    mutation Mutation($where: ProjectWhere, $update: ProjectUpdateInput, $disconnect: ProjectDisconnectInput) {
        updateProjects(where: $where, update: $update, disconnect: $disconnect) {
            projects {
                title
            }
        }
    }
`;
/*
{
    where: {
        id: null
    },
    update: {
        title: null,
        description: null,
        skills_required: [{
            connect: [
            {
                where: {
                node: {
                    id_IN: null
                }
                }
            }
            ]
        }],
        clients: [{
            connect: [{
                where: {
                    node: null
                }
            }]
        }],
        employees: [{
            connect: [{
                where: {
                    node: {
                        email: null
                    }
                },
                edge: {
                    date_assigned: null,
                    role: null
                }
            }]
        }]
    }
}
*/