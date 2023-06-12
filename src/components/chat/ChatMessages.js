import { Box, Card, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const ChatMessages = (props) => {
    const { messages, currentUserEmail } = props;
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages]);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "min-content",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                height: "500px",
            }}
            ref={containerRef}
        >
            {messages.map((message) => (
                message.message !== "" && (
                    <Box key={uuidv4()} sx={{ width: "100%" }}>
                        <Card
                            sx={{
                                wordWrap: "break-word",
                                whiteSpace: "initial",
                                float: message.senderEmail === currentUserEmail ? "right" : "left",
                                backgroundColor: message.senderEmail === currentUserEmail
                                    ? "var(--md-sys-color-tertiary-container-light)"
                                    : "var(--md-sys-color-inverse-primary-light)",
                                margin: "0.5rem",
                                padding: "1rem",
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                height: "min-content",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                maxWidth: "350px",
                            }}
                        >
                            <Typography
                                sx={{
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-all",
                                }}
                            >
                                {message.message}
                            </Typography>
                        </Card>
                    </Box>
                )
            ))}
        </Box>
    );
};

export default ChatMessages;