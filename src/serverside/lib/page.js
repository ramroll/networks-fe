function render(node, renderAs = 'dom', path =[] ){
  const {name, props, style, children} = node
  if(renderAs === 'dom') {
    const element = document.createElement(name)
    if(props && props.onClick) {
      element.addEventListener('click', props.onClick)
    }

    if(style) {
      Object.keys(style).forEach(key => {
        element.style[key] = style[key]
      }) 
    }

    if(typeof children === 'string') {
      element.innerHTML = children
    } else if(Array.isArray(children)){
      children.forEach( (child, i) => {
        element.appendChild(
          render(child,  renderAs, path.concat(i))
        )
      })
    } else {
      throw "invalid children"
    }
    return element
  } else if(renderAs === 'html') {

    let styles = [] 
    if(style) {
      styles = Object.keys(style)
        .map(key => {
          const k = key.replace(/([A-Z])/, m => '-' + m.toLowerCase())
          const val = style[key]
          return `${k}=${val}`
        })
    }
    const styleString = styles.join(';')
    let childrenStr = ''
    if(typeof children === 'string') {
      childrenStr = children
    } else {
      childrenStr = children
        .map((child, i) =>
          render(child, renderAs, path.concat(i) )
        )
        .join("")
    }
    return `<${name} id='node-${path.join('-')}' style='${styleString}'>${childrenStr}</${name}>`
  } else if(renderAs === 'rehydrate') {

    if(props && props.onClick){
      document.getElementById('node-' + path.join('-'))     
        .addEventListener('click', props.onClick)
    }

    if(Array.isArray(children)) {
      children.forEach( (child, i) => {
        render(child,  renderAs, path.concat(i))
      })
    }

  }

}

const element = render({
  name : 'div',
  props : {
    onClick : () => {
      window.alert('123')
    },

  },
  children : [{
    name : 'ul',
    children : [
      {
        name : 'li',
        children : 'Apple'
      },
      {
        name : 'li',
        children : 'Alibaba'
      },
    ]
  }]
}, 'dom')

document.getElementById('root').appendChild(element)