import { Disclosure } from '@headlessui/react'
import { RxCross1 } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";
import React from 'react';

// Define the type for the navigation items
interface NavigationItem {
    name: string;
    href: string;
    current?: boolean; 
    target?: string; 
}

const navigation: NavigationItem[] = [
    { name: 'About', href: '/about' },
    { name: "Contact", href: '/contact' },
    { name: "Source Code", href: 'https://github.com/BasicallyManny/Document-AI-Chat-Assistant', target: '_blank' },
];

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }: { open: boolean }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="bg-transparent hover:bg-purple-500 text-white font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                                    Login
                                </button>
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
                                        item.current ? 'bg-gray-900 !text-white' : '!text-white hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-base font-medium flex justify-center'
                                    )}
                                >
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
