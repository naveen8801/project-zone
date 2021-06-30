import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import addprojectimg from './../../assets/addprojectimg.png';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewProject.css';

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: '1rem',
  },
  textarea: {
    padding: '1rem',
    marginTop: '1rem',
    outline: 'none',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    background: 'transparent',
    borderRadius: '5px',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  skillinput:{
    padding: '22px 10px 0px 20px',
    width: '30vw',
    color: '#5352ed',
    [theme.breakpoints.down('sm')]:{
      width:'60vw'
    },
    
   
  },
  option:{
    color:'#000',
    backgroundColor:'#FFF',
    marginTop:0,
    '&[data-focus="true"]': {
      backgroundColor:'#5253ED',
      color:'#FFF'
    }
  },
  tag: {
    backgroundColor: "#5253ED",
    color:'#FFF',
    height: 30,
    position: "relative",
    zIndex: 0,
    "& .MuiChip-label": {
      color: "#FFF"
    },
    "& .MuiChip-deleteIcon": {
      color:"#FFF",
    },
    "&:after": {
      content: '""',
      right: 10,
      top: 6,
      position: "absolute",
      nackgroundColor:"#FFF",
      borderRadius:"50%",
      zIndex: -1
    }
  }
}));



function AddNewProject() {
  const classes = useStyles();

  const [skillInputs, setSkillInputs] = useState(['']);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [desc, setDesc] = useState('');
  const projectLevel = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ]
  const projectSkill = [
    'JavaScript',
    'Node',
    'Python',
    'HTML',
    'CSS',
    'React',
    'Java',
    'MongoDB',
    'Express',
    'NextJS',
    'OpenCV',
    'C++',
    'C',
    'FullStack',
    'flutter',
    'android',
    'MERN',
    'Backend',
    'Frontend',
    'Artificial Intillegence',
    'Machine Learning',
    'AR',
    'VR',
  ];

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!title) {
      toast.error("Please enter project's title");
    } else if (!level) {
      toast.error("Please enter project's level");
    } else if (!skillInputs) {
      toast.error("Please enter skills for project");
    } else if (!desc) {
      toast.error("Please enter description");
    } else {
      const data = {
        name: title,
        level: level,
        skills: skillInputs,
        description: desc,
      };
      console.log(data);

      try {
        const res = await fetch(
          'https://project-zone.ent.asia-south1.gcp.elastic-cloud.com/api/as/v1/engines/project-zone/documents',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer private-zaptmpeyibkdp9x6exesnb98',
            },
            body: JSON.stringify(data),
          }
        );

        if (res.status === 200) {
          toast.success('Project added successfully.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Sorry!! Your project could not be added.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        setTitle('');
        setLevel('');
        setDesc('');
        setSkillInputs(['']);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <div className="addproject_wrapper">
          <div  className="quotesection">
            <div  className="quotebox">
              <i className="fa fa-quote-left"></i>
              <h4>A long descriptive name is better than a short enigmatic name. 
                A long descriptive name is better than a long descriptive comment.
              </h4>
              <h4><span className="dash">-</span>Robert C.martin</h4>
              <img src={addprojectimg} alt="addprojectimg" className="addprojectimg"/>
            </div>
            </div>
            <form onSubmit={handleSubmit} className="addprojectform">
              <h1>Add New Project</h1>
              <FormControl fullWidth>
              <div className="forminput">
                <label htmlFor="title">Project title<span>*</span></label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter Project Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="forminput">
                <label htmlFor="title">Project Level<span>*</span></label>
                <Autocomplete
                  id="project-level"
                  options={projectLevel}
                  onChange={(event,value) => setLevel(value)}
                  classes={{ option: classes.option}}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input type="text" placeholder="Enter Project Level" 
                           {...params.inputProps} />
                    </div>
                  )}
                />
              </div>
              <div className="skillsinput">
              <label htmlFor="skills">Skills<span>*</span></label>
              <Autocomplete
                multiple={true}
                id='skills'
                freeSolo={true}
                classes={{ option: classes.option, tag: classes.tag}}
                options={projectSkill}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  const values = [...newValue];
                  setSkillInputs(values);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter Skills"
                      className={classes.skillinput}
                      fullWidth
                    />
                )}
              />
              </div>
            </FormControl>
            <div className="forminput">
                <label htmlFor="desc">Description<span>*</span></label>
                <textarea
                  id="desc"
                  placeholder="Write something about this project"
                  name="desc"
                  value={desc}
                  rows="5"
                  onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <button type="submit" className="submitbtn">
              Submit<i className="fa fa-upload"></i>
            </button>
          </form>
        </div>
    </div>
  );
}

export default AddNewProject;
