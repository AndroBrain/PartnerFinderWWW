import {Box, Card, Typography} from "@mui/material";

const ChatMessages = (props) => {
    const {messages} = props;
    return <Box sx={{width: "100%", minHeight: "min-content", display:"flex", flexDirection: "column", overflow: "auto", height:"500px"}}>
        {messages.map(message => (
            <Box sx={{width:"100%"}}>
                <Card sx={{
                    float: message.fromUser ? "right" : "left",
                    backgroundColor: message.fromUser ? "var(--md-sys-color-tertiary-container-light)" : "var(--md-sys-color-inverse-primary-light)",
                    margin: "0.5rem",
                    padding: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    height: "min-content",
                    display: "",
                    textAlign: "center",
                    maxWidth:"350px"
                }}>
                    <Typography>{message.message}</Typography>
                </Card>
            </Box>
        ))}
    </Box>
}
export default ChatMessages;