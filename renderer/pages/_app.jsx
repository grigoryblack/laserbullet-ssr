import { ConfigProvider } from 'antd';
import "./global.scss"
const themeConfig = {
    token: {
        colorPrimary: '#E0282E',
        borderRadius: 2,
        colorBgContainer: '#FFBDBF',
    },
};

export default function MyApp({ Component, pageProps }) {
    return (
        <ConfigProvider theme={themeConfig}>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
