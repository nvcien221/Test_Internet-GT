import React, { useMemo, useState } from 'react'
import css from './header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IconSearch, IconCart } from 'src/assets/icons'
import logoImg from 'src/assets/imgs/logo.webp'
import { useCartContext } from 'src/components/context/cartContext'
import { NAVIGATE_URL } from 'src/constants'
import { getLocalStorage } from 'src/utils'

export default function Header() {
  const { cartItems, userEmail, handleLogout, handldeLogin } = useCartContext();
  const totalQuantity = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);

  const tokenLogin = getLocalStorage('accessToken')

  const navigate = useNavigate();

  const handleCartClick = () => {
    if (tokenLogin) {
      navigate(NAVIGATE_URL.carts);
      handldeLogin();
    } else {
      navigate(NAVIGATE_URL.login);
    }
  };
  const handleLogoutClick = () => {
    handleLogout();
    navigate(NAVIGATE_URL.home);

  };
  const handleEmail = () => {
    navigate(NAVIGATE_URL.profile);

  };


  return (
    <>
      <header className={css.header}>
        <div style={{
          width: "50px",
          height: "50px"
        }} onClick={handldeLogin}>
          <Link to='/'><img style={{
            width:"100%",
            height:"100%"
          }} src={logoImg} alt="" /></Link>
        </div>
        <div className={css['header-left']}>
          {tokenLogin ? <div onClick={handleEmail} style={{ cursor: 'pointer' }}>{userEmail}</div> : ''}
          <div className={css['icon-search']}>
            <Link to='/search'><IconSearch /></Link>
            <Link to='/search'><span style={{ color: 'white' }}>Search</span></Link>
          </div>
          <div className={css['icon-cart']}>
            <div onClick={handleCartClick}><IconCart /></div>
            <span>({totalQuantity})</span>
          </div>

          <div className={css['author']}>
            {tokenLogin ? (
              <div className={css['logout']} onClick={handleLogoutClick}>Logout</div>
            ) : (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <nav>
        <ul className={css['nav']}>
          <li onClick={handldeLogin}>
            <Link className={css['active']} to='/'>Home </Link>
          </li>
          <li>
            <Link to='#'>Men </Link>
          </li>
          <li>
            <Link to='#'>Woman </Link>
          </li>
          <li>
            <Link to='#'>Kid</Link>
          </li>
          <li>
            <Link to='#'>Sport</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
