import React, { useEffect, useState } from "react";
import "./Course.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
// import Reviews from "../../components/reviews/Reviews";

function Course() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [isSlider, setisSlider] = useState(false)
  useEffect(()=>{
  setisSlider(true)
  },[])

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["course"],
    queryFn: () =>
      newRequest.get(`/courses/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const teacherId = data?.teacherId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${teacherId}`).then((res) => {
        return res.data;
      }),
    enabled: !!teacherId,
  });

  const { isLoading : isLoadingLoggedInUser, error : errorLoggedInUser, data : dataLoggedInUser } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () =>
      currentUser
        ? newRequest.get(`/enrollments/alreadyEnrolled/${id}`).then((res) => {
            return res.data;
          })
        : Promise.resolve(null), // Return a resolved Promise if currentUser is null
  });

  console.log(dataLoggedInUser)

  const handleBuyNow = () => {
    if (!currentUser) {
      navigate("/login")
    } else{
      navigate(`/pay/${id}`)
    }
  }

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Coursea {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            {isSlider && <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>}

            <h2>About This Course</h2>
            <p>{data.desc}</p>

            {/* Course contents only visible to Enrolled Students and the Teacher who uploaded the course */}
            {/* <p>{currentUser && dataLoggedInUser?.teacherId == currentUser?.id && dataLoggedInUser?.buyerId == currentUser?.id && <b>Course Contents</b>}</p> */}
            <p>{currentUser && dataLoggedInUser?.teacherId == currentUser?.id && dataLoggedInUser == true && <b>Course Contents</b>}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Teacher</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            {/* <Reviews gigId={id} /> */}
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.title}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            {!currentUser?.isTeacher ? 
              <button>{currentUser && dataLoggedInUser == true ? <span>Already Enrolled</span> : <span onClick={handleBuyNow}>Buy Now</span>}</button>
             : 
            <Link to={`/`}>
              <button>Go back </button>
            </Link> }
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
