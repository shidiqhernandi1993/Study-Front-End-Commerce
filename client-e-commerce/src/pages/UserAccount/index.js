import { FaAddressBook, FaArrowRight, FaFileInvoice, FaHome } from '@meronex/icons/fa'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, LayoutOne, Responsive, Text } from 'upkit'
import TopBar from '../../components/TopBar'

const IconWrapper = ({children}) => {
  return <div className="text-white text-5xl flex justify-center mb-5">
      {children}
  </div>
}

const menus = [
  {label: 'Beranda', icon: <IconWrapper><FaHome/></IconWrapper>, url: '/'},
  {label: 'Alamat', icon: <IconWrapper><FaAddressBook/></IconWrapper>, url: '/alamat-pengiriman'}, 
  {label: 'Pesanan', icon: <IconWrapper><FaFileInvoice/></IconWrapper>, url: '/pesanan'}, 
  {label: 'Logout', icon: <IconWrapper><FaArrowRight/></IconWrapper>, url: '/logout'}
];

export default function UserAccount() {
  return (
    <LayoutOne>
      <TopBar/>
        <Text as="h3"> My Account </Text> 
        <br/>
        <Responsive desktop={8} tablet={8} mobile={8}>
        {menus.map((menu, index) => {
            return <div key={index} className="px-10 pb-10">
                <Link to={menu.url}>
                    <Card
                        header={menu.icon}
                        body={<div className="text-center font-bold text-blue">
                            {menu.label}
                        </div>}
                    />
                </Link>
            </div>
        })}
        </Responsive>
    </LayoutOne>
  )
}
