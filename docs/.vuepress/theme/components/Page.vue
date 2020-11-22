<template>
  <main class="page">
    <slot name="top"/>

    <Content class="markdown-content"/>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <router-link
          v-if="prev"
          class="prev"
          :to="prev.path"
        >
          ← <span v-text="prev.title || prev.path" />
        </router-link>

        <router-link
          v-if="next"
          class="next"
          :to="next.path"
        >
          {{ next.title || next.path }} →
        </router-link>
      </p>
    </div>

    <slot name="bottom"/>
  </main>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from '../util'

export default {
  props: ['sidebarItems'],

  computed: {
    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, this.$page.relativePath)
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '')
           + `/src`
           + `/${docsBranch}/`
           + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
           + path
           + `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/edit`
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}

</script>

<style lang="scss">
@import '@theme/styles/config.scss';
@import '@theme/styles/wrapper.scss';

.page {
  margin-top: 57px;
  padding: 1px 0 2rem $sidebarWidth;
  display: block;
  margin-left: 10px;
  margin-right: 10px;

  @media (max-width: $MQNarrow) {
    padding-left: $mobileSidebarWidth;
  }

  @media (max-width: $MQMobile) {
    padding-left: 0;
  }

  .theme-container.no-sidebar & {
    @media (min-width: $MQMobile + 1px) {
      padding-left: 0;
    }
  }

  .toc-page & .markdown-content h1:first-child {
    margin-top: 3rem;
  }


  .markdown-content {
    max-width: none;
    margin-left: -10px;
    margin-right: $sidebarWidth - 20px;
    padding-left: 0;
    padding-right: 0;

    @media (max-width: $MQMobile) {
      margin-right: -10px; 
    }

    h3,
    p {
      text-align: justify;
      text-align-last: center;
      max-width: $contentWidth;
      margin-left: auto;
      margin-right: auto;

      @media (max-width: $MQMobile) {
        margin-left: 25px;
        margin-right: 25px;
      }
    }

    hr,
    h5 {
      & + p,
      & + p + p,
      & + p + p + p,
      & + p + p + p + p {
        text-align: left;
        text-align-last: left;
        width: calc(25% - 20px);
        float: left;
        margin-left: 10px;
        margin-right: 10px;

        @media (max-width: $MQMobile) {
          float: none;
          width: auto;
          margin-left: 25px;
          margin-right: 25px;
        }

        &::before {
          @media (max-width: $MQMobile) {
            display: table;
            margin-bottom: 5px;
            color: lighten(desaturate($accentColor, 30%), 20%);
            border: 1px solid $borderColor;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 0px 4px;
          }
        }
      }

      & + p::before {
        @media (max-width: $MQMobile) {
          content: 'Pāli';
        }
      }

      & + p + p::before {
        @media (max-width: $MQMobile) {
          content: 'Eng';
        }
      }

      & + p + p + p::before {
        @media (max-width: $MQMobile) {
          content: '白';
        }
      }

      & + p + p + p + p::before {
        @media (max-width: $MQMobile) {
          content: '文';
        }
      }
    }

    h1 {
      font-size: 1.3rem;
      font-weight: 400;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      clear: both;

      @media (max-width: $MQMobile) {
        margin-left: 25px;
        margin-right: 25px;
      }

      &:first-child {
        margin-top: 1rem;
      }
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 400;
      text-align: center;

      a.header-anchor {
        float: none;
      }
    }

    h5 {
      margin-left: 10px;
      margin-bottom: 0;

      @media (max-width: $MQMobile) {
        margin-left: 25px;
        margin-right: 25px;
      }
    }

    p {
      a {
        color: $textColor;
        font-weight: 400;
        border-bottom: 1px solid $darkborderColor;
        transition: border-bottom-color 0.15s ease-in-out;

        &:hover {
          border-bottom: 1px solid $accentColor;
        }
      }
    }

    hr {
      display: block;
      clear: both;
    }

    h3 + hr {
      margin-top: 1rem;
    }

    .no-sidebar & {
      margin-right: -10px;
    }
  }

  .icon.outbound {
    color: $accentColor;
  }
}

.page-nav {
  // @extend .wrapper;
  width: calc(100% + 20px);
  margin-left: -10px;
  margin-right: -10px;
  padding-top: 1rem;
  padding-bottom: 0;
  clear: both;

  @media (max-width: $MQMobile) {
    width: calc(100% + 20px);
  }

  .inner {
    text-align: left;
    max-width: none;
    min-height: 2rem;
    margin-top: 0;
    margin-right: 66px;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float

    @media (max-width: $MQMobile) {
      margin-right: 0;
    }

    a {
      color: $textColor;
      border-bottom: 1px solid $darkborderColor;
      transition: border-bottom-color 0.15s ease-in-out;

      &:hover {
        border-bottom: 1px solid $accentColor;
      }

      &.prev {
        margin-left: 10px;

        @media (max-width: $MQMobile) {
          margin-left: 25px;
        }
      }

      &.next {
        float: right;

        @media (max-width: $MQMobile) {
          margin-right: 25px;
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: .5rem;
    }

    .last-updated {
      font-size: .8em;
      float: none;
      text-align: left;
    }
  }
}


a.sidebar-link {
  display: none;
}

.dn {
  .sidebar-link[href^="/dn"] {
    display: inline-block;
  }
}

.mn {
  .sidebar-link[href^="/mn"] {
    display: inline-block;
  }
}

.sn {
  .sidebar-link[href^="/sn"] {
    display: inline-block;
  }
}

.an {
  .sidebar-link[href^="/an"] {
    display: inline-block;
  }
}

.toc-page {
  h5 {
    height: 0;
    overflow: hidden;
  }

  .page-nav {
    display: none;
  }

  hr,
  .page h3 + hr {
    margin-top: 60px;

    @media (max-width: $MQMobile) {
      margin-top: 30px;
    }
  }
}
</style>
