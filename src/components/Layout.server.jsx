// The `useShopQuery` hook makes server-only GraphQL queries to the Storefront API.
import {useShopQuery, Link} from '@shopify/hydrogen';
// Import `gql` to parse GraphQL queries.
import gql from 'graphql-tag';
// The `Layout` component accepts `children` as a prop. This injects any nested components into the layout when you call it.
export default function Layout({children}) {
  // Your shop domain and token are automatically configured, so you only need to pass in a GraphQL query.
  const {data} = useShopQuery({
    query: QUERY,
  });

  // Return JSX with the Tailwind classes that determine the layout styling.
  return (
    <div>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <header className="my-10 text-center">
        <h1 className="font-bold uppercase tracking-wider text-2x-l">
          <Link to="/">{data.shop.name}</Link>
        </h1>
      </header>
      <main id="mainContent" className="mx-auto max-w-7xl p-4 md:py-5 md:px-8">
        {children}
      </main>
    </div>
  );
}
// The GraphQL query used to fetch shop data.
const QUERY = gql`
  query ShopNameQuery {
    shop {
      name
    }
  }
`;
