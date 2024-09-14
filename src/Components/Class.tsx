import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Pagination,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';

const demoClasses = [
  { id: '1', type: 'yoga', date: '2024-09-15', capacity: 10, slots: [] },
  { id: '2', type: 'gym', date: '2024-09-16', capacity: 15, slots: [] },
  { id: '3', type: 'dance', date: '2024-09-17', capacity: 20, slots: [] },
  { id: '4', type: 'yoga', date: '2024-09-18', capacity: 12, slots: [] },
  { id: '5', type: 'gym', date: '2024-09-19', capacity: 18, slots: [] }
];

function Class() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<{ type: string; date: string }>({ type: '', date: '' });
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [classes, setClasses] = useState(demoClasses);
  const [totalClasses, setTotalClasses] = useState(demoClasses.length);
  const [formData, setFormData] = useState<{ classType: string; date: string }>({ classType: '', date: '' });

  useEffect(() => {
    const filteredClasses = demoClasses.filter(c =>
      (filter.type ? c.type === filter.type : true) &&
      (filter.date ? c.date === filter.date : true)
    );

    setClasses(filteredClasses.slice((page - 1) * limit, page * limit));
    setTotalClasses(filteredClasses.length);
  }, [filter, page, limit]);

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleBooking = (classItem: any) => {
    const userId = 'demoUser';
    if (classItem.slots.length < classItem.capacity) {
      const updatedClasses = classes.map(c =>
        c.id === classItem.id ? { ...c, slots: [...c.slots, userId] } : c
      );
      setClasses(updatedClasses);
      alert('Class booked successfully');
    } else {
      alert('Class is full. You have been added to the waitlist.');
    }
  };

  const handleCancelBooking = (classItem: any) => {
    const userId = 'demoUser';
    const updatedClasses = classes.map(c =>
      c.id === classItem.id ? { ...c, slots: c.slots.filter(slot => slot !== userId) } : c
    );
    setClasses(updatedClasses);
    alert('Booking canceled successfully');
  };

  const handleFormSubmit = () => {
    const classItem = classes.find(c => c.type === formData.classType && c.date === formData.date);
    if (classItem) {
      handleBooking(classItem);
    } else {
      alert('Class not found. Please make sure you have selected the correct class type and date.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        height: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: '100%', maxWidth: '600px' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Class Type</InputLabel>
          <Select
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="yoga">Yoga</MenuItem>
            <MenuItem value="gym">Gym</MenuItem>
            <MenuItem value="dance">Dance</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="date"
          type="date"
          value={filter.date}
          onChange={(e) => setFilter(prev => ({ ...prev, date: e.target.value }))}
          label="Date"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <Typography variant="h6">Book a Class</Typography>
        <FormControl fullWidth>
          <InputLabel>Class Type</InputLabel>
          <Select
            name="classType"
            value={formData.classType}
            onChange={(e) => setFormData((prev) => ({ ...prev, classType: e.target.value as string }))}
          >
            <MenuItem value="yoga">Yoga</MenuItem>
            <MenuItem value="gym">Gym</MenuItem>
            <MenuItem value="dance">Dance</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value as string }))}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          Book Class
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {classes.map((classItem) => (
          <Card key={classItem.id} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {classItem.type}
              </Typography>
              <Typography color="textSecondary">Date: {classItem.date}</Typography>
              <Typography>Capacity: {classItem.slots.length}/{classItem.capacity}</Typography>
            </CardContent>
            <CardActions>
              {classItem.slots.length < classItem.capacity ? (
                <Button size="small" onClick={() => handleBooking(classItem)}>Book</Button>
              ) : (
                <Button size="small" color="secondary" onClick={() => handleBooking(classItem)}>
                  Join Waitlist
                </Button>
              )}
              <Button size="small" color="error" onClick={() => handleCancelBooking(classItem)}>
                Cancel Booking
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Pagination
        count={Math.ceil(totalClasses / limit)}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: '20px' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{
          mt: 3,
          backgroundColor: '#cc8b86',
          color: '#f9eae1',
          '&:hover': {
            backgroundColor: '#7d4f50',
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default Class;
