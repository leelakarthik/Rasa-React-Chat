import React, { Component } from 'react';
import Message from "./message";
import {dataSpread,getMessageArray,getData} from '../service';

class Form extends Component {
    state = { value: "", messages: [] };
    /*
    'callBackFromChild' function which teleports data from child from parent magically!!
    */
		callBackFromChild = (cdata) => 
			this.updateState(getData(cdata),getMessageArray(this.state.messages,cdata));
    /*
    'handleChange' method is used to update value field of state for every user input.
    */
    handleChange = (event) => {
      this.setState({ value: event.target.value });
    };
    /*
    'componentDidMount' function is a life cycle method which gets called every time the component mounted
    here we used it to clear the Message Box data when page refreshes.
    */
		componentDidMount(){
			// getData("/restart")
		}
    /*
    'cloneStateMessages' function updates the state and message box values for user input and respective
    response from api
    */
		cloneStateMessages = () => {
      let messages = getMessageArray(this.state.messages,this.state.value);
      this.setState({ messages: [...messages,
        {
          id: messages.length,
          type: "received",
          msg: '...',
          payload: "",
        }]});
      // this.setState({})
      let response = getData(this.state.value);
      this.updateState(response,messages);
		}
    /*
    'updateState' is a function which updates the state after fethcing a api and scrolls to bottom
    of the messages box.
    */
		updateState = (response,messages) => {
			response.then(data => {
        this.setState(
          { messages : [ ...messages, 
            ...dataSpread(data,messages.length)]
          },() => this.scrollToBottom)})
		};
    /* 
    'handleSubmit' is used to handle the submit request for the form, this calls a method and resets the
    value of input field.
    */
    handleSubmit = (event) => {
			this.state.value !== "" ?	this.cloneStateMessages() : alert("Enter a message to send");
        event.preventDefault();
      this.setState({ value: "" });
    };
    render() { 
      const {messages,value} = this.state;
        return ( 
            <React.Fragment>
                <Message messages={messages} callback = {this.callBackFromChild}/>
                <form
            className="input-group"
            id="input-box"
            onSubmit={this.handleSubmit}
          >
            <input
              className=" form-control"
              value={value}
              onChange={this.handleChange}
              autoFocus
            ></input>
            <button className=" btn btn-success" type="submit">
              send
            </button>
          </form>
            </React.Fragment>           
         );
    }
}
export default Form;