import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export { getStructuredData, pageMetadata } from './seo.ts';

export function render(pathname = '/') {
  return renderToString(<App pathname={pathname} />);
}