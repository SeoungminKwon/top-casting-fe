import React, { useContext, useEffect, useState } from "react";
import ReviewWriteModal from "../modal/ReviewWriteModal";
import { HttpDelete, HttpGet } from "../service/HttpService";
import ReviewModifyModal from "../modal/ReviewModifyModal";
import { LoginContext } from "../contexts/LoginContextProvider";

const Review = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const itemId = props.itemId;
  const { isLogin, logout, userInfo, roles } = useContext(LoginContext);

  const fetchData = () => {
    HttpGet(`/api/v1/items/${itemId}/review`)
      .then((response) => {
        setReviewList(response.reviewList);
      })
      .catch((error) => {
        console.error("Error :", error);
        // 오류 처리 로직 추가
      });
  };

  //ItemId로 useEffect 하기
  useEffect(() => {
    fetchData();
  }, []);

  const deleteReview = (reviewId) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      HttpDelete(`/api/v1/review/${reviewId}`).catch((e) => {
        console.log(e);
      });
    }
    return;
  };

  const formatDate = (dateString) => {
    console.log(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="p-10">
      <div class="py-12 px-4 md:px-6 flex justify-center items-center w-full">
        <div class="flex flex-col justify-start items-start w-full">
          <div class="flex justify-start items-start">
          <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white mb-3 mt-3">Reviews</p>
          <ReviewWriteModal onModalClose={fetchData} itemId={itemId} />
          </div>
          
          {reviewList.map((review) => (
            <div key={review.id} class="w-full">
              <div class="flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 p-8 w-full">
                <div id="menu" class="w-full">
                
                <div className="rating rating-m">
                {[...Array(5)].map((_, i) => (
                  <label key={i}>
                    <input
                        type="radio"
                        name="rating"
                        className={`mask mask-star-2 ${review.rating >= i + 1 ? "bg-orange-500" : "bg-gray-400"}`}
                    />
                  </label>
                ))}
              </div>
 
                <p className="lg:text-2xl font-black leading-9 text-gray-800 dark:text-white mb-3 mt-3">{review.title}</p>
                  <p class="mt-3 text-base leading-normal text-gray-600 dark:text-white">{review.content}</p>
  
                  <div class="mt-6 flex justify-start items-center flex-row space-x-2.5">
                    <div>
                      <img src="https://www.gravatar.com/avatar/?d=mp" alt="avatar" />
                    </div>
                    <div class="flex flex-col justify-start items-start space-y-2">
                      <p class="text-base font-medium leading-none text-gray-800 dark:text-white">{review.writer}</p>
                      <p class="text-sm leading-none text-gray-600 dark:text-white">{formatDate(reviewList[0].createdDate)}</p>
                    </div>
                  </div>
                  {userInfo.userId === review.writer ? 
                  <div className="flex items-center space-x-2">
                  <button className="btn" onClick={() => { deleteReview(review.id); }}>
                    삭제
                  </button>
                  <ReviewModifyModal reviewId={review.id} />
                </div>
                :
                null
                }  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Review;
