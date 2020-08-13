import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
// import Posts from 'components/Posts';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';

const BlogPage: React.FC = () => {
  return (
    // <Layout>
    //   <SEO title="Blog" />
    //   <Posts />
    // </Layout>
    <Layout>
      <SEO title="404: Not found" />
      <Container section>
        <TitleSection title="404" subtitle="Page not found" center />
        <p className="mt-4 text-center w-full">You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Container>
    </Layout>
  );
};

export default BlogPage;
