# Custom Icons [Menu and Direct Use]

### Description
Versions downloaded after 2023/12/10 can be used, please upgrade previous versions yourself

### Usage
Taking the file `web/assets/icons/customer-gva.svg` as an example,

Just put the svg file into the frontend web/assets/icons/ directory to automatically register, then select to use in menu configuration or directly use the tag `<customer-gva></customer-gva>` to use

SVG files cannot have width and height, if you need automatic color adaptation, add `fill="currentColor"` attribute in the svg file, if using specific color svg, fill the fill yourself

> Implementation code
> /web/core/global.js
```javascript

const createIconComponent = (svgContent) => ({
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
    },
    render() {
        const { className } = this
        return h('span', {
            class: className,
            ariaHidden: true,
            innerHTML: svgContent,
        })
    },
})

const registerIcons = async(app) => {
    const iconModules = import.meta.glob('@/assets/icons/**/*.svg')
    for (const path in iconModules) {
        const response = await fetch(path)
        const svgContent = await response.text()
        const iconName = path.split('/').pop().replace(/\.svg$/, '')
        const iconComponent = createIconComponent(svgContent)
        config.logs.push({
            'key': iconName,
            'label': iconName,
        })
        app.component(iconName, iconComponent)
    }
}

```
