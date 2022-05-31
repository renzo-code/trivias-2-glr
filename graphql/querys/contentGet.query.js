import { gql } from "@apollo/client"

export const QUERY_CONTENT_GET = gql`
  query {
    get(site_id: "larepublica", category_id: "5f37fa1dc6ad3847057b6af2") {
      _id
      name
      data {
        body
        categories {
          _id
          name
          type
          slug
          primary
        }
        multimedia {
          path
          type
          subtype
          data {
            title
            alt
            credits
            source
            type_video
            image_path
            embed
          }
        }
      }
      questions {
        count
      }
    }
  }
`
