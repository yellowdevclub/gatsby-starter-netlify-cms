import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";

import config from "../data/site-config";


class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    return this.props.postEdges.map(postEdge => {
      return {
        path: `/entry${postEdge.node.frontmatter.path}`,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      };
    });
  }

  render() {
    const postList = this.getPostList();
    return (
      <section>
        <h2>カテゴリー一覧</h2>

        <ul className="categories">
          postList.map(post =>
            <li key={post.title}>
              <Link to={post.path}>
                {post.title}
              </Link>
            </li>
          )}
        </ul>
      </section>
    );
  }
}


export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.category;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <section className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
        <PostListing postEdges={postEdges} />
      </section>
    );
  }
}


export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            path
          }
        }
      }
    }
  }
`
