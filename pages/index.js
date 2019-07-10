import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0, fontFamily: "Lato" }}>
      <header style={{ background: "#444", color: "white", padding: 20 }}>
        <h1 style={{ fontWeight: "normal", fontSize: 18, margin: 0 }}>
          My Delightful, Debuggable Page
        </h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/b">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/b">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/b">
              <a>Products</a>
            </Link>
          </li>
          <li>
            <Link href="/b">
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <Link href="/b">
              <a>Help</a>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

HomePage.getInitialProps = async ctx => {
  const { fetch = global.fetch } = ctx;

  await fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2");

  await fetch("https://graphbrainz.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
query IntrospectionQuery {
 __schema {
   queryType { name }
   mutationType { name }
   subscriptionType { name }
   types {
     ...FullType
   }
   directives {
     name
     description
     locations
     args {
       ...InputValue
     }
   }
 }
}

fragment FullType on __Type {
 kind
 name
 description
 fields(includeDeprecated: true) {
   name
   description
   args {
     ...InputValue
   }
   type {
     ...TypeRef
   }
   isDeprecated
   deprecationReason
 }
 inputFields {
   ...InputValue
 }
 interfaces {
   ...TypeRef
 }
 enumValues(includeDeprecated: true) {
   name
   description
   isDeprecated
   deprecationReason
 }
 possibleTypes {
   ...TypeRef
 }
}

fragment InputValue on __InputValue {
 name
 description
 type { ...TypeRef }
 defaultValue
}

fragment TypeRef on __Type {
 kind
 name
 ofType {
   kind
   name
   ofType {
     kind
     name
     ofType {
       kind
       name
       ofType {
         kind
         name
         ofType {
           kind
           name
           ofType {
             kind
             name
             ofType {
               kind
               name
             }
           }
         }
       }
     }
   }
 }
}
`
    })
  });

  return {};
};
