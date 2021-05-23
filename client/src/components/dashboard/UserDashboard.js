import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import NavbarComponent from "./navbar/Navbar";
import { Button, Form, Carousel, Spinner } from "react-bootstrap";
import { createProject, isAutheticated, getProjectDetails } from "../../helper";
import SpinnerSubmit from "./SubmitSpinner/SpinnerSubmit";
import FieldAlert from "./AlertComp/FieldAlert";
import axios from "axios";
import { setProjects, uploadProject } from "../../redux";
import { connect } from "react-redux";
import Imagehelper from "./ImageHelper/Imagehelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

toast.configure();
const UserDashboard = (props) => {
  const initialState = {
    comment: "",
    photo: null,
    loading: false,
    error: false,
  };

  const [form, setForm] = useState({
    comment: "",
    photo: null,
    loading: false,
    error: false,
    getproject: false,
  });

  const { token, user } = isAutheticated();

  const handleClick = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const getProjectInfo = (projectId) => {
    toast.info("Fetching project details...");
    getProjectDetails( projectId)
      .then((response) => {
        const message =
          response.comment + " Post created on \n" + response.createdAt;
        toast.success(message);
      })
      .catch((error) => console.log(error));
  };

  const submitClick = (e) => {
    e.preventDefault();
    if (!form.photo || form.comment === "") {
      setForm({ ...form, error: true });
      return;
    }
    setForm({ ...form, error: false });
    let formData = new FormData();
    formData.set("photo", form.photo);
    formData.set("userId", user._id);
    formData.set("comment", form.comment);
    setForm({ ...form, loading: true });
    createProject(token, formData)
      .then((response) => {
        setForm(initialState);
        {
          props.uploadProject(response);
        }
      })
      .catch((error) => {
        console.log(error);
        setForm(initialState);
      });
  };

  const spinner = () => {
    return <SpinnerSubmit />;
  };

  useEffect(() => {
    fetchAllProject();
  }, []);

  const fetchAllProject = () => {
    setForm({ ...form, getproject: true });
    axios
      .get(`https://oneistox.herokuapp.com/api/getallproject/${user._id}`)
      .then((response) => {
        {
          props.setAllProjects(response.data);
        }
        setForm({ ...form, getproject: false });
      })
      .catch((error) => {
        console.log(error);
        setForm({ ...form, getproject: false });
      });
  };

  const uploadPost = () => {
    return (
      <Form>
        {form.loading ? spinner() : null}
        {form.error ? <FieldAlert /> : null}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            required
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            value={form.comment}
            type="text"
            placeholder="Enter comment..."
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            required
            onChange={(e) => handleClick(e)}
            id="exampleFormControlFile1"
            label="Example file input"
          />
        </Form.Group>
        <Button onClick={(e) => submitClick(e)} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  };


  const carousel = (project) => {
    return (
      <Carousel.Item key={project.p_id}>
        <Imagehelper project={project} />
        <Carousel.Caption>
          <h3>
            {" "}
            <span> {project.comment}</span>{" "}
          </h3>
          <div className="button__details">
            <Button onClick={(e) => getProjectInfo(project.p_id)}>
              GET THIS PROJECT INFO
            </Button>
            <Link to={`/dashboard/${project.p_id}`}><Button>GO TO</Button></Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    );
  };

  return (
    <React.Fragment>
      <NavbarComponent />
      <div className="user__container">
        <div className="card__container">
          {form.getproject ? <Spinner animation="border" /> : null}
          <Carousel className="carousel__container">
            {props.getAllprojects.map((project) => carousel(project))}
            {/* {carousel()}
            {carousel()}
            {carousel()} */}
          </Carousel>
        </div>
        <div className="form__container">{uploadPost()}</div>
      </div>
      <div className="showprojectDetails">IT IS HERE</div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllprojects: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllProjects: (data) => dispatch(setProjects(data)),
    uploadProject: (data) => dispatch(uploadProject(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
