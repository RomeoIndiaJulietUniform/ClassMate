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

interface ClassData {
  id: string;
  type: string;
  date: string;
  time: string;
  capacity: number;
  slots: string[];
}

interface FormData {
  classType: string;
  date: string;
  time: string;
}

interface FilterData {
  type: string;
  date: string;
  time: string;
}

const demoClasses: ClassData[] = [
  { id: '1', type: 'yoga', date: '2024-09-15', time: '09:00', capacity: 10, slots: [] },
  { id: '2', type: 'gym', date: '2024-09-16', time: '14:30', capacity: 15, slots: [] },
  { id: '3', type: 'dance', date: '2024-09-17', time: '18:00', capacity: 20, slots: [] },
  { id: '4', type: 'yoga', date: '2024-09-18', time: '07:30', capacity: 12, slots: [] },
  { id: '5', type: 'gym', date: '2024-09-19', time: '16:00', capacity: 18, slots: [] }
];

function Class() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<FilterData>({ type: '', date: '', time: '' });
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [classes, setClasses] = useState<ClassData[]>(demoClasses);
  const [totalClasses, setTotalClasses] = useState<number>(demoClasses.length);
  const [formData, setFormData] = useState<FormData>({ classType: '', date: '', time: '' });

  useEffect(() => {
    const filteredClasses = demoClasses.filter(c =>
      (filter.type ? c.type === filter.type : true) &&
      (filter.date ? c.date === filter.date : true) &&
      (filter.time ? c.time === filter.time : true)
    );

    setClasses(filteredClasses.slice((page - 1) * limit, page * limit));
    setTotalClasses(filteredClasses.length);
  }, [filter, page, limit]);

  const handleFilterChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleBooking = (classItem: ClassData) => {
    const userId = 'demoUser';
    if (classItem.slots.length < classItem.capacity) {
      setClasses(prevClasses => 
        prevClasses.map(c =>
          c.id === classItem.id ? { ...c, slots: [...c.slots, userId] } : c
        )
      );
      alert('Class booked successfully');
    } else {
      alert('Class is full. You have been added to the waitlist.');
    }
  };

  const handleCancelBooking = (classItem: ClassData) => {
    const userId = 'demoUser';
    const currentTime = new Date();
    const classTime = new Date(`${classItem.date}T${classItem.time}`);
    const timeDifference = (classTime.getTime() - currentTime.getTime()) / (1000 * 60); // difference in minutes

    if (timeDifference > 30) {
      setClasses(prevClasses => 
        prevClasses.map(c =>
          c.id === classItem.id ? { ...c, slots: c.slots.filter(slot => slot !== userId) } : c
        )
      );
      alert('Booking canceled successfully');
    } else {
      alert('Sorry, you can only cancel a booking if the class is more than 30 minutes away.');
    }
  };

  const handleFormSubmit = () => {
    const classItem = classes.find(c => 
      c.type === formData.classType && 
      c.date === formData.date &&
      c.time === formData.time
    );
    if (classItem) {
      handleBooking(classItem);
    } else {
      alert('Class not found. Please make sure you have selected the correct class type, date, and time.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        width: '100vw',
        background: 'linear-gradient(135deg, #cc8b86, #f9eae1, #7d4f50, #d1be9c, #aa998f)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
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
          onChange={handleFilterChange}
          label="Date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="time"
          type="time"
          value={filter.time}
          onChange={handleFilterChange}
          label="Time"
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
            onChange={handleFormChange}
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
          onChange={handleFormChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleFormChange}
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
              <Typography color="textSecondary">Time: {classItem.time}</Typography>
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