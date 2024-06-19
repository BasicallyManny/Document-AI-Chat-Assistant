import { Disclosure } from '@headlessui/react'
import { RxCross1 } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";
import {React,useState} from 'react'
import Button from 'react-bootstrap/Button';

import Login from '../pages/Login'

import {
    AiOutlineMail,
    AiOutlineHome,
    AiOutlineBranches,
    AiFillInfoCircle
} from "react-icons/ai";

// Define the type for the navigation items
interface NavigationItem {
    name: string;
    href: string;
    current?: boolean;
    target?: string;
    icon?: JSX.Element;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', icon: <AiOutlineHome size={20} style={{ color: 'rgb(138, 43, 226)' }}></AiOutlineHome> },
    { name: 'About', href: '/about', icon: <AiFillInfoCircle size={20} style={{ color: 'rgb(138, 43, 226)' }} ></AiFillInfoCircle> },
    { name: "Contact", href: '/contact', icon: <AiOutlineMail size={20} style={{ color: 'rgb(138, 43, 226)' }}></AiOutlineMail> },
    { name: "Source Code", href: 'https://github.com/BasicallyManny/Document-AI-Chat-Assistant', target: '_blank', icon: <AiOutlineBranches size={20} style={{ color: 'rgb(138, 43, 226)' }}></AiOutlineBranches> },
];

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {

    const [modalShow, setModalShow] = useState(false); 
    
    return (
        <Disclosure as="nav" className="bg-gray-950 sticky z-50 top-0 w-full">
            {({ open }: { open: boolean }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <RxCross1 className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <HiMenu className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                target={item.target}
                                                className={classNames(
                                                    item.current ? ' flex justify-center bg-gray-900 !text-white' : ' !text-white hover:underline hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                            >
                                                <div className="flex">
                                                    {item.icon}
                                                    {item.name}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button onClick={() => setModalShow(true)} variant="outline" className="text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">Login</Button>{' '}
                                <Login show={modalShow} onHide={() => setModalShow(false)}></Login>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    target={item.target}
                                    className={classNames(
                                        item.current ? ' !text-white' : '!text-white hover:bg-gray-900 hover:text-white',
                                        'rounded-md px-3 py-2 text-base font-medium flex justify-center'
                                    )}
                                >
                                    {item.icon}
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default Navbar;
