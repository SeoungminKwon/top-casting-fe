import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HttpGet } from "../service/HttpService";
import { HttpPost } from "../service/HttpService";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Review from "../component/Review";


const ItemDetailPage = () => {
    const { itemId } = useParams(); // URL에서 itemId 추출
    const [itemDetail, setItemDetail] = useState(null);
    const [quantity, setQuantity] = useState(1); // 수량 상태 관리
    const [selectedColor, setSelectedColor] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchItemDetail = async () => {

            try {
                const data = await HttpGet(`/api/v1/items/${itemId}`);
                setItemDetail(data);
                // itemDetail이 로드되면 selectedColor를 첫 번째 색상 옵션으로 설정
                if (data.itemColors.length > 0) {
                    setSelectedColor(data.itemColors[0].optionId);
                }
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchItemDetail();
    }, [itemId]); // 의존성 배열에서도 `itemId` 사용

    const handleAddToCart = async () => {
        const itemToAdd = {
            optionId: selectedColor,
            itemQuantity: quantity,
        };

        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await HttpPost("/api/v1/carts", itemToAdd);
            console.log("Response from adding item to cart:", response);
            setShowModal(true);
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
        console.log(`handleColorChange : ${event.target.value}`);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Math.max(1, event.target.value)); // 수량은 최소 1 이상
    };

    const handleSweetClick = () => {
        navigate('/cart');
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    if (!itemDetail) return <div>Loading...</div>;

    return (

        <>
            <div class="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
                <div id="viewerButton" class="hidden w-full flex justify-center">
                    <button onclick="openView()" class="bg-white text-indigo-600 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 py-5 px-10 font-semibold">Open Quick View</button>
                </div>
                <div id="viewerBox" class="lg:p-10 md:p-6 p-4 bg-white dark:bg-gray-900">
                    <div class="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8">
                        <div class="lg:w-1/2 flex justify-between items-strech bg-white-50  px-2 py-20 md:py-6 md:px-6 lg:py-24">
                            <div>
                                <img src={itemDetail.itemImageUrl} alt={itemDetail.itemName} class="w-full h-full" />
                            </div>
                        </div>
                        <div class="lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
                            <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">{itemDetail.itemName}</h1>
                            <div class="flex flex-col justify-start items-start w-full space-y-4">
                                <p class="text-xl md:text-2xl leading-normal text-gray-800 dark:text-gray-50"></p>
                                <p class="text-l md:text-xl font-semibold leading-none text-gray-600 dark:text-white">₩ {itemDetail.itemPrice} </p>
                            </div>
                            <p class="text-base leading-normal text-gray-600 dark:text-white mt-2">You don't just want to be comfortable sitting in a bar stool—you want to be comfortable shimmying it up to the bar, closer to your lover, or back slightly to include a third person in the conversation.</p>

                            <div class="mt-8 flex-col">
                                <div>
                                    <select id="color-select" value={selectedColor} onChange={handleColorChange} class="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600">
                                        <option selected disabled>Color</option>
                                        {itemDetail.itemColors.map((color) => (
                                            <option key={color.optionId} value={color.optionId}>
                                                {color.colorName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    class="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>

                            <div class="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-12">
                                <button onClick={handleAddToCart} class="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">Add to Cart</button>
                            </div>
                        </div>
                    </div >
                </div >
                <div class="mx-auto p-16 bg-gray-100 dark:bg-gray-800 flex flex-col w-3/4">
                    <img src={itemDetail.itemDetailedImageUrl} alt="Detailed view" class="mx-auto w-full h-full" />
                </div>
                <Review itemId={itemId}></Review>
            </div >
            {showModal && (
                <div class="flex justify-center items-center h-screen">
                    <div id="menu" class="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0">
                        <div class="2xl:container 2xl:mx-auto flex justify-center items-center h-screen">
                            <div class="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                                <div role="banner"></div>
                                <div class="mt-12">
                                    <h1 role="main" class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">장바구니로 이동하시겠습니까?</h1>
                                </div>
                                <div class="mt">
                                    <p class="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800">장바구니에 상품이 담겼습니다.</p>
                                </div>
                                <button onClick={handleSweetClick} class="w-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black">장바구니로 이동</button>
                                <a href="javascript:void(0)" onClick={handleCloseModal} class="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">계속 쇼핑하기</a>
                                <button onClick={handleCloseModal} class="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

export default ItemDetailPage;
