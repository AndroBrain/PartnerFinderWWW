import Avatar from "@mui/material/Avatar";
import {Box, Typography} from "@mui/material";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import {useContext, useState} from "react";
import {SetRating} from "../../pages/chat/RatingRequest";
import {authContext} from "../../pages/auth/auth";
const ChatToolbar = (props) => {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: "var(--md-ref-palette-primary40)",
        },
        '& .MuiRating-iconHover': {
            color: "var(--md-ref-palette-primary60)",
        },
    });
    const {id, userInfo} = props;
    const [rating, setRating] = useState(0);
    const {authState} = useContext(authContext)
    const handleRating = (event, newValue) => {
        setRating(newValue);
        SetRating(authState.jwt, id, newValue);
    }
    // alert(picture.src)
    return (<Box sx={{
        width: "100%",
        backgroundColor: "var(--md-sys-color-primary-container-light)",
        height: "96px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    }}>
        <Avatar
            src={userInfo?.picture ? userInfo.picture.src : ''}
            sx={{width: 80, height: 80, marginLeft: "1rem"}}
        />
        <Typography variant="h5" sx={{marginLeft: "2rem"}}>
            {userInfo?.name ? userInfo.name : ''}
        </Typography>
        <StyledRating
            name="customized-color"
            value={rating}
            onChange={handleRating}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            sx={{marginLeft:"2rem"}}
        />
    </Box>)
}
export default ChatToolbar;