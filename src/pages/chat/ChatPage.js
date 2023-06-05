import {Toolbar} from "../../components/Toolbar";
import {IconField} from "../../components/IconField";
import {Box, Container, Typography} from "@mui/material";
import {useRef, useState} from "react";
import ChatDrawer from "../../components/chat/ChatDrawer";
import ChatToolbar from "../../components/chat/ChatToolbar";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatTextField from "../../components/chat/ChatTextField";
import {useNavigate} from "react-router-dom";

const dummyChat = [
    {
        id: 0,
        picture: "drawable/basia.jpg",
        name: "Kasia",
        messages: [
            {
                id: 0,
                message: "Siemanko",
                fromUser: true
            },
            {
                id: 1,
                message: "Hejka",
                fromUser: false
            },
            {
                id: 2,
                message: "Co tam?",
                fromUser: false
            }
        ]
    },
    {
        id: 1,
        picture: "drawable/martyna.png",
        name: "Basia",
        messages: [
            {
                id: 0,
                message: "Siemanko",
                fromUser: true
            },
            {
                id: 1,
                message: "Hejkaa",
                fromUser: false
            },
            {
                id: 2,
                message: "Co tam?",
                fromUser: false
            },
            {
                id: 3,
                message: ";)",
                fromUser: false
            }
        ]
    }]

export function ChatPage() {
    const [currentChatIndex, setcurrentChatIndex] = useState(0);
    const [chat, setChat] = useState(dummyChat);
    const currentChat = chat.at(currentChatIndex);
    const messageRef = useRef();
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const messageText = messageRef.current.value;
        if(messageText === '') {
            return;
        }
        setChat(prevChat => {
            const newChats = [...prevChat];
            newChats[currentChatIndex] = {
                ...newChats[currentChatIndex],
                messages: [
                    ...newChats[currentChatIndex].messages,
                    {
                        id: newChats[currentChatIndex].messages.length,
                        message: messageText,
                        fromUser: true
                    }
                ]
            }
            return newChats;
        });
    }
    return (
        <Box style={{height: "100vh", minHeight: "100%"}}>
            <Toolbar>
                <IconField text={"Strona główna"} icon={"drawable/main_page.svg"} onClick={() => navigate("/main")}/>
                <IconField text={"Mój profil"} icon={"drawable/profile.svg"} onClick={() => navigate("/profile")}/>
            </Toolbar>
            {chat.length > 0 &&
            <Box sx={{display: "flex", height: "100%", width: "100%", minHeight:"min-content"}}>
                <ChatDrawer currentChatIndex={currentChatIndex} setcurrentChatIndex={setcurrentChatIndex} chat={chat}/>
                <Box sx={{width: "100%", display:"flex",  flexDirection: "column", alignItems:"center"}}>
                    <ChatToolbar currentChat={currentChat}/>
                    <Box sx={{margin: "1rem", minWidth: "95%", minHeight:"min-content"}}>
                        <ChatMessages messages={currentChat.messages}/>
                        <ChatTextField handleSubmit={handleSubmit} messageRef={messageRef}/>
                    </Box>
                </Box>
            </Box>}
            {chat.length === 0 && <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", height:"100%",  flexDirection: "column" }}>
                <img src={"drawable/sad.svg"} width="500px"></img>
                <Typography variant={"h3"} sx={{margin:"2rem"}}>Tu pojawią się twoje wiadomości</Typography>
            </Box>}
        </Box>
    );
}