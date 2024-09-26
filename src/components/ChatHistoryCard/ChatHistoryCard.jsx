import { Box, Typography, Stack } from '@mui/material';
import { format, isEqual, startOfDay, add } from 'date-fns';
import ChattingCard from '../ChattingCard/ChattingCard';
import styles from './ChatHistoryCard.module.css';

export default function ChatHistoryCard({ details }) {
    
    const getFormattedDate = (date) => {
        const currentDay = startOfDay(new Date());

        if (isEqual(date, currentDay)) {
            return `Chats from Today`;
        } else if (isEqual(currentDay, add(date, { days: 1 }))) {
            return `Chats from Yesterday`;
        } else {
            return format(date, 'do LLL yyyy');
        }
    };

    return (
        <Box>
            <Typography className={styles.dateTitle}>
                {getFormattedDate(startOfDay(new Date(details.datetime)))}
            </Typography>

            <Stack spacing={{ xs: 2, md: 3 }}>
                {details.chat.map((item, index) => (
                    <ChattingCard details={item} readOnly={true} key={index} />
                ))}
            </Stack>
        </Box>
    );
}