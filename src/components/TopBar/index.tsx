import { Fragment } from 'react';
import { FaBars, FaChevronDown, FaCreditCard, FaCog } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { BsBell } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { Menu, Transition, Popover } from '@headlessui/react';
import Link from 'next/link';
import useUserStore, { UserStore } from '@/store/useUserStore';
import { AiOutlineLogout } from 'react-icons/ai';

const TopBar = ({ showNav, setShowNav }: any) => {
  const { user, logout } = useUserStore(store => store) as UserStore;

  return (
    <div
      className={`fixed z-40 shadow-md w-full bg-white h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? 'pl-56' : ''
      }`}
    >
      <div className="pl-4 md:pl-16">
        <FaBars className="text-blue-500 h-6 w-6  cursor-pointer" onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="flex items-center pr-4 md:pr-16 ">
        <Popover className="relative flex ">
          <Link href={'/messager'} className="mr-5 md:mr-8  text-blue-500">
            <BiMessageDetail size={30} />
          </Link>
          <Popover.Button className="outline-none mr-5 md:mr-8 cursor-pointer text-gray-700">
            <BsBell className="h-6 w-6 text-blue-500 " />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen">
              <div className="relative p-3">
                <div className="flex justify-between items-center w-full">
                  <p className="text-gray-700 font-medium">Thông Báo</p>
                  <a className="text-sm text-orange-500" href="#">
                    Mark all as read
                  </a>
                </div>
                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                  <div className="flex">
                    <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                      <IoMdCheckmark className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-700">Notification Title</p>
                      <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                      <IoMdCheckmark className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-700">Notification Title</p>
                      <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                      <IoMdCheckmark className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-700">Notification Title</p>
                      <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                      <IoMdCheckmark className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-700">Notification Title</p>
                      <p className="text-sm text-gray-500 truncate">Test Notification text for design</p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <Menu as="div" className="relative inline-block text-left">
          {user ? (
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">
                <picture>
                  <img
                    src="/images/admin.webp"
                    className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                    alt="profile picture"
                  />
                </picture>
                <div className="flex flex-col">
                  <span className="hidden md:block font-bold">{user.fullName || user.userName}</span>
                  <span className="text-gray-600 text-sm">Quản trị viên</span>
                </div>
                <FaChevronDown className="ml-2 h-4 w-4 text-gray-700" />
              </Menu.Button>
            </div>
          ) : (
            <span>Đăng Nhập</span>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    href="/login"
                    onClick={() => {
                      logout();
                    }}
                    className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <AiOutlineLogout className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
export default TopBar;
