"use client";
import { useEffect, useState } from "react";
import "./form.css"

function Form() {
  const [rollno, setRollno] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [hobby ,setHobby] = useState("");
  const [youridealperson , setYouridealperson] = useState("");
  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("");
  const [prize, setPrize] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [placementcomponey, setPlacementcomponey] = useState("");
  const [searchitem, setSearchitem] = useState("");
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  // derive filtered list from `students` and keep original index as `_idx`
  const searchData = students
    .map((student, idx) => ({ ...student, _idx: idx }))
    .filter((value) => {
      const q = (searchitem || "").toLowerCase().trim();
      if (!q) return true; // show all when search is empty
      return (
        (value.email || "").toLowerCase().includes(q) ||
        (value.name || "").toLowerCase().includes(q) ||
        (value.phone || "").toLowerCase().includes(q) ||
        (value.rollno || "").toString().toLowerCase().includes(q)
      );
    });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents));
      } catch {
        setStudents([]);
      }
    }
  }, []);

 
  const clearForm = () => {
    setRollno("");
    setName("");
    setEmail("");
    setAge("");
    setHobby("");
    setYouridealperson("");
    setGender("");
    setCourse("");
    setPrize("");
    setPhone("");
    setBranch("");
    setFaculty("");
    setPlacementcomponey("");
    setEditIndex(null);
  };

  const FormSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      rollno: rollno,
      name: name,
      email: email,
      age: age,
      hobby: hobby,
      youridealperson: youridealperson,
      gender:gender,
      course: course,
      prize: prize,
      phone: phone,
      branch: branch,
      faculty: faculty,
      placementcomponey: placementcomponey,
      searchitem: searchitem,
    }

    let updatedStudents = [];

    if (editIndex === null) {
      updatedStudents = [...students, formdata];
    } else {
      updatedStudents = students.map((student, index) =>
        index === editIndex ? formdata : student
      );
    }

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    clearForm();
  };

  const handleEdit = (index) => {
    const student = students[index];

    setRollno(student.rollno);
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setHobby(student.hobby);
    setYouridealperson(student.youridealperson);
    setGender(student.gender);
    setCourse(student.course);
    setPrize(student.prize);
    setPhone(student.phone);
    setBranch(student.branch);
    setFaculty(student.faculty);
    setPlacementcomponey(student.placementcomponey)
    setSearchitem(student.searchitem)
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((student, studentIndex) => studentIndex !== index);

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    if (editIndex === index) {
      clearForm();
    }
  };


  return (
    <>
      <div className="container">
        <form className="form-card" onSubmit={FormSubmit}>
          <div className="form-title">
            <h2>Student Registration Form</h2>
          </div>

          <input
            type="text"
            placeholder="enter your roll no"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
          />

          <input
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your hobby"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your ideal person"
            value={youridealperson}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your Prize"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
          />
          <input
            type="tel"
            placeholder="enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter your branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />

          <input
            type="text"
            placeholder="enter your faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          />

          <input
            type="text"
            placeholder="enter your placement"
            value={placementcomponey}
            onChange={(e) => setPlacementcomponey(e.target.value)}
          />
          <button type="submit">{editIndex === null ? "submit" : "Update"}</button>
        </form>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search roll no, name, email or phone"
            value={searchitem}
            onChange={(e) => setSearchitem(e.target.value)}
            aria-label="Search students"
          />
          <button type="button" onClick={() => setSearchitem("")}>Clear</button>
        </div>
        <table className="student-table">
          <thead>
            <tr>
              <th>rollno</th>
              <th>name</th>
              <th>email</th>
              <th>age</th>
              <th>hobby</th>
              <th>youridealperson</th>
              <th>gender</th>
              <th>course</th>
              <th>prize</th>
              <th>phone</th>
              <th>branch</th>
              <th>faculty</th>
              <th>placementcomponey</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((student) => {
              const idx = student._idx;
              return (
                <tr key={`${student.rollno}-${idx}`}>
                  <td>{student.rollno}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.hobby}</td>
                  <td>{student.youridealperson}</td>
                  <td>{student.gender}</td>
                  <td>{student.course}</td>
                  <td>{student.prize}</td>
                  <td>{student.phone}</td>
                  <td>{student.branch}</td>
                  <td>{student.faculty}</td>
                  <td>{student.placementcomponey}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" onClick={() => handleEdit(idx)}>Edit</button>
                      <button type="button" onClick={() => handleDelete(idx)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default Form;
