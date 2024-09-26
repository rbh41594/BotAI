import { TextField, Box, Button, Stack, Snackbar } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ChatInput.module.css';

export default function ChatInput({ generateResponse, setScroll, chat, clearChat }) {
    
    const [inputValue, setInputValue] = useState('');
    const inputElementRef = useRef(null);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        generateResponse(inputValue);
        setInputValue('');
        setScroll(prev => !prev);
    };

    const handleChatSave = () => {
        const chatHistory = JSON.parse(localStorage.getItem('chat')) || [];
        const timestamp = new Date();

        localStorage.setItem('chat', JSON.stringify([{ chat: chat, datetime: timestamp }, ...chatHistory]));
        clearChat();
        setIsSnackbarVisible(true);
    };

    useEffect(() => {
        inputElementRef.current.focus();
    }, []);

    return (
        <Box className={styles.chatInputContainer}>
            <Box component='form' onSubmit={handleFormSubmit}>
                <Stack direction='row' spacing={2}>
                    <TextField
                        placeholder='Message Bot AI...'
                        className={styles.inputField}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                        inputRef={inputElementRef}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        className={styles.askButton}
                    >
                        Ask
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={handleChatSave}
                        disabled={chat.length === 0}
                        className={styles.saveButton}
                    >
                        Save
                    </Button>
                </Stack>
            </Box>

            <Snackbar
                open={isSnackbarVisible}
                message='Chat saved.'
                onClose={() => setIsSnackbarVisible(false)}
                autoHideDuration={5000}
                action={
                    <Link to="/history">
                        <Button size='small'>See past conversations</Button>
                    </Link>
                }
            />
        </Box>
    );
}
