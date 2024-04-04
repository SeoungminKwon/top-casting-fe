import React, { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { HttpPost } from "../service/HttpService";
import { Button } from "react-daisyui";


const ReviewWriteModal = (props) => {

  const [currentStars, setCurrentStars] = useState(5);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { userInfo } = useContext(LoginContext);
  
  const itemId = props.itemId;


  const handleStarClick = (star) => {console.log(`star : ${star}`);setCurrentStars(star)};

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { writer: userInfo.userId, itemId: itemId, rating: currentStars, title: title, content: content };
    if(title === "" || content === ""){
      alert("제목과 내용을 채워주세요");
      return;
    }
    HttpPost(`/api/v1/items/${itemId}/review`, newReview)
    .then((response) => {

    })
    .catch((error) => {
      console.log(`error : ${error}`);
    })
    reset();
    document.getElementById("my_modal_1").close()
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value); 
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const reset = () => {
    setContent('');
    setTitle('');
    setCurrentStars(5);
    props.onModalClose();
  }


  return (
    <div className="font-sans p-4">
      
        <Button
              className="text-base leading-none w-full bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
              onClick={() => {
                if(userInfo == null){
                  alert('로그인 후 이용해주세요.');
                  return;
                }
                document.getElementById("my_modal_1").showModal()}}
              variant="contained"
            >
              리뷰 작성하기
        </Button> 
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="form-control w-full ">
        <h2 className="text-xl font-bold my-4">Review를 작성해주세요</h2>

        <div className="rating rating-m">
          {[...Array(5)].map((_, i) => (
            <input
              type="radio"
              name="rating-2"
              className={`mask mask-star-2 ${currentStars >= i + 1 ? "bg-orange-500" : "bg-gray-400"}`}
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
              <Button className="text-base leading-none w-full bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700" onClick={reset}>Close</Button>
            </form>
          </div>
        </div>
      </dialog>
      
    </div>
  );
};

export default ReviewWriteModal;
