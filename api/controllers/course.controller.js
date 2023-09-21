import Course from "../models/course.model.js";
import createError from "../utils/createError.js";

export const createCourse = async (req, res, next) => {
  if (!req.isTeacher)
    return next(createError(403, "Only Teachers can create a course!"));

  const teacher = await User.findById(req.userId)

  const newCourse = new Course({
    teacherName: teacher.username,
    ...req.body,
  });


  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    next(err);
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course.teacherId !== req.userId)
      return next(createError(403, "You can delete only your course!"));

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).send("Course has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) next(createError(404, "Course not found!"));
    res.status(200).send(course);
  } catch (err) {
    next(err);
  }
};
export const getCourses = async (req, res, next) => {
  // const q = req.query;
  // const filters = {
  //   ...(q.userId && { userId: q.userId }),
  //   ...((q.min || q.max) && {
  //     price: {
  //       ...(q.min && { $gt: q.min }),
  //       ...(q.max && { $lt: q.max }),
  //     },
  //   }),
  //   ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  // };
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
};
