// {
//   name: "div",
//   props : {
//     onClick : () => {},
//     style : {
//       backgroundColor : 'blue'
//     }
//   },
//   children : [
//     {
//       name : 'div',
//       ...
//     }
//   ],
//   children : "hello"
// }
function render(node, renderAs = 'dom', path =[] ){

  const {name, props, children} = node
  if(renderAs === 'dom') {
    const element = document.createElement(name)
    if(props && props.onClick) {
      element.addEventListener('click', props.onClick)
    }

    if(typeof children === 'string') {
      element.innerHTML = children
    } else if(Array.isArray(children)){
      children.forEach( (child, i) => {
        element.appendChild(
          render(child, renderAs, path.concat(i))
        )
      })
    }

    return element

  } else if(renderAs === 'html') {
    let childrenStr = ''

    if(typeof children === 'string') {
      childrenStr = children
    } else {
      childrenStr = children
        .map((child, i) => {
          return render(child, renderAs, path.concat(i))
        })
        .join("")
    }
    
    return `<${name} id='node-${path.join('-')}'>${childrenStr}</${name}>`

  } else if(renderAs === 'rehydrate') {
    if(props && props.onClick) {
      document.getElementById(`node-${path.join('-')}`)
        .addEventListener('click', props.onClick)
    }

    if(Array.isArray(children)) {
      children.forEach((child, i) => {
        render(child, renderAs, path.concat(i))
      })

    }
  } else {
    throw "not supported renderAs type"

  }
}
module.exports = render 