import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Users($where: UserWhere) {
    users(where: $where) {
      first
      last
      slug
      email
      position
      date_joined
      bio
      img
      roles {
        title
        permissions {
          id
          name
          access
          resource
        }
      }
      projects {
        title
        description
        id
        skills_required {
          id
          title
          img_src
        }
      }
      skillsConnection {
        edges {
          node {
            title
            img_src
            categories {
              title
              color
            }
          }
          rating
          description
          isShowcased
        }
      }
      companies {
        id
        name
        logo
      }
    }
  }
`;
/*
{
  "where": {
    "email": "devinobrien@me.com"
  }
}
*/
