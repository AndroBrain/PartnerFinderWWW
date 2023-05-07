import {Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const ChatDrawer = (props) => {
    const {currentChatIndex, setcurrentChatIndex, chat} = props;
    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            width: "260px",
            borderRight: "2px solid var(--md-ref-palette-neutral35)",
            paddingRight: "2px"
        }}>
            <List sx={{padding: "0", height:"100%"}}>
                {chat.map(chat => (
                    <ListItemButton onClick={() => {
                        setcurrentChatIndex(chat.id)
                    }} sx={{width: "100%", padding: "0"}}>
                        <ListItem sx={{
                            width: "258px", height: "65px",
                            backgroundColor: currentChatIndex === chat.id ? "var(--md-sys-color-primary-container-light)" : ""
                        }}>
                            <ListItemAvatar>
                                <Avatar
                                    src={chat.picture}
                                    sx={{width: 50, height: 50}}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={chat.name} sx={{textAlign: "center"}}/>
                        </ListItem>
                    </ListItemButton>
                ))}
            </List>
        </Box>)
}
export default ChatDrawer;