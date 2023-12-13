import httpProxyMiddleware from "next-http-proxy-middleware";
import { GRAPHQL_API } from '@/core/config'

export default (req, res) =>
  httpProxyMiddleware(req, res, {
    target: GRAPHQL_API,
    changeOrigin: true,
  });
