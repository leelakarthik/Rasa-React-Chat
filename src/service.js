import _ from "lodash";

/*
'getData' function is used to make api calls to rasa server.
*/

export async function getData(msg) {
  console.log(msg);
  const req = {
    method: "POST",
    body: JSON.stringify({ sender: "react-user", message: msg }),
  };
  let data = "";
  try {
    const res = await fetch("http://localhost:5005/webhooks/rest/webhook", req);
    data = await res.json();
    console.log(data);
  } catch (err) {
    alert("error occured");
  }
  return data;
}

/*
'getMessageArray' function is used to populate data and returns array of objects for user input
*/
export function getMessageArray(messages, value) {
  return [
    ...messages,
    {
      id: messages.length,
      type: "sent",
      msg: value,
      payload: "",
    },
  ];
}
/*
'dataSpread' function is used to populate data and returns array of objects for results from api calls
*/
export function dataSpread(data, len) {
  let result = [];
  data.forEach((element) => {
    result.push({
      id: len++,
      type: "received",
      msg:
        element.text === undefined ? (
          <img src={element.image} width="350px" alt=""></img>
        ) : (
          element.text
        ),
      payload:
        Object.keys(element).length === 3
          ? _.map(element.buttons, "title")
          : "",
    });
  });
  return result;
}