import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { HttpGet, HttpPost } from "../service/HttpService";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

const ReviewWriteModal = (props) => {
  const [currentStars, setCurrentStars] = useState(5);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { userInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  const [itemName, setItemName] = useState();
  const [orderId, setOrderId] = useState();
  useEffect(() => {
    setItemName(props.itemName);
    setOrderId(props.orderId);
    console.log(`props : ${JSON.stringify(props, null, 2)}`)
}, [props.itemName, props.orderId]);




  const handleStarClick = (star) => {
    setCurrentStars(star);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newReview = {
      writer: userInfo.userId,
      itemName: itemName,
      rating: currentStars,
      title: title,
      content: content,
    };

    console.log(`handleSubmit : ${JSON.stringify(newReview, null, 2)}`);
  
    await HttpPost(`/api/v1/orders/${orderId}/items/${itemName}/review`, newReview)
      .then((response) => {})
      .catch((error) => {
        console.log(`error : ${error}`);
      });
    reset();
    document.getElementById(`${props.modalId}`).close();
  };

  const verifyReview = async () => {
    console.log(`verifyReview : ${itemName}`);
    try {
      await HttpGet(`/api/v1/orders/${orderId}/items/${itemName}/review`);
      console.log(`true : ${itemName}`);
      return true; // 요청이 성공적으로 완료되면 true 반환
    } catch (e) {
      console.log(e);
      console.log(`false : ${itemName}`);
      return false; // 에러 발생 시 false 반환
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const reset = () => {
    setContent("");
    setTitle("");
    setCurrentStars(5);
  };

  

  return (
    <div className="font-sans p-4">
      <button
        className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
        onClick={async() => {
          if (Object.keys(userInfo).length === 0) {
            navigate("/login");
            return;
          }
        
          const reviewVerified = await verifyReview();
          if (reviewVerified) {
            console.log(`itemName : ${itemName}`)
            console.log(`props.modalId : ${props.modalId}`)
            document.getElementById(`${props.modalId}`).showModal();
          } else {
            alert("이미 리뷰를 작성했습니다.");
          }
        }}
        variant="contained"
      >
        리뷰 작성하기
      </button>
      {console.log(``)}
      <dialog id={props.modalId} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="form-control w-full ">
            <h2 className="text-xl font-bold my-4">Review를 작성해주세요</h2>

            <div className="rating rating-m">
              {[...Array(5)].map((_, i) => (
                <input
                  type="radio"
                  name="rating-2"
                  className={`mask mask-star-2 ${
                    currentStars >= i + 1 ? "bg-orange-500" : "bg-gray-400"
                  }`}
                  checked={currentStars === i + 1}
                  onClick={() => handleStarClick(i + 1)}
                />
              ))}
            </div>
            <label className="input input-bordered flex items-center gap-2 mb-3 mt-3">
              <input
                type="text"
                className="grow"
                placeholder="제목을 작성해주세요"
                value={title}
                onChange={handleTitleChange}
              />
            </label>
            <textarea
              placeholder="리뷰 내용을 작성해주세요"
              className="textarea textarea-bordered textarea-lg w-full mb-3"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button type="submit" className="btn btn-neutral">
              Submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <Button
                className="text-base leading-none w-full bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                onClick={reset}
              >
                Close
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewWriteModal;
