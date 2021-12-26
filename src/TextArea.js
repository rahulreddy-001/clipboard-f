import React from "react";
import axios from "./axios";

var TextArea = ({ paramId }) => {
  const [textMessage, setTextMessage] = React.useState("");
  const [id, setId] = React.useState(paramId.slice(1));

  const [tempId, setTempId] = React.useState(paramId.slice(1));
  const [alertMsg, setAlertMsg] = React.useState(
    "Create new id or Enter existing  id to get data  ........."
  );
  React.useEffect(() => {
    const fetchData = async () => {
      var data1 = await axios.get(`/data/${id}`);
      if (data1.data.length) {
        data1 = data1.data[0];
        setTextMessage(data1.message);
      } else {
        var msg = `id : ${id} created .......`;
        setAlertMsg(msg);
        setTimeout(() => {
          setAlertMsg(
            "Type text & click on Update to save data in this id  ....... "
          );
        }, 2000);
        await axios.post("/data", { id: id, message: "" });
      }
    };
    fetchData();
  }, [id]);
  var getHandler = () => {
    setId(tempId);
    window.location.pathname = `/${tempId}`;
  };
  var writeHandler = async () => {
    var data1 = await axios.get(`/data/${tempId}`);
    console.log(data1);
    console.log(data1.data);
    if (data1.data.length) {
      await axios.put(`/data/update/${tempId}`, { message: textMessage });
    } else {
      await axios.post("/data", { id: tempId, message: textMessage });
      getHandler();
    }
  };
  var deleteHandler = async () => {
    await axios.delete(`/data/delete/${id}`);
    setTextMessage("");
    var msg = `id : ${id} deleted ....... `;
    setAlertMsg(msg);
    setTempId("");
    window.location.pathname = "";
    setTimeout(() => {
      setAlertMsg("Create new id or Enter id to get existing data.........");
    }, 2000);
  };
  return (
    <>
      <div className="wrap-input100 ">
        <input
          className="input100"
          type="text"
          name="username"
          placeholder="Enter id"
          value={tempId}
          onChange={(e) => setTempId(e.target.value)}
        />
        <div className="container-login100-form-btn-top">
          <button className="login100-form-btn" onClick={() => getHandler()}>
            Get
          </button>
        </div>
      </div>
      <div>
        <textarea
          className="content"
          value={textMessage}
          placeholder={alertMsg}
          onChange={(event) => setTextMessage(event.target.value)}
        />
      </div>
      <div className="rdBtn">
        <div className="container-login100-form-btn m-t-17">
          <button className="login100-form-btn" onClick={() => writeHandler()}>
            Update
          </button>
        </div>
        <div className="container-login100-form-btn m-t-17">
          <button
            className="login100-form-btn"
            onClick={() => {
              deleteHandler();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TextArea;
