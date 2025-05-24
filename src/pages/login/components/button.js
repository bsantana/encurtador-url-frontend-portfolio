import React from 'react'

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const MyButton = React.forwardRef(({ onClick, href, title, style }, ref) => {
  return (
    // <a href={href} onClick={onClick} ref={ref} style={style}>
    //   {title || 'Click Me'}
    // </a>
    <button href={href} onClick={onClick} ref={ref} style={style}>
      {title || 'Click Me'}
    </button>
  )
})

MyButton.displayName = 'MyButton'

export default MyButton