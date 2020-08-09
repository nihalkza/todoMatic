import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export default function SimpleTabs(props) {
    const [value, setValue] = React.useState(0);
    const rows = props.todoData;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const showTable=(data,status) =>{
        return(
            <>
                <Table size='small'>
                    <TableBody>
                        {stableSort(data)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, i) => {
                            return (
                                <TableRow
                                    hover
                                    className={(status==='all')?null:(status==='active' && row.status === 'active')?null:(status==='complete' && row.status === 'complete')?null:"d-none"}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    size="medium"
                                    selected={(row.status === 'complete') ? true : false}
                                >
                                    <TableCell padding="checkbox">
                                        <BootstrapTooltip title={(row.status === 'complete') ? "Remove Checkbox if Not Completed" : "Check this if Task Completed"}>
                                            <Checkbox 
                                                checked={(row.status === 'complete') ? true : false} 
                                                size="medium"
                                                color="secondary"
                                                onChange={(e)=>props.handleComplete(e.target.checked,i)}
                                            />
                                        </BootstrapTooltip>
                                    </TableCell>
                                    <TableCell component="th" className="text-capitalize" scope="row" padding="none">
                                        {row.task}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup disableElevation variant="contained" color="primary">
                                            <Button className="bg-secondary" onClick={props.editTask(this,row.id,row.task)}>Edit</Button>
                                            <Button className="bg-danger" onClick={props.deleteTask(this,row.id)}>Delete</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </>
        )
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className="bg-info"
                    size="small"
                    aria-label="simple tabs example"
                >
                    <Tab tabIndex="0" label="Show All Task" />
                    <Tab tabIndex="0" label="Show Active Task" />
                    <Tab tabIndex="0" label="Show Completed Task" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {   
                    (props.todoData && props.todoData.length) ?
                    showTable(props.todoData,'all')
                    : 
                    <span className="display-4 text-info">Welcome back!! Add your Task 👆🏻</span>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {   
                    (props.todoData && props.todoData.length) ?
                    showTable(props.todoData,'active')
                    : 
                    <span className="display-4 text-info">Hurray! No Task is remaining... 😎</span>
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                {   
                    (props.todoData && props.todoData.length) ?
                    showTable(props.todoData,'complete')
                    : 
                    <span className="display-4 text-info">Oops! It seems that no task has been completed yet 😟 </span>
                }
            </TabPanel>
        </div>
    );
}

function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = 1;
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};
const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      padding: "20px"
    },
}));
function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}













































//----------------------------------------------------------------------END-------------------------------------

// import React from 'react';
// import './App.css';
// import ListItems from './ListItems'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

// library.add(faTrash)

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             currentItem: {
//                 id:'',
//                 text: '',
//                 key: ''
//             },
//             visibileItems: [],
//             checkBoxStatus: false
//         }
//         this.addItem = this.addItem.bind(this);
//         this.handleInput = this.handleInput.bind(this);
//         this.deleteItem = this.deleteItem.bind(this);
//         this.setUpdate = this.setUpdate.bind(this);
//         this.handleComplete = this.handleComplete.bind(this);
//     }
//     addItem(e) {
//         e.preventDefault();
//         const newItem = this.state.currentItem;
//         if (newItem.text !== "") {
//             const items = [...this.state.items, newItem];
//             this.setState({
//                 items: items,
//                 currentItem: {
//                     id:Date.now(),
//                     text: '',
//                     key: ''
//                 },
//                 visibileItems:items
//             })
//         }
//     }

//     handleInput(e) {
//         this.setState({
//             currentItem: {
//                 id:Date.now(),
//                 text: e.target.value,
//                 key: 'active'
//             }
//         })
//     }

//     deleteItem(key) {
//         const filteredItems= this.state.items.filter((item,index) =>
//             item.id!==key);
//         this.setState({
//             items: filteredItems,
//             visibileItems:filteredItems
//         })
//         document.getElementById('show_all_task').focus();
//         // document.getElementsByClassName("show_all_task").focus();
//     }

//     handleComplete(key,index) {
//         const items = this.state.items;
//         items.map((item, i) => {
//             if (i === index) {
//                 (key) ? item.key = "Completed" : item.key = "active" ;
//             }
//             return null;
//         })
//         this.setState({
//             items: items,
//         })
//     }

//     setUpdate(text, key) {
//         const items = this.state.items;
//         items.map(item => {
//             if (item.id === key) {
//                 item.text = text;
//             }
//             return null;
//         })
//         this.setState({
//             items: items,
//         })
//     }
    
//     showData(tabName) {
//         const items = this.state.items;
//         let temp = [];
//         switch(tabName) {
//             case "Completed":
//                 items.map((item, i) => {
//                     if (item.key === 'Completed') {
//                         temp.push(item)
//                     }
//                     return null;
//                 })
//                 break;
//             case "active":
//                 items.map((item, i) => {
//                     if (item.key === 'active') {
//                         temp.push(item)
//                     }
//                     return null;
//                 })
//                 break;
//             default:
//                 temp= this.state.items;
//         }
//         this.setState({
//             visibileItems: temp,  
//         })
//     }

//     render() {
//         return (
//             <div className="App">
//                 <header>
//                     <form id="to-do-form" onSubmit={this.addItem}>
//                         <input type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput}></input>
//                         <button type="submit">Add</button>
//                     </form>
//                     <button id="show_all_task" className="show_all_task" onClick={this.showData.bind(this, "all")}>Show All Task</button>
//                     <button className="show_active_task" onClick={this.showData.bind(this, "active")}>Show Active Task</button>
//                     <button className="show_completed_task" onClick={this.showData.bind(this, "Completed")}>Show Completed Task</button>
//                     <p>{this.state.items.text}</p>
//                     <ListItems handleComplete={this.handleComplete} isChecked={this.state.checkBoxStatus} items={this.state.visibileItems} deleteItem={this.deleteItem} setUpdate={this.setUpdate} />
//                 </header>
//             </div>
//         );
//     }
// }


// export default App;




// ------------------------
// function ListItems(props){
//     const items = props.items;
//     const listItems = items.map((item,index) =>{
//        return <div className="list" key={index}>
//         <p style={{verticalAlign:"middle"}}>
//             <span style={{float:"left",position:"relative",display:"inline-block"}}>
//                 <Checkbox
//                     checked={(item.key === 'Completed') ? true : false}
//                     size="medium"
//                     onChange={(e) => props.handleComplete(e.target.checked,index)}
//                     inputProps={{ 'aria-label': 'primary checkbox' }}
//                 />
//             </span>
//             {/* <input type="checkbox" className="check_status" id="check_status" checked={false} onChange={(e) => props.handleComplete(e.target.checked,index)} /> */}
//             <input type="text" id={item.id} value={item.text} onChange={(e)=>{props.setUpdate(e.target.value,item.id)}}/>
//             <span>
//                 <FontAwesomeIcon className="faicons" onClick={() => {props.deleteItem(item.id)}} icon="trash" />
//             </span>
//         </p>
//         </div>
//     })
//     return <div>
//         <FlipMove duration={300} easing="ease-in-out">
//             {listItems}
//         </FlipMove>
    
//     </div>;
//   }

//   export default ListItems;