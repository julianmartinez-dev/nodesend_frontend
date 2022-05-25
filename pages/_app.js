import '../styles/globals.css';
import Layout from '../components/Layout';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <AppState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppState>
    </AuthState>
  );
}

export default MyApp;
