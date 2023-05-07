import {styled, TextField} from "@mui/material";

const ChatTextField = (props) => {
    const {handleSubmit, messageRef} = props;
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'var(--md-ref-palette-neutral35)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'var(--md-ref-palette-neutral35)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--md-ref-palette-neutral50)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--md-sys-color-on-surface-variant-light)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--md-ref-palette-neutral35)',
            },
        },
    });
    return <form onSubmit={handleSubmit}>
        <CssTextField name="message" inputRef={messageRef} variant="outlined" sx={{width:"100%", borderColor:"var(--md-sys-color-primary-container-light)", margin:"1rem"}}/>
    </form>;
}
export default ChatTextField;