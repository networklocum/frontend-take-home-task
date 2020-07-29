import React, { useState, useEffect } from 'react';
import './style.css';

export default function Schedule () {
	const [shifts, setShifts] = useState( null );
	const [user] = useState({
		id: '1234',
		firstName: 'John',
		lastName: 'Doe',
		staffType: 'gp',
		staffTypeId: '1'
	});
	
	async function fetchShifts () {
		const response = await fetch( 'https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions' ); // TODO: move API url to config
		
		// update state with data
		setShifts( await response.json() );
	}
	
	useEffect( () => {
		fetchShifts();
	}, [] ); // empty array to run useEffect only once, after component has been mounted/loaded
	
	if ( !shifts ) {
		return 'loading...';
	}
	
	return (
		<ul>
		{shifts.data.map( ( item, index ) => {
			if ( item.status === 'POSTED' && item.staffType === user.staffType && item.locum === null ) {
				return (
					<li  key={ item.id }>
						<strong>Practice name:</strong>
						<span data-test="practice-name">{item.practice.name}</span>
						<strong>Date:</strong>
						<span data-test="date">{new Date( item.startDatetime ).toLocaleDateString()}</span>
						<strong>Time:</strong>
						<span data-test="time">
							{new Date( item.startDatetime ).toLocaleTimeString( [], { timeStyle: 'short' })}
							{' '}
							-
							{' '}
							{new Date( item.endDatetime ).toLocaleTimeString( [], { timeStyle: 'short' })}
						</span>
						<strong>Rate:</strong>
						<span data-test="rate">
						&pound;
						{item.hourlyRate}
						{' '}
						per hour
						</span>
						<strong>Applications:</strong>
						<span data-test="applications">{item.applicationIds.length}</span>
					</li>
					);
			}
			return false;
		})}
		</ul>
	);
}
