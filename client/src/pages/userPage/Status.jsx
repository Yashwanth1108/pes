import React, { useState, useEffect } from "react";
import "./Status";

function Status() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("user_id");
  console.log("bookings", bookings);
  useEffect(() => {
    fetch(`http://localhost:3000/bookings/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data.bookings);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

  if (bookings.length < 1) {
    return <h2>NO Bookings</h2>;
  }

  return (
    <section id="Status">
      <div>
        <h1>Booking Status</h1>
        <ul>
          {bookings.map((booking) => (
            <div style={customStyle}>
              <li key={booking.id}>
                Auditorium: {booking.auditorium}, Start Date:{" "}
                {booking.start_date.slice(0, 10)}, Start Time:{" "}
                {booking.start_time.slice(0, -3)}, End Date:{" "}
                {booking.end_date.slice(0, 10)}, End Time:{" "}
                {booking.end_time.slice(0, -3)} Statu:{" "}
                {booking?.is_pending == 1 ? (
                  <samp style={{ color: "red" }}>pending</samp>
                ) : booking?.is_pending == 2 ? (
                  <samp style={{ color: "green" }}>approved</samp>
                ) : (
                  <samp style={{ color: "red" }}>canceled</samp>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Status;

const customStyle = {
  width: "100%",
  height: "25px",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};
