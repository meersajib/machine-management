import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'styles/tailwind.css';
import 'styles/global.css';

// Router.events.on('routeChangeStart', () => {
//   ReactDOM.render(
//     <PageChange loading={true} />,
//     document.getElementById('page-transition'),
//   );
// });

// Router.events.on('routeChangeComplete', () => {
// 	ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
// });

// Router.events.on('routeChangeError', () => {
// 	ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
// });


// import App from 'next/app'

function MyApp({ Component, pageProps }) {
	const Layout = Component.layout || (({ children }) => <>{children}</>);
		return (
			<React.Fragment>
				<Head>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1, shrink-to-fit=no'
					/>
					<title>Machine Management</title>
				</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>

			</React.Fragment>
		);
}

export default MyApp
