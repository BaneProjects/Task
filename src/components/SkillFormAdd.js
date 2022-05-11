import axios from "axios";
import { useState } from "react";

const SkillFormAdd = (props) => {
  const preset = {
    skill: "",
    year: "",
  };

  const [state, setState] = useState(preset);

  const handleChange = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "year") {
      value = parseInt(value);
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (state.year === "" || state.skill === "") {
      alert("You have not filled in all the fields");
      return false;
    } else {
      (async () => {
        await axios.post("http://localhost:3001/skills", {
          ...state,
        });

        setState(preset);
        if (typeof props.refresh === "function") {
          props.refresh();
        }
      })();
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          name="skill"
          value={state.skill}
          onChange={handleChange}
          placeholder="enter skill"
        />
        <input
          type="number"
          name="year"
          placeholder="enter year"
          value={state.year}
          onChange={handleChange}
        />
        <button type="button" onClick={handleClickSubmit}>
          Submit new skill
        </button>
      </form>
    </>
  );
};

export default SkillFormAdd;
