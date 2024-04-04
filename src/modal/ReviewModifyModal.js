import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { HttpGet, HttpPost, HttpPut } from "../service/HttpService";

const ReviewModifyModal = ({ reviewId, onModalClose }) => {
  const [currentStars, setCurrentStars] = useState(2);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useContext(LoginContext);

  useEffect(() => {
    if (isModalOpen) {
      HttpGet(`/api/v1/review/${reviewId}`)
        .then((response) => {
          setCurrentStars(response.rating);
          setTitle(response.title);
          setContent(response.content);
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [isModalOpen, reviewId]);

  const handleStarClick = (star) => {
    console.log(`star : ${star}`)
    setCurrentStars(star)};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 채워주세요");
      return;
    }

    try {
        console.log(`reviewId : ${reviewId}`)
        const data =  {
            writer: userInfo.userId,
            reviewId : reviewId,
            rating: currentStars,
            title : title,
            content : content
          };

        console.log(JSON.stringify(data, null, 2));
      await HttpPut(`/api/v1/review/${reviewId}`, data)
      .then((response) => {
        console.log(`response : ${response}`);
      })
      .catch((e) => console.log(e));
      reset();
      setIsModalOpen(false); // Close modal
      onModalClose(); // Call parent's onModalClose if any action needed
    } catch (error) {
      console.error('Submit Error:', error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const reset = () => {
    setContent('');
    setTitle('');
    setCurrentStars(5);
  };

  const toggleModal = () => {
    if (!userInfo) {
      alert('로그인 후 이용해주세요.');
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="font-sans p-4">
      <button className="btn" onClick={toggleModal}>
        리뷰 수정
      </button>
      {isModalOpen && (
        <dialog open id="my_modal_1" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit} className="form-control w-full ">
              <h2 className="text-xl font-bold my-4">Review를 수정해주세요</h2>

              <div className="rating rating-m">
                {[...Array(5)].map((_, i) => (
                  <label key={i}>
                    <input
                        type="radio"
                        name="rating"
                        className={`mask mask-star-2 ${currentStars >= i + 1 ? "bg-orange-500" : "bg-gray-400"}`}
                        checked={currentStars === i + 1}
                        onChange={() => handleStarClick(i + 1)}
                    />
                  </label>
                ))}
              </div>
              <input
                type="text"
                className="input input-bordered mb-3"
                placeholder="제목을 작성해주세요"
                value={title}
                onChange={handleTitleChange}
              />
              <textarea
                placeholder="리뷰 내용을 작성해주세요"
                className="textarea textarea-bordered mb-3"
                value={content}
                onChange={handleContentChange}
              ></textarea>
              <button type="submit" className="btn btn-neutral">
                Submit
              </button>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={toggleModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ReviewModifyModal;
