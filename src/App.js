import React, { Component } from 'react'
import {Container,Paper} from '@material-ui/core';
import TabBox from './TabBox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class App extends Component {
    constructor(props){
        super(props);
        this.state = ({
            todoData:[],
            confirmDialogOpen: false,
            confirmUpdateOpen: false,
            TaskID:'',
            task:''
        })
    }

    componentWillMount (){
        let isBackup = JSON.parse(localStorage.getItem('todoMaticData'));
        if(isBackup && isBackup.length) {
            this.setState({todoData:isBackup})
        }
    }

    componentDidMount(){
        document.getElementById('todoText').focus();
    }

    addToDo(e){
        e.preventDefault();
        let text = document.getElementById('todoText').value;
        if (text !== "") {
            let todoArr = {
                task:text,
                status:'active',
                id:Date.now()
            }
            this.state.todoData.push(todoArr);
            let temp = this.state.todoData;
            this.setState({todoData: temp})
            document.getElementById('todoText').value = "";
            localStorage.setItem('todoMaticData', JSON.stringify(temp));
        }
    }

    deleteTask =(id,e) => {
        this.setState({
            confirmDialogOpen:true,
            TaskID:id
        })
    }

    delete = () =>{
        const filteredItems= this.state.todoData.filter((item,i)=> item.id!==this.state.TaskID);
        this.setState({
            todoData:filteredItems,
            confirmDialogOpen:false
        })
        localStorage.setItem('todoMaticData', JSON.stringify(filteredItems));
    }

    editTask=(id,task,e)=>{
        console.log(id,task)
        this.setState({
            confirmUpdateOpen:true,
            TaskID:id,
            task
        }) 
    }

    update = ()=>{
        const items = this.state.todoData;
        // console.log(document.getElementById('editedTask').value)
        items.map((item, i) => {
            if (item.id === this.state.TaskID) {
                item.task = this.state.task;
            }
            return null;
        })
        this.setState({
            todoData: items,
            confirmUpdateOpen:false
        })
        localStorage.setItem('todoMaticData', JSON.stringify(items));
    }

    handleComplete(isChecked,index) {
        const items = this.state.todoData;
        items.map((item, i) => {
            if (i === index) {
                (isChecked) ? item.status = "complete" : item.status = "active" ;
            }
            return null;
        })
        this.setState({
            todoData: items,
        })
        localStorage.setItem('todoMaticData', JSON.stringify(items));
    }

    render() {
        return (
            <Container maxWidth="lg">
                <h1 className="text-danger logo display-1 text-center">ToDo Matic</h1>
                <Paper className="p-4 mx-auto">
                    <form className="input-group mb-3 form-group" onClick={this.addToDo.bind(this)}> 
                        <input type="text" className="form-control btn-lg" id="todoText" placeholder="What needs to be done?" aria-label="What needs to be done?" aria-describedby="basic-addon2" />
                        <div className="input-group-append w-50">
                            <button className="btn btn-outline-secondary bg-info text-light" type="submit">Add</button>
                        </div>
                    </form>
                <TabBox todoData={this.state.todoData} deleteTask={(e,id)=>this.deleteTask.bind(e,id)} editTask={(e,id,task)=>this.editTask.bind(e,id,task)} handleComplete={(this.handleComplete.bind(this))} />
                </Paper>
                <Dialog
                    open={this.state.confirmDialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    maxWidth="sm"
                    fullWidth={true}
                    onClose={()=>this.setState({confirmDialogOpen:false})}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle className="text-dark" id="alert-dialog-slide-title">{"Delete Alert!!"}</DialogTitle>
                    <DialogContent dividers>
                        <p className="display-4" id="alert-dialog-slide-description">
                            Are you sure ?
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button className="btn btn-outline-secondary bg-secondary text-light" onClick={()=>this.setState({confirmDialogOpen:false})} color="primary">
                            No
                        </Button>
                        <Button className="btn btn-outline-secondary bg-danger text-light"  onClick={()=>this.delete()} color="secondary">
                            YES
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.confirmUpdateOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    maxWidth="sm"
                    fullWidth={true}
                    onClose={()=>this.setState({confirmUpdateOpen:false})}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle className="text-dark" id="alert-dialog-slide-title">{"Edit Task"}</DialogTitle>
                    <DialogContent dividers>
                        <form noValidate autoComplete="off">
                            <TextField id="editedTask" label="Task" variant="outlined" value={this.state.task} onChange={(e)=>this.setState({task:e.target.value})} fullWidth={true} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button className="btn btn-outline-secondary bg-secondary text-light" onClick={()=>this.setState({confirmUpdateOpen:false})} color="primary">
                            Cancel
                        </Button>
                        <Button className="btn btn-outline-secondary bg-danger text-light"  onClick={()=>this.update()} color="secondary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
}

export default App;