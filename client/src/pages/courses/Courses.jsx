import React, { useEffect, useRef, useState } from "react";
import "./Courses.scss";
import CourseCard from "../../components/courseCard/CourseCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Courses() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      newRequest
        .get(
          `/courses`
        )
        .then((res) => {
          return res.data;
        }),
  });

  // console.log(data);


  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Industry recognized </span>
        <h1>Top courses</h1>
        <p>
          Explore the boundaries of art and technology with Coursea's best instructors
        </p>

        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((course) => <CourseCard key={course._id} item={course} />)}
        </div>
      </div>
    </div>
  );
}

export default Courses;
