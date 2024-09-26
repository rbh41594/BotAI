import { Box, Select, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './ChatFilter.module.css';

export default function ChatFilter({ allChats, filterChats }) {
  const [selectedRating, setSelectedRating] = useState('All Ratings');

  const handleSelectionChange = (event) => {
    setSelectedRating(event.target.value);
  };

  useEffect(() => {
    if (selectedRating === 'All Ratings') {
      filterChats(allChats);
    } else {
      const filteredChats = allChats.filter(chatItem => 
        chatItem.chat.some(singleChat => singleChat.rating == selectedRating)
      );

      filterChats(filteredChats);
    }
  }, [selectedRating]);

  return (
    <Box className={styles.chatFilterContainer}>
      <Typography className={styles.filterLabel}>
        Filter by rating
      </Typography>
      <Select
        value={selectedRating}
        onChange={handleSelectionChange}
        size='small'
        className={styles.selectMenu}
      >
        <MenuItem value='All Ratings'>All Ratings</MenuItem>
        <MenuItem value={1}>1 Star</MenuItem>
        <MenuItem value={2}>2 Stars</MenuItem>
        <MenuItem value={3}>3 Stars</MenuItem>
        <MenuItem value={4}>4 Stars</MenuItem>
        <MenuItem value={5}>5 Stars</MenuItem>
      </Select>
    </Box>
  );
}