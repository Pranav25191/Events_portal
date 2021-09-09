import { React, useState } from "react";
import "../styles/eventcard.css";
import "../styles/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Auth from "./auth";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/loaderstar.css";
import address from "./address";

const Eventcard = (props) => {
  const [disabled, setdisable] = useState(false);
  const [starloading, setStarloading] = useState(false);
  const [starred, setIsstarred] = useState(props.starred);
  const handlestarred = (e, state) => {
    setdisable(true);
    setStarloading(true);
    const datatobesent = {
      postid: props.ID,
    };
    if (state) {
      axios
        .post(
          `http://${address.ip}:4444/starred/events/tounstar`,
          datatobesent,
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        )
        .then((res) => {
          if (res.data !== "notloggedin") {
            Auth.login();
            console.log(res.data);
            setIsstarred(!state);
            e.target.style.color = "red";
            setdisable(false);
            setStarloading(false);
          }
        });
    } else {
      //   console.log("unnnnnnnnstar");
      axios
        .post(`http://${address.ip}:4444/starred/events/tostar`, datatobesent, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then((res) => {
          if (res.data !== "notloggedin") {
            Auth.login();
            console.log(res.data);
            setIsstarred(!state);
            e.target.style.color = "gold";
            setdisable(false);
            setStarloading(false);
          }
        });
    }
  };
  const newpage = () => {
    let text_field = props.title;
    let date = props.fromdate.replaceAll("-", "");
    date = date.replaceAll(":", "");
    date = date.replaceAll(".", "");
    // date = date + "/" + date;
    let date1 = props.todate.replaceAll("-", "");
    date1 = date1.replaceAll(":", "");
    date1 = date1.replaceAll(".", "");
    // date1 = date1 + "/" + date1;
    console.log(date, date1);
    let url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      text_field
    )}&dates=${encodeURIComponent(date)}/${encodeURIComponent(
      date1
    )}&location=${encodeURIComponent(props.venue)}`;
    window.open(url);
  };

  return (
    <div className="eventcard">
      <div className="clubinfo">
        <img
          src="https://t3.ftcdn.net/jpg/01/14/49/40/240_F_114494079_iAK28mmYCxfUETORbJhWi0BNRLZah93F.jpg"
          alt="p"
          className="responsivem"
        ></img>
        <p className="clubname">{props.clubname}</p>
        <img
          src="https://t3.ftcdn.net/jpg/01/14/49/40/240_F_114494079_iAK28mmYCxfUETORbJhWi0BNRLZah93F.jpg"
          alt="p"
          className="responsive"
        ></img>
        <Link to={`Events/${props.ID}`}>
          <button
            className="btnevent"
            type="submit"
            style={{ width: "max-content" }}
          >
            Read More
          </button>
        </Link>

        {!starloading && (
          <button
            className="starem"
            disabled={disabled}
            style={{ border: "0px", backgroundColor: "rgba(0,0,0,0)" }}
          >
            {starred && (
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                color="gold"
                id="stars"
                style={{ cursor: "pointer" }}
                onClick={(e) => handlestarred(e, starred)}
              />
            )}
            {!starred && (
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                color="grey"
                id="stars"
                style={{ cursor: "pointer" }}
                onClick={(e) => handlestarred(e, starred)}
              />
            )}
          </button>
        )}
        {starloading && <div className="loaderstar mob"></div>}
      </div>
      <div className="details">
        {!starloading && (
          <button
            className="stare"
            disabled={disabled}
            style={{ border: "0px", backgroundColor: "rgba(0,0,0,0)" }}
          >
            {starred && (
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                color="gold"
                id="stars"
                style={{ cursor: "pointer" }}
                onClick={(e) => handlestarred(e, starred)}
              />
            )}
            {!starred && (
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                color="grey"
                id="stars"
                style={{ cursor: "pointer" }}
                onClick={(e) => handlestarred(e, starred)}
              />
            )}
          </button>
        )}
        {starloading && <div className="loaderstar comp"></div>}
        <p className="headinge"><b>{props.title}</b></p>
        <button
          onClick={() => newpage()}
          style={{
            border: "0px",
            marginLeft: "25px",
            backgroundColor: "rgba(0,0,0,0)",
            width: "100%",
          }}
          className="tv but"
        >
          {/* <div className="calender"> */}
          <FontAwesomeIcon icon={faCalendarPlus} size="1x" />
          <p>
            <b>Add to calender</b>
          </p>
          {/* </div> */}
        </button>
        <h4 className="tv">
          {" "}
          <b>Timings(mm/dd/yyyy)</b>
        </h4>
        <h5 className="tv">
          {new Date(props.fromdate).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          })}
          {"  "}
          {"  "}
          {"  "}
          <span>
            &nbsp; <b> to</b>
            &nbsp;
          </span>
          {"  "}
          {"  "}
          {"  "}
          {new Date(props.todate).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          })}
        </h5>
        <h4 className="tv">
          {" "}
          <b>Venue</b>
        </h4>
        <h5 className="tv">{props.venue}</h5>
        <Link
          style={{ marginTop: "auto", marginLeft: "auto" }}
          to={`Events/${props.ID}`}
        >
          <button
            className="btneventm"
            type="submit"
            style={{ width: "max-content" }}
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Eventcard;
