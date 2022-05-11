import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import SkillFormAdd from "./SkillFormAdd";
import SkillFormEdit from "./SkillFormEdit";

const fetchSkills = async () => {
  const skills = await axios.get("http://localhost:3001/skills");
  return skills;
};

const Skills = () => {
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState({});

  const {
    data: skills,
    status: statusSkills,
    refetch,
  } = useQuery("skills", fetchSkills);

  const _handleDelete = (id) => {
    console.log("delete", id);
    (async () => {
      await axios.delete("http://localhost:3001/skills/" + id);
      refetch();
    })();
  };

  const _handleEdit = (skill) => {
    console.log("edit", skill);
    setEditMode(true);
    setEditingItem(skill);
  };

  const closeEditor = () => {
    setEditMode(false);
    setEditingItem({});
  };

  return (
    <div className="skill-frame">
      <h1>Skills</h1>
      {statusSkills === "success" ? (
        <div className="skills">
          {skills.data.map((skill) => {
            return (
              <div key={skill.id}>
                <p>
                  {skill.skill} - {skill.year}
                </p>{" "}
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    _handleEdit(skill);
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    _handleDelete(skill.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {editMode ? (
        <>
          <h2>Edit skill</h2>
          <SkillFormEdit
            editingItem={editingItem}
            closeEditor={closeEditor}
            refresh={refetch}
          />
        </>
      ) : (
        <></>
      )}

      <h2>Add new skill</h2>
      <SkillFormAdd refresh={refetch} />
    </div>
  );
};

export default Skills;
