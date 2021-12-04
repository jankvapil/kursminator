import { Layout, Button, Input, Image, Drawer, Divider, Avatar, Dropdown, Menu } from 'antd'
import { MailOutlined, CalendarOutlined, MenuOutlined, ReadOutlined, SearchOutlined, FacebookFilled, InstagramFilled, GooglePlusSquareFilled } from '@ant-design/icons'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getUserInfo } from '@/core/graphql/queries/userQueries'


///
/// Header component
///
const Header = (props) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter();

  const showMenu = () => {
    setVisibleMenu(true);
  };
  const onCloseMenu = () => {
    setVisibleMenu(false);
  };

  const showSearchBar = () => {
    setVisibleSearchBar(true);
  };
  const onCloseSearchBar = () => {
    setVisibleSearchBar(false);
  };

  const onSearch = value => {router.push({
    pathname: '/courses',
    query: { search: value },
  })
  onCloseSearchBar();
};

  useEffect(() => {
    setUserInfo(localStorage)
    loadUserInfo()
  });

  const loadUserInfo = async () => {
    const user = await getUserInfo();
    setCurrentUser(user);
  }

  const logOut = () => {
    localStorage.clear();
    router.push(`/`)
  }

  const handleSearch = async (e) => {
    if (e.key == 'Enter' || e.keyCode == 13) {
      // router.push(`/courses?search=${e.target.value}`)
      router.push({
        pathname: '/courses',
        query: { search: e.target.value },
      })
    }
  } 

  const profileMenu = (
    <Menu>
      <Menu.Item key="1">
        <span><Link href="/myProfile">Můj profil</Link></span>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={logOut}>Odhlásit</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className={`${props.className} layout`}>
      <Layout.Header className="flex justify-between sm:justify-around items-center" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div className="flex md:hidden text-2xl" onClick={showMenu}>
          <MenuOutlined style={{ color: "#fff" }} />
        </div>
        <div className="flex items-center mt-1 cursor-pointer">
          <Link href="/">
            <span className="flex">
              <Image src="/logokursm-light.ico" alt="logo" preview={false} height="40px" />
            </span>
          </Link>
          <Link href="/">
            <span className="text-2xl sm:text-3xl text-white mb-0 ml-4 font-mono font-black">Kursminator</span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:items-center sm:block">
          <ReadOutlined style={{ color: "#fff" }} />
          <span className="text-white m-0 ml-2" ><Link href="/courses">Kurzy</Link></span>
        </div>
        <div className="hidden md:block w-1/4 lg:w-5/12">
          <Input onKeyDown={handleSearch} placeholder="Hledaný kurz..." />
        </div>
        <div className="hidden md:flex items-center">
          <MailOutlined style={{ color: "#fff" }} />
          <span className="text-white m-0 ml-2 mr-2"><Link href="/contact">Kontakt</Link></span>
          <CalendarOutlined style={{ color: "#fff" }} />
          <span className="text-white m-0 ml-2 mr-8"><Link href="/calendar">Kalendář</Link></span>

          {userInfo.isLogged == "true" && currentUser ?
            <Dropdown className="-m-5" overlay={profileMenu} placement="bottomCenter" arrow>
              <span>
                <Avatar className="cursor-pointer" size={24} src={userInfo.pictureUrl} onClick={() => router.push(`myProfile`)} />
                <span className="text-white ml-2">{currentUser.name}</span>
              </span>

            </Dropdown>
            :
            <Button className="mr-5" type="primary">
              <Link href="/login">Přihlášení</Link>
            </Button>}
        </div>

        <div className="flex md:hidden">
          <div className="flex md:hidden text-2xl gap-2 pr-2" onClick={showSearchBar}>
            <SearchOutlined style={{ color: "#fff" }} />
          </div>
          {userInfo.isLogged == "true" && currentUser ? <Avatar className="cursor-pointer" size={24} src={userInfo.pictureUrl} onClick={() => router.push(`myProfile`)} /> : ""}
        </div>
      </Layout.Header>

      {/* Menu */}
      <Drawer className="cursor-pointer" title="" placement="left" onClose={onCloseMenu} visible={visibleMenu}>
        <div className="flex flex-col">
          <p className="mt-8">
          </p>
          {userInfo.isLogged == "true" && currentUser ? currentUser.name + " " +
            currentUser.surname : <Link href="/login" >Přihlášení</Link>}
          {userInfo.isLogged == "true" && currentUser ? <p className="mb-0">{currentUser.credits} kreditů</p> : ""}
          {userInfo.isLogged == "true" && currentUser ? <Link href="/">Odhlásit</Link> : ""}
        </div>
        <Divider />
        <div className="flex flex-col">
          <Link href="/courses" >IT</Link>
          <Link href="/courses" >Sport</Link>
        </div>
        <Divider />
        <div className="flex flex-col">
          <Link href="/" >O nás</Link>
          <Link href="/" >Lektoři</Link>
          <Link href="/contact" >Kontakt</Link>
          <Link href="/calendar" >Kalendář</Link>
        </div>
        <div className="mt-8">
          <div className="flex flex-col">
            <div className="flex items-center">
              <FacebookFilled className="pr-2" />
              <Link href="/" >Facebook</Link>
            </div>
            <div className="flex items-center">
              <InstagramFilled className="pr-2" />
              <Link href="/" >Instagram</Link>
            </div>
            <div className="flex items-center">
              <GooglePlusSquareFilled className="pr-2" />
              <Link href="/" >Google+</Link>
            </div>
          </div>
        </div>
      </Drawer>
      {/* SearchBar */}
      <Drawer title="" placement="left" onClose={onCloseSearchBar} visible={visibleSearchBar}>
        <p className="mt-8">
        </p>
        <Input.Search placeholder="Hledaný kurz..." onSearch={onSearch} />
      </Drawer>
    </Layout>
  )
}

export default Header