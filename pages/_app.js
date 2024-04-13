//import "@/styles/globals.css";
import '@/styles/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard';
import { getToken } from '@/lib/authenticate';

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
    <SWRConfig value={{
      fetcher:
      async url => {
      const res = await fetch(url,{headers: { Authorization: `JWT ${getToken()}` }})
      // If the status code is not in the range 200-299,
      // we still try to parse and throw it.
      if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
      }
      return res.json()
      }
     }}>
      <Layout>
  <Component {...pageProps} />
  </Layout>
  </SWRConfig>
  </RouteGuard>
  
  );
}
