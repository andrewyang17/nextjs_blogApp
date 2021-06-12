import {useRef, useState, useEffect} from "react";

import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something went wrong');
  }
}

export default function ContactForm() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus])

  async function sendMessageHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage
      });
      setRequestStatus('success');
      emailInputRef.current.value = '';
      nameInputRef.current.value = '';
      messageInputRef.current.value = '';
    } catch (error) {
      setRequestError(error);
      setRequestStatus('error');
    }
  }

  let notification;
  if(requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on itsw way!'
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!'
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return <section className={classes.contact}>
    <h1>How can I help you?</h1>
    <form className={classes.form} onSubmit={sendMessageHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required ref={nameInputRef}/>
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="message">Your Message</label>
        <textarea id="message" rows="5" required ref={messageInputRef}></textarea>
      </div>

      <div className={classes.actions}>
        <button>Send Message</button>
      </div>
    </form>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
  </section>
}