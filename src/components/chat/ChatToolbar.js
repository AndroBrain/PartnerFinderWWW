import Avatar from "@mui/material/Avatar";
import {Box, Typography} from "@mui/material";

const ChatToolbar = (props) => {
    const {currentChat} = props;
    return (<Box sx={{
        width: "100%",
        backgroundColor: "var(--md-sys-color-primary-container-light)",
        height: "96px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    }}>
        <Avatar
            src={currentChat.picture}
            sx={{width: 80, height: 80, marginLeft: "1rem"}}
        />
        <Typography variant="h5" sx={{marginLeft: "2rem"}}>
            {currentChat.name}
        </Typography>
    </Box>)
}
export default ChatToolbar;