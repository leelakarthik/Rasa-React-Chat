import React, { Component } from 'react';
class Message extends Component {
  chatScroll = React.createRef();
  id = 0
  componentDidMount () { 
    this.scrollToBottom()
  }
  componentDidUpdate () {
    this.scrollToBottom()
  }
  /*
  'scrollToBottom' function is used to scroll to the last element in the Message Box
  */
  scrollToBottom = () => {
    const {scrollHeight,clientHeight} = this.chatScroll.current;
    this.chatScroll.current.scrollTo(0,scrollHeight-clientHeight);
  };
  /*
  'loadPayloads' function returns the react elements for respective 
  */
  loadPayloads = (payload) =>{
    let result = [];
    payload.forEach((element,id) =>{
      console.log(id,element);
      result.push(
        <span>
          <button key={this.id++} className={id === 0 ? "btn btn-success m-2": "btn btn-danger"} onClick={() =>this.props.callback(element)}>
            {element}
          </button>
        </span> 
      )
    }); 
    return result;
  };

  render() { 
    const {messages} = this.props;
    return (
      <React.Fragment>
          <div ref={this.chatScroll} className="Chat-area overflow-auto" id="chatArea" >
            {messages.map((message) => (
              
             <div key={message.id} className={message.type ==="sent" ? "mychat alert alert-primary " : "rasaChat alert alert-danger"}>
                <span>{message.msg}
                {message.payload !== '' && this.loadPayloads(message.payload) }  
                </span>
              </div>
            ))}
          </div>
                  
        </React.Fragment> 
     );
  }
}
export default Message;