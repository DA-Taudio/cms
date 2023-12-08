import { forwardRef, Ref } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineCreditCard } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBoxSeam } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MdOutlineSlideshow } from 'react-icons/md';
import Image from 'next/image';
import { RiCoupon2Line } from 'react-icons/ri';

const SideBar = forwardRef<HTMLDivElement, { showNav: boolean }>(({ showNav }, ref: Ref<HTMLDivElement>) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 z-50 h-full bg-[#001529] shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src="/images/logo2.png" alt="company logo" />
        </picture>
      </div>

      <div className="flex flex-col text-white">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/' ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <AiOutlineHome className="h-5 w-5" />
            </div>
            <div>
              <p>Tổng Quan</p>
            </div>
          </div>
        </Link>
        <Link href="/slider">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/slider' ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <MdOutlineSlideshow className="h-5 w-5" />
            </div>
            <div>
              <p>Trình chiếu</p>
            </div>
          </div>
        </Link>
        <Link href="/product">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/product' ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <BsBoxSeam className="h-5 w-5" />
            </div>
            <div>
              <p>Sản Phẩm</p>
            </div>
          </div>
        </Link>
        <Link href="/product/type">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/product/type'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <FaProductHunt className="h-5 w-5" />
            </div>
            <div>
              <p>Phân Loại</p>
            </div>
          </div>
        </Link>

        <Link href="/voucher">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/voucher' ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <RiCoupon2Line className="h-5 w-5" />
            </div>
            <div>
              <p>Mã giảm giá</p>
            </div>
          </div>
        </Link>
        <Link href="/user">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/user' ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <AiOutlineUser className="h-5 w-5" />
            </div>
            <div>
              <p>Khách Hàng</p>
            </div>
          </div>
        </Link>
        <Link href="/order">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/order' ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <AiOutlineCreditCard className="h-5 w-5" />
            </div>
            <div>
              <p>Đơn Hàng</p>
            </div>
          </div>
        </Link>
        <Link href="/messager">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/messager'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white hover:text-blue-700'
            }`}
          >
            <div className="mr-2">
              <MdMessage className="h-5 w-5" />
            </div>
            <div>
              <p>Cuộc Trò Chuyện</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
