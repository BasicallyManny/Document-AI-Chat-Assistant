import { Disclosure } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Login from '../pages/Login';
import { useNavigate} from 'react-router-dom';
import { AiOutlineMail, AiOutlineHome, AiOutlineBranches, AiFillInfoCircle } from 'react-icons/ai';

interface NavigationItem {
    name: string;
    href: string;
    current?: boolean;
    target?: string;
    icon?: JSX.Element;
}

const navigation: NavigationItem[] = [
    {
        name: 'Home',
        href: '/',
        icon: <AiOutlineHome size={25} style={{ color: 'rgb(138, 43, 226)' }}></AiOutlineHome>,
    },
    {
        name: 'About',
        href: '/about',
        icon: <AiFillInfoCircle size={25} style={{ color: 'rgb(138, 43, 226)' }}></AiFillInfoCircle>,
    },
    {
        name: 'Contact',
        href: '/contact',
        icon: <AiOutlineMail size={25} style={{ color: 'rgb(138, 43, 226)' }}></AiOutlineMail>,
    },
    {
        name: 'Source Code',
        href: 'https://github.com/BasicallyManny/Document-AI-Chat-Assistant',
        target: '_blank',
        icon: <AiOutlineBranches size={25} style={{ color: 'rgb(138, 43, 226)' }}></AiOutlineBranches>,
    },
];

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
    const [modalShow, setModalShow] = useState(false);

    const history = useNavigate();

    const handleLogout = async () => {
        try {
            // Clear session-related data
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            localStorage.removeItem('token');
            // Redirect to the login page or any other appropriate page
            history.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle logout failure
        }
    };


    return (
        <Disclosure as="nav" className="bg-gray-950">
            {({ open }: { open: boolean }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className={classNames(
                                        'relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all ease-in duration-300',
                                        { 'bg-gray-900': open },
                                    )}
                                >
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
                                                    item.current
                                                        ? 'flex justify-center bg-gray-900 text-white'
                                                        : '!text-white hover:underline hover:text-white',
                                                    'rounded-md px-3 py-2 text-lg font-medium transition-all ease-in duration-300',
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
                                <Button
                                    onClick={() => setModalShow(true)}
                                    variant="outline"
                                    className="btn-lg text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                                >
                                    Login
                                </Button>{' '}
                                <Login show={modalShow} onHide={() => setModalShow(false)}></Login>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel
                        as="div"
                        className={classNames(
                            'sm:hidden bg-gray-950 transition-all duration-300 ease-in-out transform',
                            { 'translate-y-0': open, '-translate-y-full': !open },
                        )}
                    >
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target={item.target}
                                    className={classNames(
                                        item.current ? '!text-white' : '!text-white hover:bg-gray-900 hover:text-white',
                                        'rounded-md px-3 py-2 text-base font-medium flex justify-center mx-auto transition-all ease-in duration-300',
                                    )}
                                >
                                    {item.icon}
                                    {item.name}
                                </a>
                            ))}
                            {/* Logout button */}
                            <Button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center px-4 py-2 mt-2 text-base font-medium text-gray-300 bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Logout
                            </Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
