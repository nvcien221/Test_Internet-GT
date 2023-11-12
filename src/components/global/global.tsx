import React, { Fragment, PropsWithChildren, ReactNode } from 'react'
import './global-style.scss'

// ------Cach 1------- (viết gọn lại thành PropsWithChildren nên dùng luôn)
// type Props = {
//   children: ReactNode
// };

//                                         ------Cach 2-----
export default function GlobalStyle(props: PropsWithChildren) {
  const {children} = props
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

