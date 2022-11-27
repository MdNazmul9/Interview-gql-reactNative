import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query getLocations {
    categories(first: 100) {
      edges {
        node {
          id
          name
          subcategories {
            edges {
              node {
                id
                name
                subsubcategories {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return data.categories.edges.map((category) => (
    <div key={category.node.id}>
      {category.node.name}
      <input type="checkbox" id={category.node.id} name={category.node.name} value={category.node.id}></input>

      {category.node.subcategories.edges.map((subcat) => (
        <div key={subcat.node.id}>
          <ul>
            {subcat.node.name}
            <input type="checkbox" id={subcat.node.id} name={subcat.node.name} value={subcat.node.id}></input>

            {subcat.node.subsubcategories.edges.map((subsubcat) => (
              <div key={subsubcat.node.id}>
                <ul>{subsubcat.node.name}
                <input type="checkbox" id={subsubcat.node.id} name={subsubcat.node.name} value={subsubcat.node.id}></input>
                
                </ul>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ));
}

export default function App() {
  return (
    <div>
      <h2>
        {/* My first Apollo app */}
        Ehsan Marketing API test
       
        <span role="img" aria-label="rocket">
          🚀
        </span>
        <br />
        Candidate ID: 123456
      </h2>
      <br />
      <DisplayLocations />
    </div>
  );
}
