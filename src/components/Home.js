import { useQuery } from "react-query";
import axios from "axios";
import SkillsChart from "./SkillsChart";

const fetchCandidate = async () => {
  const res = await axios.get("http://localhost:3001/candidate");
  return res;
};
const fetchSkills = async () => {
  const skills = await axios.get("http://localhost:3001/skills");
  return skills;
};

const Home = () => {
  const { data: candidate, status } = useQuery("canditates", fetchCandidate);
  const { data: skills, status: statusSkills } = useQuery(
    "skills",
    fetchSkills
  );

  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
          <p>Skills</p>
        </div>
        {status === "success" && statusSkills === "success" ? (
          <>
            <div className="home-row" key={candidate.dataid}>
              <p>{candidate.data.firstName}</p>
              <p>{candidate.data.lastName}</p>
              <p>{candidate.data.email}</p>
              <div className="skill">
                {skills.data.map((skill) => {
                  return <p key={skill.id}>{skill.skill}</p>;
                })}
              </div>
            </div>
            <h2>Skill Chart</h2>
            <SkillsChart skills={skills.data} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Home;
