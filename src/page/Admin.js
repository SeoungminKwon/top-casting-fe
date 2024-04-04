import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import AdminOrderList from "./order/AdminOrderList";
import AddItem from "./AddItem";
import TotalReview from "../component/TotalReview";

function Admin() {
    const { roles } = useContext(LoginContext);
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState("");

    useEffect(() => {
        if (roles == null || !roles.isAdmin) {
            alert("관리자만 접근 가능합니다.");
            navigate("/");
        }
    }, [roles]);

    const handleMenuClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case "RegisterProduct":
                return <AddItem />;
            case "OrderList":
                return <AdminOrderList />;
            case "Review":
                return <TotalReview/>;
            default:
                return <div>메뉴를 선택해주세요.</div>;
        }
    };

    return (
        <div class="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div class="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div class="flex h-full max-h-screen flex-col gap-2">
                    <div class="flex h-[60px] items-center border-b px-6">
                        <a
                            class="flex items-center gap-2 font-semibold"
                            href="#"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="h-6 w-6"
                            >
                                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                                <path d="M12 3v6"></path>
                            </svg>
                            <span class="">관리자 페이지</span>
                        </a>
                    </div>
                    <div class="flex-1 overflow-auto py-2">
                        <nav class="grid items-start px-4 text-sm font-medium">
                            <a
                                class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-4 w-4"
                                >
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <button
                                    onClick={() => handleMenuClick("analytics")}
                                >
                                    Home
                                </button>
                            </a>
                            <a
                                class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                href="#"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-4 w-4"
                                >
                                    <path d="m7.5 4.27 9 5.15"></path>
                                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                                    <path d="M12 22V12"></path>
                                </svg>
                                <button
                                    onClick={() => handleMenuClick("OrderList")}
                                >
                                    주문 목록
                                </button>
                            </a>
                            <a
                                class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-4 w-4"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <button
                                    onClick={() =>
                                        handleMenuClick("RegisterProduct")
                                    }
                                >
                                    제품 등록
                                </button>
                            </a>
                            <a
                                class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <svg
                                     xmlns="http://www.w3.org/2000/svg"
                                     width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="currentColor" // 별을 채울 색상으로 변경
                                     stroke="currentColor"
                                     strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="h-4 w-4"
                                   >
                                     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.27 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" />  
                                </svg>
                                <button
                                    onClick={() =>
                                        handleMenuClick("Review")
                                    }
                                >
                                    모든 리뷰
                                </button>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
}

export default Admin;
