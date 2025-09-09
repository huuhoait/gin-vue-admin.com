import {defineConfig} from 'vitepress'

const lang = 'zh-CN'
const ogDescription = 'The automated code development scaffolding written by gin+vue is the best project for full stack learning of gin+vue. Tencent Alibaba development uses gin-vue-admin as a model for related business development, code automation, speed up development speed, complete permission systems, and reduce duplicate work';
const ogImage = 'https://www.gin-vue-admin.com/logo.png';
const ogTitle = ogDescription;
const ogUrl = 'https://www.gin-vue-admin.com'

// const ITEMS = {
//   project: [
//     { text: '开发 SDK', link: '/project/sdk' },
//     { text: '开源插件', link: '/project/plugins' },
//     { text: '实用工具', link: '/project/tools' },
//   ]
// }

export default defineConfig({
    base: '/gin-vue-admin.com/',
    title: 'Gin-Vue-Admin',
    description: ogDescription,
    lang,
    lastUpdated: false,
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:title', content: 'gin-vue-admin'}],
        ['meta', {property: 'og:image', content: ogImage}],
        ['meta', {property: 'og:url', content: ogUrl}],
        ['meta', {property: 'twitter:description', content: ogDescription}],
        ['meta', {property: 'twitter:title', content: ogTitle}],
        ['meta', {property: 'twitter:card', content: 'summary_large_image'}],
        ['meta', {property: 'twitter:image', content: ogImage}],
        ['meta', {property: 'twitter:url', content: ogUrl}],
        [
            'script',
            {
                src: 'https://hm.baidu.com/hm.js?40635ef25e31fa2a58ed58f935d0a1a0',
            },
        ],
        [
            'script',
            {
                src: 'https://cdn.wwads.cn/js/makemoney.js',
                async: "true",
            },
        ],
    ],

    themeConfig: {
        logo: '/logo.png',

        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: 'Search Documentation',
                                buttonAriaLabel: 'Search Documentation'
                            },
                            modal: {
                                noResultsText: 'No relevant results found',
                                resetButtonTitle: 'Clear search criteria',
                                footer: {
                                    selectText: 'Select',
                                    navigateText: 'Navigate',
                                    closeText: 'Close'
                                }
                            }
                        }
                    }
                },
                miniSearch: {
                    searchOptions: {
                        combineWith: 'AND',
                        fuzzy: 0.2,
                        prefix: true,
                        boost: { title: 4, text: 2, titles: 1 }
                    }
                }
            }
        },

        editLink: {
            pattern: 'https://github.com/flipped-aurora/gin-vue-admin.com/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/huuhoait/gin-vue-admin.com'},
            
        ],

        footer: {
            message: `Copyright © 2020-${new Date().getFullYear()} Flipped-aurora Open Source Community`,
            copyright: `<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备17040210号-2</a>`
        },


        nav: [
            {
                text: '🚀 Guide',
                items: [
                    {text: 'Project Introduction', link: '/guide/introduce/project'},
                    {text: 'Quick Start', link: '/guide/start-quickly/initialization'},
                    {text: 'AI Assistant Integration', link: '/guide/server/mcp'},
                    {text: 'Project Deployment', link: '/guide/deployment/'},
                    {text: 'Change Log', link: 'https://flipped-aurora.feishu.cn/docx/LPufdOPWxo3zcpxNSVGcr1vcn71?from=from_copylink'},
                ],
            },
            {
                text: '📚︎ Copyright',
                link: '/copyright.pdf',
                target: '_blank'
            },
            {
                text: '🎁 Donate',
                link: '/coffee/index'
            },
            {
                text: '💰 Purchase License',
                link: 'https://plugin.gin-vue-admin.com/license'
            },
            {
                text: '✨ Plugin Market',
                link: 'https://plugin.gin-vue-admin.com/#/layout/home'
            },
            {
                text: '⛓ Experience Project',
                items: [
                    {text: 'Online Demo', link: 'https://demo.gin-vue-admin.com'},
                    {text: 'Docker Playground', link: '/experience/docker-playground'},
                    {text: 'docker-compose', link: '/experience/docker-compose'},
                ],
            },
            {
                text: '🎉 About Us',
                link: '/about/join',
            },

        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    collapsed: false,
                    items: [
                        {
                            text: 'Project Introduction',
                            link: '/guide/introduce/project'
                        }
                    ]
                },
                {
                    text: 'Quick Start',
                    collapsed: true,
                    items: [
                        {
                            text: 'Environment Configuration',
                            link: '/guide/start-quickly/env'
                        },
                        {
                            text: 'Initialization',
                            link: '/guide/start-quickly/initialization'
                        },
                        {
                            text: 'AI Assistant Configuration',
                            link: '/guide/server/mcp'
                        },
                        {
                            text: 'Swagger',
                            link: '/guide/start-quickly/swagger'
                        },
                        {
                            text: 'VS Code',
                            link: '/guide/start-quickly/vscode'
                        },
                        {
                            text: 'Common Issues',
                            link: '/guide/manual/qa'
                        }
                    ]
                },
                {
                    text: 'Code Generator',
                    collapsed: true,
                    items: [
                        {
                            text: 'Automated Package',
                            link: '/guide/generator/package',
                        },
                        {
                            text: 'Code Generator Usage Guide',
                            link: '/guide/generator/server',
                        },
                        {
                            text: 'Form Generator `127.0.0.1` Connection Refused',
                            link: '/guide/generator/web',
                        },
                        {
                            text: 'Form Generator Production Usage Guide',
                            link: '/guide/generator/web-produce',
                        },
                    ]
                },
                {
                    text: 'Frontend Project Guide',
                    collapsed: true,
                    items: [
                        {
                            text: 'Frontend Guide',
                            link: '/guide/web/'
                        },
                        {
                            text: 'Environment Variables',
                            link: '/guide/web/env',
                        },
                        {
                            text: 'Button Permissions',
                            link: '/guide/web/button-auth'
                        },
												{
														text: 'Dictionary Methods',
                            link: '/guide/web/dictionary'
												},
                        {
                            text: 'Custom Global Theme',
                            link: '/guide/web/menu-theme'
                        },
                        {
                            text:'Custom Icons [Menu and Direct Use]',
                            link: '/guide/web/auto-icon'
                        },
                        {
                            text: 'Enable TypeScript',
                            link: '/guide/web/typescript',
                        },
                        {
                            text: 'Export Excel',
                            link: '/guide/web/export-excel',
                        },
                        {
                            text: 'Development Guide Documentation',
                            link: 'https://www.gin-vue-admin.com/empower/index.html'
                        }
                    ]
                },
                {
                    text: 'Backend Project Guide',
                    collapsed: true,
                    items: [
                        {
                            text: 'Backend Guide',
                            link: '/guide/server/'
                        },
                        {
                            text: 'Configuration Files',
                            link: '/guide/server/config'
                        },
                        {
                            text: 'Authentication System',
                            link: '/guide/server/authentication'
                        },
                        {
                            text: 'Authorization System',
                            link: '/guide/server/authorization'
                        },
                        {
                            text: 'Code Generator',
                            link: '/guide/server/code-generator'
                        },
                        {
                            text: 'Object Storage',
                            link: '/guide/server/oss'
                        },
                        {
                            text: 'Multi-Database Support',
                            link: '/guide/server/multiple-databases'
                        },
                        {
                            text: 'Strict Role Mode',
                            link: '/guide/server/strict-auth'
                        },
                        {
                            text: 'Viper',
                            link: '/guide/server/core/viper'
                        },
                        {
                            text: 'Zap',
                            link: '/guide/server/core/zap'
                        },
                        {
                            text: 'GORM',
                            link: '/guide/server/gorm'
                        },
                        {
                            text: 'Scheduled Tasks',
                            link: '/guide/server/timer'
                        },
                        {
                            text: 'MCP AI Assistant Integration',
                            link: '/guide/server/mcp'
                        },
                        {
                            text: 'Database Design',
                            link: '/guide/server/database-design'
                        },
                        {
                            text: 'Development Guide Documentation',
                            link: 'https://www.gin-vue-admin.com/empower/index.html'
                        }
                    ]
                },
                {
                    text: 'Best Practices',
                    collapsed: false,
                    items: [
                        {
                            text: 'Development Standards Guide',
                            link: '/guide/best-practices/development-standards'
                        }
                    ]
                },
                {
                    text: 'Troubleshooting',
                    collapsed: false,
                    items: [
                        {
                            text: 'Frequently Asked Questions',
                            link: '/guide/troubleshooting/common-issues'
                        }
                    ]
                },
                {
                    text: 'Plugin Usage Tutorial',
                    collapsed: true,
                    items: [
                        {
                            text: 'Plugin Installation Tutorial',
                            link: '/guide/plugin/install'
                        },
                        {
                            text: 'Plugin Development Tutorial',
                            link: '/guide/plugin/develop'
                        },
                    ]
                },
                {
                    text: 'Deployment Guide',
                    collapsed: true,
                    items: [
                        {
                            text: 'Project Deployment',
                            link: '/guide/deployment/'
                        },
                        {
                            text: 'Docker',
                            link: '/guide/deployment/docker'
                        },
                        {
                            text: 'Docker Compose',
                            link: '/guide/deployment/docker-compose'
                        },
                        {
                            text: 'Kubernetes',
                            link: '/guide/deployment/k8s'
                        },
                        {
                            text: 'Production Environment Deployment',
                            link: '/guide/deployment/production'
                        },
                        {
                            text: 'Detailed Deployment Guide',
                            link: 'https://www.gin-vue-admin.com/empower/index.html'
                        }
                    ]
                },
                {
                    text: 'Video Tutorials',
                    collapsed: true,
                    items: [
                        {
                            text: 'Go Tutorial',
                            link: '/guide/video/golang'
                        },
                        {
                            text: 'Gin Tutorial',
                            link: '/guide/video/gin'
                        },
                        {
                            text: 'GORM Tutorial',
                            link: '/guide/video/gorm'
                        },
                        {
                            text: 'Server Project Tutorial',
                            link: '/guide/video/server'
                        },
                        {
                            text: 'Web Project Tutorial',
                            link: '/guide/video/web'
                        },
                    ]
                }
            ],
            '/experience/': [
                {
                    text: 'Experience Project',
                    collapsed: false,
                    items: [
                        {
                            text: 'Online Demo',
                            link: '/experience/online'
                        },
                        {
                            text: 'Docker Playground',
                            link: '/experience/docker-playground'
                        },
                        {
                            text: 'Docker Compose',
                            link: '/experience/docker-compose'
                        }
                    ]
                },
            ],
            '/study/': [
                {
                    text: 'Learning',
                    items: [
                        {text: 'Related Sites', link: '/study/'}
                    ]
                },
                {
                    text: 'Object Storage Plugins',
                    items: [
                        {text: 'Alibaba Cloud Object Storage', link: '/study/aliyun'},
                        {text: 'Tencent Object Storage', link: '/study/tencent'},
                        {text: 'Qiniu Cloud Object Storage', link: '/study/qiniu'},
                    ]
                }
            ],
        }
    }
})
