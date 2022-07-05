interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  name: "Fundamentals" | "Advanced";
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  name: "Using props to pass data";
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescription {
  name: "Backend development";
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
