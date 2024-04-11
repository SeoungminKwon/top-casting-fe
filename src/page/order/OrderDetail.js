import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReviewWriteModal from '../../modal/ReviewWriteModal';
import { HttpGet } from '../../service/HttpService';


const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState(null);
    const { orderId } = useParams();
	const [orderStatus, setOrderStatus] = useState('');
	const navigate = useNavigate();
    useEffect(() => {
        fetchOrderDetail(orderId);
    }, [orderId]);

    const fetchOrderDetail = async (orderId) => {

		const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/v1/orders/${orderId}`,{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				}
			}
		);
		console.log(response.data);
            setOrderDetail(response.data);
        } catch (error) {
            console.error('주문 상세 정보를 가져오는 데 실패했습니다:', error);
        }
    };

	const handleStatusChange = (event) => {
		setOrderStatus(event.target.value);
	};

	const handleSubmit = async () => {

		const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }

		try {
		  const response = await axios.patch(`${process.env.REACT_APP_BACK_URL}/api/v1/orders/${orderId}/refund`, {
			orderStatus: orderStatus,
		  }, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			}
		});
		  console.log(response.data);
		  alert('상태 업데이트 성공!');
		} catch (error) {
		  console.error('상태 업데이트 실패:', error);
		  alert('상태 업데이트 실패!');
		}
	  };


    if (!orderDetail) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
                <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div class="flex justify-start item-start space-y-2 flex-col">
                        <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                            주문 상세 정보 ({orderDetail.orderStatus})
                        </h1>
						<p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                    {orderDetail.orderCreatedDate}
                                </p>
                    </div>
                    <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                    주문목록
                                </p>
                                {orderDetail.findOrderItemDtos.map((item, index) => (
                                    <>
                                    <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div class="pb-4 md:pb-8 w-full md:w-40">
                                            <img
                                                class="w-full hidden md:block"
                                                src={item.itemImagePath}
                                                alt={item.itemName}
                                            />
                                            <img
                                                class="w-full md:hidden"
                                                src={item.itemImagePath}
                                                alt={item.itemName}
                                            />
                                        </div>
                                        <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                    {item.itemName}
                                                </h3>
                                                <div class="flex justify-start items-start flex-col space-y-2">
                                                    <p class="text-sm dark:text-white leading-none text-gray-800">
                                                        <span class="dark:text-gray-400 text-gray-300">
                                                            Color:{" "}
                                                        </span>{" "}
                                                        {item.itemOption}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="flex justify-between space-x-8 items-start w-full">
                                                <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                    {item.itemQuantity}개
                                                </p>
                                                <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                    {item.totalPrice}
                                                    원
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {orderDetail.orderStatus === "ORDER_EXCHANGE_REQUESTED" || orderDetail.orderStatus === "ORDER_REFUND_REQUESTED"
                                    ?
                                    null
                                    :                                
                                    <ReviewWriteModal orderId={orderDetail.orderId} itemName={item.itemName}
                                    modalId={`reviewModal_${index}`}
                                    ></ReviewWriteModal>
                                    }
                                    </>
                                    
                                ))}
                            </div>
                            <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                        요약
                                    </h3>
                                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div class="flex justify-between w-full">
                                            <p class="text-base dark:text-white leading-4 text-gray-800">
                                                소계
                                            </p>
                                            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                {orderDetail.totalItemPrice}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                            합계
                                        </p>
                                        <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                            {orderDetail.totalItemPrice}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                주문자 정보 입력
                            </h3>
                            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                <div class="flex flex-col justify-start items-start flex-shrink-0">
                                    <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        <div class="flex justify-start items-start flex-col space-y-2">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                                주문자 이름 : {orderDetail.customerName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                                주문자 주소 : {orderDetail.customerAddress}
                                            </p>
                                        </div>
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                                주문자 전화번호 : {orderDetail.customerPhoneNumber}
                                            </p>
                                        </div>
										<select class="select select-bordered w-full max-w-xs" value={orderStatus} onChange={handleStatusChange}>
        <option disabled selected value="">상태를 선택하세요</option>
        <option value="ORDER_REFUND_REQUESTED">환불 요청</option>
        <option value="ORDER_EXCHANGE_REQUESTED">교환 요청</option>
      </select>
      <button class="btn btn-outline" onClick={handleSubmit}>환불 요청</button>
                                    </div>
									
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default OrderDetail;
