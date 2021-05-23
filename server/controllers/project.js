const Project = require("../models/project");
const formidable = require("formidable");
const {v4 : uuidv4} = require("uuid");
var _ = require('lodash');
const fs = require("fs");
exports.uploadProject = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if(err){
      return res.status(400).json({
        error: "problem with image"
      })
    }

    //TODO:
    let project = new Project(fields);
    if(file.photo){
      if(file.photo.size > (1024*1024 * 3)){
        return res.status(400).json({
          error: "File size too big"
        })
      }

      project.photo.data = fs.readFileSync(file.photo.path)
      //File type png, jpeg
      project.photo.contentType = file.photo.type;
      

    }
    project.p_id = uuidv4();

    //save to db
    project.save((err, post) => {
      if(err){
        return res.status(400).json({
          error: "Unable to save data."
        })
      }
      res.json(post)
    })

  })
};

exports.getProjectCount = async (req, res) => {
  const userId = req.id_user;
  await Project.find({ userId: userId }, (err, totalProject) => {
    if (err) {
      return res.status(400).json({
        error: "Could not find user",
      });
    }

    console.log(totalProject);
    res.json({
      totalCount: `Total count of project is ${totalProject.length}`,
    });
  });
};


exports.getProjectDetails = async (req, res) => {
    const projectId = req.pid;
    Project.findOne({p_id: projectId}, (err, project) => {
        if(err){
            return res.status(400).json({
                error: "No project found"
            })
        }
        res.send(project)
    })
}


exports.getAllProject = async (req, res) => {
  const projects = await Project.find({userId: req.userid}).sort({ createdAt: -1 });
  return res.json(projects);
}