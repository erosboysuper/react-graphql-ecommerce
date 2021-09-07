const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const languageFlags = {
  en: 'us',
  de: 'de',
  'en-CH': 'ch-en',
}

// Generate slug field for all markdown files
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const roomPages = await (
    await fetch(`${process.env.API_BASE}/roomList`)
  ).json()
  const { createPage } = actions
  return graphql(`
    {
      contentPages: allDatoCmsContentPage {
        edges {
          node {
            locale
            handle
          }
        }
      }
      allDatoCmsProduct(filter: { isPublished: { eq: true } }) {
        edges {
          node {
            locale
            handle
          }
        }
      }
      allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            locale
            handle
          }
        }
      }
      allDatoCmsBlog(
        filter: { isPublished: { eq: true } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            locale
            handle
          }
        }
      }
      allDatoCmsLandingPage(filter: { isPublished: { eq: true } }) {
        edges {
          node {
            locale
            handle
          }
        }
      }
      allDatoCmsMultiProductLandingPage(filter: { isPublished: { eq: true } }) {
        edges {
          node {
            locale
            handle
          }
        }
      }
      allDatoCmsSignupLandingPage(filter: { isPublished: { eq: true } }) {
        edges {
          node {
            locale
            handle
          }
        }
      }
    }
  `).then(result => {
    // PRODUCT DETAIL PAGE //
    result.data.allDatoCmsProduct.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/${localeFolder}/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })

    // COLLECTION PAGE //
    result.data.allDatoCmsCollectionPage.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/${localeFolder}/${node.handle}/`,
        component: path.resolve(`./src/templates/CollectionPage/index.js`),
        context: {
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })

    // BLOG PAGE //
    result.data.allDatoCmsBlog.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/${localeFolder}/blog/${node.handle}/`,
        component: path.resolve(`./src/templates/BlogPage/index.js`),
        context: {
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })

    // CONTANT PAGE //
    result.data.contentPages.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/${localeFolder}/${node.handle}/`,
        component: path.resolve(`./src/templates/ContentPage/index.js`),
        context: {
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })

    // LANDING PAGE //
    result.data.allDatoCmsLandingPage.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/${localeFolder}/${node.handle}/`,
        component: path.resolve(`./src/templates/LandingPage/index.js`),
        context: {
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })

    // ROOM PAGE //
    roomPages.forEach(room => {
      createPage({
        path: '/room/' + room.slug,
        component: path.resolve(`./src/pages/room.js`),
        context: {
          slug: room.slug,
          title: room.title,
        },
      })
    })

    // New Landing Pages
    result.data.allDatoCmsSignupLandingPage.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/${node.handle}/`,
        component: path.resolve(`./src/templates/NewLandingPage/index.js`),
        context: {
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })

    // New Landing Pages
    result.data.allDatoCmsMultiProductLandingPage.edges.forEach(({ node }) => {
      const localeFolder = languageFlags[node.locale] || ''
      createPage({
        path: `/offer/${node.handle}/`,
        component: path.resolve(`./src/templates/NewOfferPage/index.js`),
        context: {
          handle: node.handle,
          locale: `${node.locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const deletePages = [
    '/',
    '/about/',
    '/blog/',
    '/cart/',
    '/discount/',
    '/reviews/',
    '/size-chart/',
    '/tbo-difference/',
    '/commitment/',
    '/quick-links/',
  ]
  const ignorePages = [
    '/404/',
    '/community/',
    '/room/',
    '/profile/',
    '/reset-password/',
    '/survey/',
  ]
  if (deletePages.indexOf(page.path) !== -1) {
    deletePage(page)
  }
  if (page.path.match(/^\/discount/)) {
    Object.keys(languageFlags).forEach(locale => {
      const localeFolder = languageFlags[locale] || ''
      createPage({
        path: `/${localeFolder}/discount`,
        matchPath: `/${localeFolder}/discount/:coupon`,
        component: path.resolve(`./src/pages/discount.js`),
        context: {
          locale: `${locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })
  } else if (page.path.match(/^\/room/)) {
    createPage({
      path: `/room`,
      matchPath: `/room/:room_slug`,
      component: path.resolve(`./src/pages/room.js`),
      context: {
        locale: `en`,
        localeFolder: `us`,
      },
    })
  } else if (page.path.match(/^\/survey/)) {
    createPage({
      path: `/survey`,
      matchPath: `/survey/:id`,
      component: path.resolve(`./src/pages/survey.js`),
      context: {
        locale: `en`,
        localeFolder: `us`,
      },
    })
  } else if (ignorePages.indexOf(page.path) === -1) {
    Object.keys(languageFlags).forEach(locale => {
      const localeFolder = languageFlags[locale] || ''
      createPage({
        path: `/${localeFolder}${page.path}`,
        matchPath: `/${localeFolder}${page.path}`,
        component: `${page.component}`,
        context: {
          locale: `${locale}`,
          localeFolder: `${localeFolder}`,
        },
      })
    })
  }
}
