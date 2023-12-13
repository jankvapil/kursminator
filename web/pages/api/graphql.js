import httpProxy from "http-proxy";
import { GRAPHQL_API } from '@/core/config'

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default (req, res) =>
  new Promise((resolve, reject) => {
    const proxy = httpProxy.createProxy();
    proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
      changeOrigin: true,
      target: GRAPHQL_API,
    });
  });