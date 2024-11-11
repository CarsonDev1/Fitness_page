import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	addMonths,
	subMonths,
	isSameDay,
	isSameMonth,
} from 'date-fns';
import axios from 'axios';
import { FaDumbbell } from 'react-icons/fa';

const ViewSchedules = () => {
	const { subscriptionId } = useParams();
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [workouts, setWorkouts] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		fetchMonthlyWorkouts();
	}, [currentMonth]);

	const fetchMonthlyWorkouts = async () => {
		const token = localStorage.getItem('token');
		try {
			const startDate = startOfMonth(currentMonth);
			const endDate = endOfMonth(currentMonth);
			const response = await axios.get(
				`http://localhost:5000/api/users/subscriptions/${subscriptionId}/workouts`,
				{
					params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setWorkouts(response.data.workouts || []);
		} catch (error) {
			console.error('Error fetching workouts:', error);
		}
	};

	const handleDateClick = (date) => {
		const isWorkoutDay = workouts.some((workout) => isSameDay(new Date(workout.date), date));
		if (isWorkoutDay) {
			setSelectedDate(date);
			fetchWorkouts(date);
			setShowPopup(true);
		}
	};

	const fetchWorkouts = async (date) => {
		const token = localStorage.getItem('token');
		try {
			const response = await axios.get(
				`http://localhost:5000/api/users/subscriptions/${subscriptionId}/workouts?date=${date.toISOString()}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setWorkouts(response.data.workouts || []);
		} catch (error) {
			console.error('Error fetching workouts:', error);
		}
	};

	const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
	const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

	const renderHeader = () => (
		<div className='flex items-center justify-between mb-6 text-white'>
			<button onClick={prevMonth} className='px-4 py-2 text-lg font-bold bg-orange-500 rounded hover:opacity-90'>
				Previous
			</button>
			<span className='text-3xl font-semibold'>{format(currentMonth, 'MMMM yyyy')}</span>
			<button onClick={nextMonth} className='px-4 py-2 text-lg font-bold bg-orange-500 rounded hover:opacity-90'>
				Next
			</button>
		</div>
	);

	const renderDays = () => {
		const days = [];
		const startDate = startOfWeek(currentMonth);
		for (let i = 0; i < 7; i++) {
			days.push(
				<th key={i} className='py-2 font-semibold text-center text-gray-300'>
					{format(addDays(startDate, i), 'eeee')}
				</th>
			);
		}
		return <tr>{days}</tr>;
	};

	const renderCells = () => {
		const monthStart = startOfMonth(currentMonth);
		const monthEnd = endOfMonth(monthStart);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);
		const dateFormat = 'd';
		const rows = [];
		let days = [];
		let day = startDate;

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				const formattedDate = format(day, dateFormat);
				const cloneDay = day;
				const isWorkoutDay = workouts.some((workout) => isSameDay(new Date(workout.date), cloneDay));

				days.push(
					<td
						key={day}
						className={`p-4 text-center cursor-pointer rounded-lg transition transform ${
							!isSameMonth(day, monthStart)
								? 'text-gray-500'
								: isWorkoutDay
								? 'bg-orange-500 text-white font-bold relative'
								: 'text-gray-200 hover:bg-gray-800'
						} ${isSameDay(day, new Date()) ? 'ring-2 ring-orange-400' : ''}`}
						onClick={() => handleDateClick(cloneDay)}
					>
						<span>{formattedDate}</span>
						{isWorkoutDay && <FaDumbbell className='absolute text-lg text-orange-200 top-1 right-1' />}
					</td>
				);
				day = addDays(day, 1);
			}
			rows.push(<tr key={day}>{days}</tr>);
			days = [];
		}
		return <tbody>{rows}</tbody>;
	};

	const renderPopup = () => (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
				showPopup ? 'block' : 'hidden'
			}`}
		>
			<div className='w-11/12 max-w-lg p-6 text-white bg-gray-900 rounded-lg shadow-lg'>
				<h3 className='mb-4 text-xl font-semibold'>
					Workout Details for {format(selectedDate, 'MMMM d, yyyy')}
				</h3>
				{workouts.length > 0 ? (
					<ul className='space-y-2'>
						{workouts.map((workout) => (
							<li key={workout._id} className='p-2 bg-gray-700 rounded-md'>
								<strong>{workout.name}</strong> - {workout.status}
							</li>
						))}
					</ul>
				) : (
					<p>No workout scheduled for this day.</p>
				)}
				<button
					onClick={() => setShowPopup(false)}
					className='px-4 py-2 mt-4 bg-red-600 rounded hover:bg-red-700'
				>
					Close
				</button>
			</div>
		</div>
	);

	return (
		<section className='py-12 text-white bg-gray-900'>
			<div className='mx-auto container-cus'>
				<div className='mb-8 text-center'>
					<h2 className='text-4xl font-bold'>Monthly Workout Schedule</h2>
					<p className='text-gray-400'>Track your fitness goals effectively</p>
				</div>
				{renderHeader()}
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse table-auto'>
						<thead className='bg-gray-700'>{renderDays()}</thead>
						{renderCells()}
					</table>
				</div>
				{showPopup && renderPopup()}
			</div>
		</section>
	);
};

export default ViewSchedules;
