
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'corleon-form-builder/out/index.css';
import { FormProvider } from '@/src/config';

const App = ({ Component, pageProps }: AppProps) => (
    <FormProvider>
        <Component {...pageProps} />
    </FormProvider>
)
export default App;