import React from 'react';
import ReactDOM from 'react-dom';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import PageChange from 'components/PageChange/PageChange.js';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'styles/tailwind.css';
import 'styles/global.css';
import { getCookie } from 'utils/cookie';
import AuthService from 'services/auth.service';

Router.events.on('routeChangeStart', () => {
  ReactDOM.render(
    <PageChange loading={true} />,
    document.getElementById('page-transition'),
  );
});

Router.events.on('routeChangeComplete', () => {
	ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
});

Router.events.on('routeChangeError', () => {
	ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
});

export default class MyApp extends App {
  componentDidMount() {}

  static async getInitialProps({ Component, router, ctx }) {
    const token = getCookie('mctoken', ctx);
    const user = getCookie('mcuser', ctx);
    const group = getCookie('mcgroups', ctx);
    const groupList = group?.split(',');

    const protected_routes = [
      '/',
      '/analytics',
      '/offline-online-devices',
      '/machine-data',
      '/parameter-data',
    ];

    const { res } = ctx;
    if (
      protected_routes.includes(router?.pathname) &&
      (!token || !user || !group)
    ) {
      res.setHeader('set-cookie', [
        'mctoken=; max-age=0;',
        'mcuser=; max-age=0;',
        'mcgroups=; max-age=0;',
      ]);

      res.writeHead(302, { Location: '/login' });
      res.end();
      return {};
    }
    if (
      !groupList?.includes('Maintainer') &&
      router.pathname == `/parameter-data`
    ) {
      res.writeHead(302, { Location: '/404' });
      res.end();
      return {};
    }

		let pageProps = {};
		pageProps.token = token;

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		const Layout = Component.layout || (({ children }) => <>{children}</>);
		return (
			<React.Fragment>
				{console.log('pageProps?.token=',pageProps?.token)}
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
}
