import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaFish, FaSearch, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import Button from '@mui/material/Button';
import { LoginContext } from "../contexts/LoginContextProvider";
import { Link } from 'react-router-dom';
import MyModalComponent from "../modal/Modal";





const NavBar = () => {
  //카테고리 data
  const mainCategories = {
    하드베이트: {
      items: ["플로팅미노우", "메탈지그", "타이바라", "에기"],
      ids: [1, 2, 3, 4],
    },
    소프트베이트: { items: ["새드", "테일", "호그"], ids: [5, 6, 7] },
    "메탈지그&스푼": { items: ["메탈지그", "스푼"], ids: [8, 9] },
    스커트베이트: { items: ["스피너베이트", "스피너"], ids: [10, 11] },
    각종장비: { items: ["낚시대", "악세사리"], ids: [12, 13] },
  };

  const { isLogin, logout, userInfo, roles } = useContext(LoginContext);

  const handleLogoClick = () => {
    navigate('/'); // 메인 페이지로 이동 
  };

  const handleCartLogoClick = () => {
    navigate('/Cart');
  };

  //카테고리 로직
  const navigate = useNavigate();

  const sendMainCategory = async (mainCategory) => {
    try {
      console.log(`sendMainCategory : ${process.env.REACT_APP_BACK_URL}`);
      console.log(
        `sendMainCategory : ${process.env.REACT_APP_BACK_URL}/api/v1/items`
      );
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
        {
          params: { maincategory: mainCategory },
        }
      );
      console.log(response.data);
      navigate("/itemList", { state: { items: response.data } });
    } catch (error) {
      console.error("메인카테고리 에러", error);
    }
  };

  const sendSubCategory = async (subCategory) => {
    try {
      console.log("subcateogry: ", subCategory);

      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
        {
          params: { subcategory: subCategory },
        }
      );
      navigate("/itemList", { state: { items: response.data } });
      console.log(response.data);
    } catch (error) {
      console.error("서브 카테고리 에러", error);
    }
  };

  return (
    <div className="h-full w-full">
      <nav className="w-full mx-auto bg-white shadow">
        <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
          <div className="h-full flex items-center">
            <div
              aria-label="Home"
              role="img"
              className="mr-10 flex items-center"
              onClick={handleLogoClick}
            >
              <FaFish className="text-2xl text-blue-500" />{" "}
              {/* FaFish 아이콘 사용 */}
              <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">
                TopCasting
              </h3>
            </div>

            <ul className="pr-12 xl:flex items-center h-full space-x-4 hidden">
            <div className="btn btn-ghost btn-circle w-auto"><Link to="/itemPage" className="btn btn-ghost btn-circle w-auto">전체상품</Link></div>
              {Object.entries(mainCategories).map(
                ([category, details], index) => (
                  <div key={category} className="dropdown dropdown-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle w-auto"
                    >
                      {category}
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li onClick={() => sendMainCategory(index + 1)}>
                        <div>전체보기</div>
                      </li>
                      {details.items.map((item, index) => (
                        <li key={index}>
                          <div
                            onClick={() => sendSubCategory(details.ids[index])}
                          >
                            {item}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </ul>
          </div>

          <div className="h-full xl:flex items-center justify-end hidden">
            <div className="w-full h-full flex items-center">
              <div className="w-full pr-12 h-full flex items-center border-r">
                <div className="relative w-full">
                  <div className="text-gray-600 absolute ml-3 inset-0 m-auto w-4 h-4">
                    
                  </div>

                  
                </div>
              </div>

              <div className="w-full h-full flex">
                <div className="w-32 h-full flex items-center justify-center border-r cursor-pointer text-gray-600">
                  <div
                    onClick={handleCartLogoClick}
                  >
                  <FaShoppingCart
                      className="icon icon-tabler icon-tabler-bell"
                      width="28"
                      height="28"
                    />
                  </div>
                    
                  
                </div>

                <div
                  aria-haspopup="true"
                  className="cursor-pointer w-full flex items-center justify-end relative"
                  onclick="dropdownHandler(this)"
                >

                  {/* 공통 */}
                {isLogin ? 
                <>
                  
                    <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                    <button
                    aria-haspopup="true"
                    onclick="dropdownHandler(this)"
                    className="focus:outline-none  rounded flex items-center "
                  >
                    <img
                      className="rounded-full h-10 w-10 object-cover"
                      src="https://www.gravatar.com/avatar/?d=mp"
                      alt="avatar"
                    />
                    
                    {userInfo.userId.length > 10 ? `${userInfo.userId.substring(0, 10)}...` : userInfo.userId}
                  </button>
                    </div>
                    
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      {roles.isAdmin ? 
                        <li><Link to={"/admin"}>관리자 페이지</Link></li> 
                        :  
                        <>
                        <li><Link to={"/MyPage"}>유저 상세페이지</Link></li>
                        <li><Link to={"/Orders"}>주문 목록</Link></li> 
                        </>
                      }
                      
                      
                    </ul>
                    
                </div>
                  
                <Button color="inherit" className="w-auto whitespace-nowrap" component={Link} onClick={() => logout()}>로그아웃</Button>
                </>
                :
                <>
                <Button color="inherit" className="w-auto whitespace-nowrap" component={Link} to="/join">회원가입</Button>
                <MyModalComponent></MyModalComponent>
                </>
                }






                  <ul className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 hidden">
                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />

                          <circle cx="12" cy="7" r="4" />

                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>

                        <a href="javascript:void(0)" className="ml-2">
                          My Profile
                        </a>
                      </div>
                    </li>

                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-help"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />

                        <circle cx="12" cy="12" r="9" />

                        <line x1="12" y1="17" x2="12" y2="17.01" />

                        <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                      </svg>

                      <a href="javascript:void(0)" className="ml-2">
                        Help Center
                      </a>
                    </li>

                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-settings"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />

                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />

                        <circle cx="12" cy="12" r="3" />
                      </svg>

                      <a href="javascript:void(0)" className="ml-2">
                        Account Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="visible xl:hidden flex items-center">
            <div>
              <button
                id="menu"
                className="text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onclick="sidebarHandler(true) "
              >
                <svg
                  aria-label="open sidebar menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />

                  <line x1="4" y1="6" x2="20" y2="6" />

                  <line x1="4" y1="12" x2="20" y2="12" />

                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
