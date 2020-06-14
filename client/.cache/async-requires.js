// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-tsx": () => import("./../src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-blog-tsx": () => import("./../src/pages/blog.tsx" /* webpackChunkName: "component---src-pages-blog-tsx" */),
  "component---src-pages-contact-tsx": () => import("./../src/pages/contact.tsx" /* webpackChunkName: "component---src-pages-contact-tsx" */),
  "component---src-pages-index-tsx": () => import("./../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-pages-resume-tsx": () => import("./../src/pages/resume.tsx" /* webpackChunkName: "component---src-pages-resume-tsx" */),
  "component---src-templates-blog-post-index-js": () => import("./../src/templates/BlogPost/index.js" /* webpackChunkName: "component---src-templates-blog-post-index-js" */)
}

