import {Toolbar} from "../../components/Toolbar";
import {IconField} from "../../components/IconField";
import {Box, Typography} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import ChatDrawer from "../../components/chat/ChatDrawer";
import ChatToolbar from "../../components/chat/ChatToolbar";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatTextField from "../../components/chat/ChatTextField";
import {useNavigate} from "react-router-dom";
import {
    GetBasicInfoForAllUsers,
    GetConversation,
    GetConversationPartnersIds,
    GetCurrentUserEmail
} from "./ChatRequests";
import {authContext} from "../auth/auth";
import {GetCurrentUserId} from "../home/logged/ProfileSuggestionRequests";
import * as signalR from '@microsoft/signalr';


export function ChatPage() {
    const [currentChatIndex, setcurrentChatIndex] = useState(0);
    const [chat, setChat] = useState([]);
    const messageRef = useRef();
    const navigate = useNavigate()
    const {authState} = useContext(authContext)
    const [connection, setConnection] = useState(null);
    const [error, setError] = useState();
    const [conversationPartnersId, setConversationPartnersId] = useState([]);
    const [currentUserEmail, setCurrentUserEmail] = useState();
    const [usersInfo, setUsersInfo] = useState([]);

    useEffect(() => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:8081/hub/chat?access_token=${authState.jwt}`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

        hubConnection.on('ReceiveMessage', (receiver, sender, message) => {
            console.log(`Wiadomość od ${sender} do ${receiver}: ${message}`);
            const chatCopy = [...chat];
            chatCopy.push({
                "senderEmail": sender,
                "receiverEmail": receiver,
                "message": message,
            })
            setChat([...chatCopy]);
        });

        hubConnection
            .start()
            .then(() => {
                console.log('Połączono z hubem.');
                setConnection(hubConnection)


            })
            .catch((error) => {
                console.error('Błąd podczas łączenia z hubem:', error);
            });

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    useEffect(() => {
        const email = localStorage.getItem('email')
        if (email !== null) {
            sendMessage('', email);
        }
    }, [connection])

    const sendMessage = (message, receiver) => {
        if(connection) {
            connection.invoke('SendMessage', receiver, message);

            const chatCopy = [...chat];
            chatCopy.push({
                "senderEmail": currentUserEmail,
                "receiverEmail": receiver,
                "message": message,
            })
            setChat([...chatCopy]);
            // window.location.reload(false);

            if(localStorage.getItem('email') !== null) {
                localStorage.removeItem('email')
                window.location.reload(false);
            }


        }
    };

    useEffect(() => {
        GetConversationPartnersIds(authState.jwt, setConversationPartnersId, setError);
        const fetchData = async () => {
            try {
                const currentUserId = await GetCurrentUserId(authState.jwt);
                GetCurrentUserEmail(authState.jwt, setCurrentUserEmail, setError, currentUserId);
            } catch (error) {
                setError(error.toString());
            }
        };
        fetchData();
    }, [connection])

    useEffect(() => {

        if (conversationPartnersId.length > 0) {
            GetConversation(authState.jwt, setChat, setError, conversationPartnersId.at(currentChatIndex))
        }
    }, [conversationPartnersId, currentChatIndex])

    useEffect(() => {
        GetBasicInfoForAllUsers(authState.jwt, setUsersInfo, setError, conversationPartnersId);
    }, [conversationPartnersId])

    const handleSubmit = (event) => {
        event.preventDefault();
        const messageText = messageRef.current.value;
        const receiver = chat.at(0).receiverEmail === currentUserEmail ? chat.at(0).senderEmail : chat.at(0).receiverEmail;
        sendMessage(messageText, receiver);
        messageRef.current.value = '';
    }

    return (
        <Box style={{height: "100vh", minHeight: "100%", overflow: "hidden"}}>
            <Toolbar>
                <IconField text={"Strona główna"} icon={"drawable/main_page.svg"} onClick={() => navigate("/main")}/>
                <IconField text={"Mój profil"} icon={"drawable/profile.svg"} onClick={() => navigate("/profile")}/>
            </Toolbar>
            {chat.length > 0 &&
                <Box sx={{display: "flex", height: "100%", width: "100%", minHeight: "min-content"}}>
                    <ChatDrawer currentChatIndex={currentChatIndex} setcurrentChatIndex={setcurrentChatIndex}
                                chat={usersInfo}/>
                    <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <ChatToolbar
                            id={conversationPartnersId.at(currentChatIndex)}
                            userInfo={usersInfo.at(currentChatIndex)}
                        />
                        <Box sx={{margin: "1rem", minWidth: "95%", minHeight: "min-content"}}>
                            <ChatMessages messages={chat} currentUserEmail={currentUserEmail}/>
                            <ChatTextField messageRef={messageRef} handleSubmit={handleSubmit}/>
                        </Box>
                    </Box>
                </Box>}
            {chat.length === 0 && <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column"
            }}>
                <img src={"drawable/sad.svg"} width="500px"></img>
                <Typography variant={"h3"} sx={{margin: "2rem"}}>Tu pojawią się twoje wiadomości</Typography>
            </Box>}
        </Box>
    );
}