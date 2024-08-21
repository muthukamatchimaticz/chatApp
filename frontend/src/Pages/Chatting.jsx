import React, { useContext, useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import SocketContext from '../Context/SocketContext';
import { JoinRoom, SendChatMessage } from "../Config/socket";

import { Modal, Button } from 'react-bootstrap';

import { IoMdMore } from "react-icons/io";
import { RiAlertLine } from "react-icons/ri";
import { ReportOffensive } from '../userHooks/axios';

import toast from 'react-hot-toast';


export const Chatting = () => {
    const [chat, setChat] = useState("");
    const [errors, setErrors] = useState({});
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(""); // State for room ID
    const [user, setUser] = useState(""); // State for user
    const [touser, setToUser] = useState(""); // State for user

    const { socket } = useContext(SocketContext);


    const [menu, setMenu] = useState(false);
    const [show, setShow] = useState(false);
    const [reportMessage, setReportMessage] = useState('');

    const [offensiveWord, setOffensiveWord] = useState('');
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);


    useEffect(() => {
        // if (roomId) {
        // Join the room when roomId is set

        socket.on('NEWCHAT', (data) => {

            console.log('data', data);

            setMessages((prevMessages) => [...prevMessages, data]); // Update messages with new chat
        });

        // Clean up the event listener when the component unmounts or roomId changes
        return () => {
            socket.off('NEWCHAT');
        };
        // }
    }, [roomId, socket]);

    console.log(messages)

    const handleChange = (e) => {
        setChat(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let error = {};

        if (!chat) {
            error.chat = "Chat can't be empty";
        }

        setErrors(error)

        try {
            if (Object.keys(error).length == 0) {

                const payload = {
                    from: user,
                    to: touser,
                    message: chat,
                    roomId: roomId
                };

                SendChatMessage(payload);
                setChat(""); // Clear input field
            }
        }
        catch (e) {
            console.log("Error on handle submit", e);
        }


    };

    const handleModelShow = () => {
        setShow(!show)
        setOffensiveWord("");
        setReportMessage("");
        setErrors({ ...errors, offensiveWord: "", reportMessage: "" });
    }

    const handleReportSubmit = async (e) => {

        e.preventDefault();

        let error = {};

        if (!offensiveWord)
            error.offensiveWord = "Offensive Can't be Empty"

        if (!reportMessage)
            error.reportMessage = "Report message Can't be Empty"

        setErrors({ ...errors, ...error });

        try {
            if (Object.keys(error).length == 0) {

                let payload = {
                    offensiveWord,
                    reportMessage
                }

                console.log("Payload", payload)

                const result = await ReportOffensive(payload);

                console.log("Result", result.data);

                if (result.data.status) {
                    setMenu(!menu)
                    handleModelShow();
                    toast.success(result.data.message);
                }
                else {
                    setMenu(!menu)
                    handleModelShow();
                    toast.error(result.data.message);
                }
            }
        } catch (error) {

        }

    }



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card p-4">
                        <h2 className="card-title text-center mb-4">User Chatting</h2>

                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='col-4'>

                                <div>
                                    <h4>Room ID:</h4>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={roomId}
                                        onChange={(e) => { setRoomId(e.target.value); JoinRoom(e.target.value); }}
                                        placeholder="Enter Room ID"
                                    />
                                </div>

                                <div>
                                    <h4>User Name:</h4>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        placeholder="Enter User Name"
                                    />
                                </div>

                                <div>
                                    <h4>To User Name:</h4>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={touser}
                                        onChange={(e) => setToUser(e.target.value)}
                                        placeholder="Enter To User Name"
                                    />
                                </div>
                            </div>

                            <div className='col-8 p-3'>
                                <div>
                                    <h4>Display Chat</h4>
                                    <div className="chat-box" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                                        {messages.map((msg, index) => (
                                            <div key={index} className={msg.from === user ? 'text-end pe-4' : 'text-start'}>
                                                <strong className={msg.from === user ? 'text-end pe-4' : 'text-start'}>{msg.from === user ? `${user}` : `${msg.from}`}:</strong>
                                                <p className={msg.from === user ? 'text-end pe-4' : 'text-start'}>
                                                    {msg.from === user ?
                                                        (`${msg.message}`)
                                                        :
                                                        <>
                                                            {/* <IoMdMore onClick={() => setActiveMenuIndex(index)} /> */}


                                                            <>
                                                                {msg.message}
                                                                <IoMdMore onClick={() => {
                                                                    setMenu(!menu)
                                                                    setActiveMenuIndex(index)   
                                                                }} />
                                                                {activeMenuIndex === index && menu && (
                                                                    <div className='bg-dark p-2 col-3 rounded'>
                                                                        <button className='fs-6 px-3 btn border border-warning btn-transparent text-light' onClick={handleModelShow}>
                                                                            <RiAlertLine /> <span className='ps-1'>Report</span>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        </>
                                                    }
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <form>
                                    <div className="mb-3 d-flex">
                                        <input
                                            type="text"
                                            id="chat"
                                            className="form-control"
                                            value={chat}
                                            name='chat'
                                            placeholder="Type a message"
                                            onChange={(e) => {
                                                setErrors({ ...errors, chat: "" })
                                                handleChange(e)
                                            }}
                                        />
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                            <IoIosSend />
                                        </button>
                                    </div>
                                    {errors?.chat && <p className='text-danger fs-6'>{errors?.chat}</p>}
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">

                        <input type="text"
                            name='offensiveWord'
                            value={offensiveWord}
                            className='col-12'
                            placeholder='Enter the Offensive word'
                            onChange={(e) => {
                                setOffensiveWord(e.target.value)
                                setErrors({ ...errors, offensiveWord: "" })
                            }} />
                        {errors?.offensiveWord && <p className='text-danger fs-6'>{errors?.offensiveWord}</p>}
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            name='reportMessage'
                            value={reportMessage}
                            onChange={(e) => {
                                setReportMessage(e.target.value)
                                setErrors({ ...errors, reportMessage: "" })
                            }}
                            placeholder="Enter details for the report"
                        />
                        {errors?.reportMessage && <p className='text-danger fs-6'>{errors?.reportMessage}</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReportSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};
