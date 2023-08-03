

"use client"
import { useContext, useEffect, useRef } from 'react'
import { Container } from '../Container'
import Logo from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'
import { SafeUser } from '@/app/types';
import { ThemeContext } from '@/app/context/ThemeContext'
import Categories from './Categories'
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {


  const navbarRef = useRef<HTMLDivElement>(null); 
  let theEnd = 0;
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        const navbar = navbarRef.current!;
  
        if (scrollTop > theEnd) {
          navbar.style.top = '-70px'; 
        //   '-'+scrollTop+'px';
        } else {
          navbar.style.top = '0';
        }
        // navbar.style.tra = ''
        theEnd = scrollTop;
        
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


    const {toggle, mode} = useContext(ThemeContext)


  return (
    <div
      ref={navbarRef}
      className={`fixed w-full z-10 shadow-sm transition-all ease-linear duration-500 
        ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
  
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
